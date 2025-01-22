
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Doctor } from "../../domain/models/doctor";
import { getPoolConnection } from "./config/data.source";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";


export class doctorRepository implements Imanageable<Doctor> {



  async create(body: Doctor): Promise<Doctor | null> {
    const connection = getPoolConnection();
    const querySql: string = `INSERT  INTO doctors (id_doctor,name,last_name) values (?,?,?)`;
    const values: Array<string | number> = [
      body.id_doctor,
      body.name,
      body.last_name
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );
    result[0].insertId;
    return result[0].affectedRows == 1 ? body : null;
  }

  async read(): Promise<Doctor[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM doctors`;
    const result = await connection.query(querySql);
    return result[0] as Doctor[]
  }


  async searchById(id: number): Promise<Doctor | null> {
    const connection = getPoolConnection();
    const querySql: string = `SELECT   * FROM doctors WHERE id_doctor = ?`;
    const values = [id];
    const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
    return result[0].length > 0 ? result[0][0] as Doctor : null;
  }



  async remove(id: number): Promise<boolean> {
    const connection = getPoolConnection();
    const querySql = ` DELETE FROM doctors WHERE id_doctor = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );

    return result[0].affectedRows == 1 ? true : false;
  }

  async update(body: Doctor): Promise<Doctor | null> {
    const connection = getPoolConnection();
    const querySql = `UPDATE doctors SET   name = ? , last_name = ? WHERE id_doctor = ? `;
    const values = [body.name, body.last_name, body.id_doctor];
    const result = await connection.query<ResultSetHeader>(querySql, values);

    result[0].insertId;
    return result[0].affectedRows == 1 ? body : null;


  }


}

