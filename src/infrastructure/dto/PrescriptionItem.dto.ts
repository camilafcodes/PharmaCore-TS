import { IsNumber, IsString, validate } from "class-validator";

export class PrescriptionItemDto {
    @IsNumber()
    id_prescription: number;

    @IsNumber()
    id_medicine: number;

    @IsNumber()
    quantity: number;

    @IsString()
    usage_instructions: string;

    constructor(body: { id_prescription: number, id_medicine: number, quantity: number, usage_instructions: string }) {
        this.id_prescription = body.id_prescription;
        this.id_medicine = body.id_medicine;
        this.quantity = body.quantity;
        this.usage_instructions = body.usage_instructions;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
          });
    }
}

export class updatePrescriptionItemDto extends PrescriptionItemDto {
    @IsNumber()
    id_item: number;

    constructor(body: { 
        id_item: number,
        id_prescription: number, 
        id_medicine: number, 
        quantity: number, 
        usage_instructions: string 
    }) {
        super({
            id_prescription: body.id_prescription,
            id_medicine: body.id_medicine,
            quantity: body.quantity,
            usage_instructions: body.usage_instructions
        });
        this.id_item = body.id_item;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
          });
    }
}