import { IsBoolean, IsNumber, IsString, Length, validate } from "class-validator";

export class MedicineDto {
  @IsString()
  name_medicine: string;

  @IsString()
  form: string;

  @IsBoolean()
  prescription: boolean

  @IsNumber()
  quantity_stock: number;

  @IsNumber()
  unit_cost: number;

  constructor(body: { name_medicine: string; form: string; prescription: boolean; quantity_stock: number, unit_cost: number }) {
    this.name_medicine = body.name_medicine;
    this.form = body.form;
    this.prescription = body.prescription;
    this.quantity_stock = body.quantity_stock;
    this.unit_cost = body.unit_cost;
  }

  async validateDto() {
    // NOTA: Retorna un arrays de errores.
    // Si no hay errores, retorna un array vacio.
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }
}

export class updateMedicineDto extends MedicineDto {
  @IsNumber()
  id_medicine: number;

  constructor(body: {
    id_medicine: number;
    name_medicine: string;
    form: string;
    prescription: boolean;
    quantity_stock: number;
    unit_cost: number;
  }) {
    super(body);
    this.id_medicine = body.id_medicine;
  }

  
}