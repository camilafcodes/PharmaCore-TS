import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { Medicine } from "../../domain/models/medicine";
import { getPoolConnection } from "./config/data.source";
import c from "config";


export class MedicineRepository implements Imanageable<Medicine> {
  
  async create(body: Medicine): Promise<Medicine | null> {
    const connection = getPoolConnection();
    const querySql= `INSERT INTO medicines (name_medicine,form,prescription,quantity_stock,unit_cost) VALUES (?,?,?,?,?)`;
    const values:   Array<string | number | boolean> = [
      body.name_medicine,
      body.form,
      body.prescription,
      body.quantity_stock,
      body.unit_cost,
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );
    body.id_medicine = result[0].insertId;
    return result[0].affectedRows == 1 ? body:null
  }

  async read(): Promise<Medicine[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM medicines`;
    try {
      const result = await connection.query<RowDataPacket[]>(querySql);
      return result[0] as Medicine[];
    } catch (error: any) {
      console.log(error);
      return error;
    }

  }
  
  async getOne(id_medicine: string): Promise<Medicine[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM medicines WHERE id_medicine = ?`;
    const values = [id_medicine];
    const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
    return queryResult[0] as Medicine[];
  }


  async searchById(id: number): Promise<Medicine | null> { 
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM medicines WHERE id_medicine =?`;
    const values = [id]
    const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
    return result[0].length > 0 ? result[0][0] as Medicine : null; 
}

  async searchByName(name: string): Promise<Medicine | null> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM medicines WHERE name_medicine = ?`;
    const values = [name]
    const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
    return result[0].length > 0 ? result[0][0] as Medicine : null; 
}

  async remove(id: number): Promise<boolean> {
    const connection = getPoolConnection();
    const querySql = `DELETE FROM medicines WHERE id_medicine = ?`;
    // const querySql = `UPDATE medicines SET quantity_stock = 0  WHERE id_medicine = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );
    return result[0].affectedRows == 1? true:false;
  }

  async removeStock(id: number): Promise<boolean> {
    const connection = getPoolConnection();
    // const querySql = `DELETE FROM medicines WHERE id_medicine = ?`;
    const querySql = `UPDATE medicines SET quantity_stock = 0  WHERE id_medicine = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );
    return result[0].affectedRows == 1? true:false;
  }

  async update(body: Medicine): Promise<Medicine | null> { 
    const connection = getPoolConnection();
    const querySql = `UPDATE medicines SET name_medicine = ?, form = ?, prescription = ?, quantity_stock = ?, unit_cost = ? WHERE id_medicine = ?`;
    const values = [
      body.name_medicine,
      body.form,
      body.prescription,
      body.quantity_stock,
      body.unit_cost,
      body.id_medicine,
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
    result[0].insertId;
    return result[0].affectedRows == 1? body:null;
  } 
}
