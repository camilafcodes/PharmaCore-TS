export class Medicine {
    id_medicine? : number | null;
    name_medicine:  string;
    form : string;
    prescription : boolean;
    quantity_stock : number;
    unit_cost : number;

    constructor(infoMedicines:{
        id_medicine? :  number | null;
        name_medicine:  string;
        form : string;
        prescription : boolean;
        quantity_stock : number;
        unit_cost : number;
    }) {
        this.id_medicine = infoMedicines.id_medicine
        this.name_medicine = infoMedicines.name_medicine
        this.form = infoMedicines.form
        this.prescription = infoMedicines.prescription
        this.quantity_stock = infoMedicines.quantity_stock
        this.unit_cost = infoMedicines.unit_cost
    }
}
