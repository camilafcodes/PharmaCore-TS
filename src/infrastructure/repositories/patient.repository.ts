import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Imanageable } from "../../domain/models/Imanager/Imanageable";
import { Patient } from "../../domain/models/patient";
import { getPoolConnection } from "./config/data.source";

export class PatientRepository implements Imanageable<Patient> {

  async create(patient: Patient): Promise<Patient | null > {
    const connection = getPoolConnection();
    const sql = `INSERT INTO patients (id_patient, name, last_name, birth_date, known_allergies, insurance_number) VALUES (?, ?, ?, ?, ?, ?)`;
    const values: Array<string | number | Date> = [
      patient.id_patient,
      patient.name,
      patient.last_name,
      patient.birth_date,
      patient.known_allergies,
      patient.insurance_number,
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(sql, values);
     result[0].insertId.toString();
    return result[0].affectedRows == 1? patient:null;
  }


  async read(): Promise<Patient[]> {
      const connection = getPoolConnection();
      const sql = `SELECT * FROM patients`;
      const result = await connection.query<RowDataPacket[]>(sql);
      return result[0] as Patient[];
    }

    async searchById(id: number): Promise<Patient | null> {
        const connection = getPoolConnection();
        const sql = `SELECT * FROM patients WHERE id_patient = ?`;
        const values = [id];
        const result: [RowDataPacket[], FieldPacket[]] = await connection.query(sql, values);
        return result[0].length > 0 ? result[0][0] as Patient : null;;
    }

    async remove(id: number): Promise<boolean> {
      const connection = getPoolConnection();
      const sql = `DELETE FROM patients WHERE id_patient = ?`;
      const values = [id];
      const result: [ResultSetHeader, FieldPacket[]] = await connection.query(sql, values);
      return result[0].affectedRows == 1? true:false;
    }

    async update(patient: Patient): Promise<Patient | null> {
      const connection = getPoolConnection();
      const sql = `UPDATE patients SET name = ?, last_name = ?, birth_date = ?, known_allergies = ?, insurance_number = ? WHERE id_patient = ?`;
      const values = [
        patient.name,
        patient.last_name,
        patient.birth_date,
        patient.known_allergies,
        patient.insurance_number,
        patient.id_patient,
      ];
      const result = await connection.query<ResultSetHeader>(sql, values);
    return result[0].affectedRows == 1? patient:null;

    }
}