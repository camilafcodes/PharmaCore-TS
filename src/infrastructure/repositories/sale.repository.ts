import { Sale } from "../../domain/models/sale";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { SaleItemRepository } from "./saleItem.repository";
import { SaleItem } from "../../domain/models/saleItem";
export class SaleRepository implements Imanageable<Sale> {

    async patientExists(id_patient: string): Promise<boolean> {
        const connection = getPoolConnection();
        try {
            const query = `SELECT EXISTS(SELECT 1 FROM patients WHERE id_patient = ?) AS patient_exists`;
            const [resultExists] = await connection.query<RowDataPacket[]>(query, [id_patient]);
            return resultExists[0].patient_exists === 1
        } catch (error) {
            console.error("Error verificando la existencia del paciente:", error);
            return false;
        }
    }

    async stockIsSufficient(items: SaleItem[]): Promise<boolean> {
        const connection = getPoolConnection();
        try {
            for (const item of items) {
                const stockQuery = `SELECT quantity_stock FROM medicines WHERE id_medicine = ?`;
                const [stockResult] = await connection.query<RowDataPacket[]>(stockQuery, [item.id_medicine]);
                if (!stockResult.length || stockResult[0].quantity_stock < item.quantity) {
                    console.error(`Stock insuficiente para la medicina con id ${item.id_medicine}.`);
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error("Error verificando el stock:", error);
            throw error;
        }
    }

    async create(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();

        try {

            const salequerySql: string = 'INSERT INTO sales (id_patient, date_time, sale_total_cost) VALUES (?,?, NULL)';
            const salevalues: Array<string | Date> = [body.id_patient, body.date_time];
            const saleresult: [ResultSetHeader, FieldPacket[]] = await connection.query(salequerySql, salevalues);
            body.id_sale = saleresult[0].insertId;

            const saleItemRepository = new SaleItemRepository()

            for (const item of body.items) {
                item.id_sale = body.id_sale;

                const stockQuery = `SELECT quantity_stock FROM medicines WHERE id_medicine = ?`;
                const [stockResult] = await connection.query<RowDataPacket[]>(stockQuery, [item.id_medicine]);

                if (!stockResult.length || stockResult[0].quantity_stock < item.quantity) {
                    throw new Error(
                        `Stock insuficiente para la medicina con id ${item.id_medicine}. No se pudo completar la venta.`
                    );
                }
                const actualizarStockquery = `UPDATE medicines SET quantity_stock = quantity_stock - ? WHERE id_medicine = ?;`
                const actualizarStockValues = [item.quantity, item.id_medicine];
                await connection.query<ResultSetHeader>(actualizarStockquery, actualizarStockValues);


                await saleItemRepository.create(item)

            }

            const totalCostQuery = `UPDATE  sales SET sale_total_cost = (SELECT SUM(total_cost_item) FROM sale_items WHERE id_sale = ?) WHERE id_sale = ?`;
            await connection.query(totalCostQuery, [body.id_sale, body.id_sale]);


            return saleresult[0].affectedRows === 1 ? body : null;

        } catch (error: any) {


            console.error("Error creando la venta:", error.message);
            throw error;
        }

    }



    async read(): Promise<Sale[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sales`;
        const result = await connection.query(querySql);
        return result[0] as Sale[]
    }


    async searchById(id: number): Promise<Sale | null> {
        const connection = getPoolConnection();
        const querySql: string = `SELECT s.*, si.id_item, si.id_medicine, si.quantity, si.total_cost_item FROM sales s LEFT JOIN sale_items si ON s.id_sale = si.id_sale WHERE s.id_sale = ?`;
        const values = [id];
        const [result]: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);

        if (result.length === 0) {
            return null
        }
        const sale: Sale = {
            id_sale: result[0].id_sale,
            id_patient: result[0].id_patient,
            date_time: result[0].date_time,
            sale_total_cost: result[0].sale_total_cost,
            items: result.map(row => ({
                id_item: row.id_item,
                id_sale: row.id_sale,
                id_medicine: row.id_medicine,
                quantity: row.quantity,
                item_total_cost: row.total_cost_item
            }))
        }

        return sale
    }

    async remove(id: number): Promise<boolean> {
        const connection = getPoolConnection();

        try {
            const removeItemsquerySql = ` DELETE FROM sale_items WHERE id_sale = ?`;
            const itemsValues = [id];
            await connection.query(removeItemsquerySql, itemsValues);
        } catch (error) {
            console.error("Error al eliminar los items asociados a la venta:", error)
            return false
        }

        try {
            const querySql = ` DELETE FROM sales WHERE id_sale = ?`;
            const values = [id];
            const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);

            return result[0].affectedRows == 1

        } catch (error: any) {
            console.error("Error al eliminar la venta:", error);
            return false;
        }
    }

    async update(body: Sale): Promise<Sale | null> {
        const connection = getPoolConnection();

        try {

            const querySales = `UPDATE sales SET id_patient = ?, date_time = ? WHERE id_sale = ?`;
            const salesValues = [
                body.id_patient,
                body.date_time,
                body.id_sale
            ];
            const resultSales = await connection.query<ResultSetHeader>(querySales, salesValues);

            if (resultSales[0].affectedRows === 0) {
                throw new Error("No se encontró la venta para actualizar.");
            }
            const deleteItemsQuery = `DELETE FROM sale_items WHERE id_sale = ?`;
            await connection.query(deleteItemsQuery, [body.id_sale]);

            const saleItemRepository = new SaleItemRepository();
            for (const item of body.items) {

                item.id_sale = body.id_sale ?? 0;
                await saleItemRepository.create(item);
            }

            const totalCostQuery = `UPDATE sales SET sale_total_cost = (SELECT SUM(total_cost_item) FROM sale_items WHERE id_sale = ?) WHERE id_sale = ?`;
            await connection.query(totalCostQuery, [body.id_sale, body.id_sale])
            return body;

        } catch (error: any) {
            console.error("Error al actualizar la venta:", error);
            return null;
        }
    }
}