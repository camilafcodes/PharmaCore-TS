import { SaleItem } from "../../domain/models/saleItem";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";

export class SaleItemRepository implements Imanageable<SaleItem> {

    async create(body: SaleItem): Promise<SaleItem | null> {
        const connection = getPoolConnection();
        const querySql: string = 'INSERT INTO sale_items (id_sale, id_medicine, quantity, total_cost_item) VALUES (?,?,?,(?*(SELECT unit_cost FROM medicines WHERE id_medicine = ?)))';
        const values: Array<string | number> =
            [body.id_sale,
            body.id_medicine,
            body.quantity,
            body.quantity,
            body.id_medicine];
        ;
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        body.id_item = result[0].insertId;
        return result[0].affectedRows == 1 ? body : null;
    }

    async read(): Promise<SaleItem[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM sale_items`;
        const result = await connection.query(querySql);
        return result[0] as SaleItem[]
    }


    async searchById(id: number): Promise<SaleItem | null> {
        const connection = getPoolConnection();
        const querySql: string = `SELECT   * FROM sale_items WHERE id = ?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
        return result[0].length > 0 ? result[0][0] as SaleItem : null;
    }



    async remove(id: number): Promise<boolean> {
        const connection = getPoolConnection();
        const querySql = ` DELETE FROM sale_items WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
            querySql,
            values
        );

        return result[0].affectedRows == 1 ? true : false;
    }

    async update(body: SaleItem): Promise<SaleItem | null> {
        const connection = getPoolConnection();
        const querySql = `UPDATE sale_items SET id_sale= ?, id_medicine = ?, quantity = ?, total_cost_item = quantity * (SELECT unit_cost FROM medicines WHERE id_medicine = ?) WHERE id_item = ?`;
        const values = [
            body.id_sale,
            body.id_medicine,
            body.quantity,
            body.id_medicine,
            body.id_item,
        ];
        const result = await connection.query<ResultSetHeader>(querySql, values);

        return result[0].affectedRows == 1 ? body : null;


    }
}