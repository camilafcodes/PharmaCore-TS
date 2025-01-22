import { Pool, ResultSetHeader, FieldPacket, RowDataPacket } from "mysql2/promise";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { PrescriptionItem } from "../../domain/models/prescriptionItem";
import { getPoolConnection } from "./config/data.source";

export class PrescriptionItemRepository implements Imanageable<PrescriptionItem> {

    async create(body: PrescriptionItem): Promise<PrescriptionItem | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO prescription_items (id_prescription, id_medicine, quantity, usage_instructions) VALUES (?, ?, ?, ?)`;
        const values = [
            body.id_prescription,
            body.id_medicine,
            body.quantity,
            body.usage_instructions
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        body.id_item = result[0].insertId;
        return result[0].affectedRows > 0 ? body : null;
    }

    async read(): Promise<PrescriptionItem[]> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT prescription_items.id_item, prescription_items.id_prescription, prescription_items.id_medicine, 
        prescription_items.quantity, prescription_items.usage_instructions FROM 
        prescription_items INNER JOIN medicines ON prescription_items.id_medicine = medicines.id_medicine INNER JOIN prescriptions ON prescription_items.id_prescription = prescriptions.id_prescription`;
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql);
        return result[0] as PrescriptionItem[];
    }

    async update(body: PrescriptionItem): Promise<PrescriptionItem | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `UPDATE prescription_items SET id_prescription = ?, id_medicine = ?, quantity = ?, usage_instructions = ? WHERE id_item = ?`;
        const values = [
            body.id_prescription,
            body.id_medicine,
            body.quantity,
            body.usage_instructions,
            body.id_item
        ]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].affectedRows > 0 ? body : null;
    }

    async remove(id: number): Promise<boolean> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `DELETE FROM prescription_items WHERE id_item = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0].affectedRows === 1 ? true : false;
    }

    async searchById(id: number): Promise<PrescriptionItem | null> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `SELECT * FROM prescription_items WHERE id_item = ?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        return result[0].length > 0 ? result[0][0] as PrescriptionItem : null;
    }
}
