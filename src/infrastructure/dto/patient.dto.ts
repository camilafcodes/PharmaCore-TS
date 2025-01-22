import { IsInt, IsString, IsDate, IsOptional, MaxLength, validate } from 'class-validator';

export class PatientDto {
    @IsString()
    id_patient: string;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    last_name: string;

    @IsDate()
    birth_date: Date;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    known_allergies: string;

    @IsInt()
    insurance_number: number;

    constructor(body: { id_patient: string; name: string; last_name: string; birth_date: Date; known_allergies: string; insurance_number: number }) {
        this.id_patient = body.id_patient;
        this.name = body.name;
        this.last_name = body.last_name;
        this.birth_date = body.birth_date;
        this.known_allergies = body.known_allergies;
        this.insurance_number = body.insurance_number;
    }

    async validateDto() {
        // NOTA: Retorna un arrays de errores.
        // Si no hay errores, retorna un array vacio.
        return await validate(this, {
          validationError: { target: false, value: false },
        });
    }
}

