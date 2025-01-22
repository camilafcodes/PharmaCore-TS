import { ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2";
import { Pool } from "mysql2/promise";
import { Prescription } from "../../domain/models/prescription";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { PrescriptionItemRepository } from "./prescriptionItem.repository";

export class PrescriptionRepository implements Imanageable<Prescription> {


    async create(body: Prescription): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO prescriptions (id_patient, id_doctor, issue_date) VALUES (?, ?, ?)`;
        const values:Array<string |number | Date> = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        body.id_prescription = result[0].insertId;

        const prescriptionItemRepository = new PrescriptionItemRepository()

        for(const item of body.items){
            item.id_prescription = body.id_prescription;
            const itemResult = await prescriptionItemRepository.create(item);
            if(!itemResult){
                throw new Error('Error al crear los items de la receta');
            }

        }
        return result[0].affectedRows > 0 ? body : null;
    }

    async read(): Promise<Prescription[]> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT prescriptions.id_prescription, prescriptions.id_patient, prescriptions.id_doctor, prescriptions.issue_date
         FROM prescriptions INNER JOIN patients ON prescriptions.id_patient = patients.id_patient INNER JOIN doctors ON prescriptions.id_doctor = doctors.id_doctor`;
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql);
        return result[0] as Prescription[];
    }

    async update(body: Prescription): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `UPDATE prescriptions SET id_patient = ?, id_doctor = ?, issue_date = ? WHERE id_prescription = ?`;
        const values = [
            body.id_patient,
            body.id_doctor,
            body.issue_date,
            body.id_prescription,
            body.items
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);

        const prescriptionItemRepository = new PrescriptionItemRepository()
        for(const item of body.items){
            const itemResult = await prescriptionItemRepository.update(item);
            if(!itemResult){
                throw new Error('Error al actualizar los items de la receta');
            }
        }

        return result[0].affectedRows > 0 ? body : null;
    }

    async remove(id: number): Promise<boolean> {
        const connection: Pool = getPoolConnection();
        try {
            const removeItemsquerySql = ` DELETE FROM prescription_items WHERE id_prescription = ?`;
            const itemsValues = [id];
            await connection.query(removeItemsquerySql, itemsValues);
        } catch (error) {
            console.error("Error al eliminar los items asociados a la receta:", error)
            return false
        }

       try {
        const querySql: string = `DELETE FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].affectedRows === 1 ? true : false;
       }
        catch (error: any) {
            console.error("Error al eliminar la receta:", error);
            return false;
        }
    }

    async searchById(id: number): Promise<Prescription | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT * FROM prescriptions WHERE id_prescription = ?`;
        const values = [id];
        const [result]: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        if (result.length === 0) {
            return null
        }
        const prescription: Prescription = {
            id_prescription: result[0].id_prescription,
            id_patient: result[0].id_patient,
            id_doctor: result[0].id_doctor,
            issue_date: result[0].issue_date,
            items: result.map(row => ({
                id_item: row.id_item,
                id_prescription: row.id_prescription,
                id_medicine: row.id_medicine,
                quantity: row.quantity,
                item_total_cost: row.total_cost_item,
                usage_instructions: row.usage_instructions
            }))

        }
        return prescription
    }

}