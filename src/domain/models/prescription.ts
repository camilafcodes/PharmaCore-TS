import { PrescriptionItem } from "./prescriptionItem";

export class Prescription {
    id_prescription?: number | null;
    id_patient: string;
    id_doctor: number;
    issue_date: Date; 
    items: Array<PrescriptionItem>;  

    constructor(infoPrescription: {
        id_prescription?: number | null,
        id_patient: string,
        id_doctor: number,
        issue_date: Date,
        items: Array<PrescriptionItem>

    }) {
        this.id_prescription = infoPrescription.id_prescription;
        this.id_patient = infoPrescription.id_patient;
        this.id_doctor = infoPrescription.id_doctor;
        this.issue_date = infoPrescription.issue_date;
        this.items = infoPrescription.items;
    }
}