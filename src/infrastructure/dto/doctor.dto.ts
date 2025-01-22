import { IsNumber, IsString, Length, validate } from "class-validator";

export class DoctorDto {
  @IsNumber()
  id_doctor: number;

  @IsString()
  @Length(3, 20)
  name: string;
  @IsString()
  @Length(3, 20)
  last_name: string;

  constructor(body: { id_doctor: number; name: string; last_name: string }) {
    this.id_doctor = body.id_doctor;
    this.name = body.name;
    this.last_name = body.last_name;
  }

  async validateDto() {
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }
}

export class updateDtoDoctor extends DoctorDto {
  @IsNumber()
  id_doctor: number;

  constructor(body: {
    id_doctor: number;
    name: string;
    last_name: string;
   
  }) {
    super(body);
    this.id_doctor = body.id_doctor;
  }
}
