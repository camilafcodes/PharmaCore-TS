export class PrescriptionItem {
    id_item?: number;
    id_prescription: number;
    id_medicine: number;
    quantity: number;
    usage_instructions: string;
    
    constructor(infoPrescriptionItem: {
        id_item?: number;
        id_prescription: number;
        id_medicine: number;
        quantity: number;
        usage_instructions: string;
    }) {
        this.id_item = infoPrescriptionItem.id_item;
        this.id_prescription = infoPrescriptionItem.id_prescription;
        this.id_medicine = infoPrescriptionItem.id_medicine;
        this.quantity = infoPrescriptionItem.quantity;
        this.usage_instructions = infoPrescriptionItem.usage_instructions;
    }
}