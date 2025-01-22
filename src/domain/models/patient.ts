
export class Patient {
    id_patient: string;
    name: string;
    last_name: string;
    birth_date: Date;
    known_allergies: string;
    insurance_number: number;

    constructor(infoPatient: {
        id_patient: string;
        name: string;
        last_name: string;
        birth_date: Date;
        known_allergies: string;
        insurance_number: number;
    }) {
        this.id_patient = infoPatient.id_patient;
        this.name = infoPatient.name;
        this.last_name = infoPatient.last_name;
        this.birth_date = infoPatient.birth_date;
        this.known_allergies = infoPatient.known_allergies;
        this.insurance_number = infoPatient.insurance_number;
    }
}