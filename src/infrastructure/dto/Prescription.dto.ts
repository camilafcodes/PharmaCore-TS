
import { IsDate, IsNumber, IsString, validate } from "class-validator";

export class PrescriptionDto {

    @IsString()
    id_patient: string;

    @IsNumber()
    id_doctor: number;

    @IsDate()
    issue_date: Date;


    constructor(body: { id_patient: string, id_doctor: number, issue_date: Date }) {
        this.id_patient = body.id_patient;
        this.id_doctor = body.id_doctor;
        this.issue_date = body.issue_date;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
          });
    }

}

export class updatePrescriptionDto extends PrescriptionDto {
    @IsNumber()
    id_prescription: number;

    constructor(body: { 
        id_prescription: number, 
        id_patient: string, 
        id_doctor: number, 
        issue_date: Date 
    }) {
        super({
            id_patient: body.id_patient,
            id_doctor: body.id_doctor,
            issue_date: body.issue_date
        });
        this.id_prescription = body.id_prescription;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
          });
    }
}