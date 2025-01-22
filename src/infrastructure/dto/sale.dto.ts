import { IsString, IsNumber, IsDate, validate } from "class-validator";
export class SaleDto {

    @IsString()
    id_patient: string;

    @IsDate()
    date_time: Date;

    constructor(body: {

        id_patient: string,
        date_time: Date,

    }) {
        this.id_patient = body.id_patient;
        this.date_time = body.date_time;
    }

    async validateDto() {

        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }

}
export class UpdateSaleDto extends SaleDto {

    @IsNumber()
    id_sale: number;

    constructor(body: {
        id_sale: number
        id_patient: string,
        date_time: Date,

    }) {
        super({
            id_patient: body.id_patient,
            date_time: body.date_time,
        });
        this.id_sale = body.id_sale;
    }
    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}


