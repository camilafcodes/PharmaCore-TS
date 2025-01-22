import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { PrescriptionItem } from "../domain/models/prescriptionItem";
import { PrescriptionItemDto } from "../infrastructure/dto/PrescriptionItem.dto";
import { PrescriptionItemRepository } from "../infrastructure/repositories/prescriptionItem.repository";

export class PrescriptionItemController implements Imanageable<PrescriptionItem> {
    private repository: PrescriptionItemRepository;

    constructor() {
        this.repository = new PrescriptionItemRepository();
    }

    async create(body: PrescriptionItem): Promise<PrescriptionItem | null> {
        try {
            const prescriptionItemDto = new PrescriptionItemDto(body);
            const errors = await prescriptionItemDto.validateDto();
            if (errors.length > 0) {
                console.log('Errores en los datos : ', errors);
                return null;
            }
            const prescriptionItem = new PrescriptionItem(body);
            const result = await this.repository.create(prescriptionItem);
            if (result && result.id_item) {
                console.log("El detalle de la receta se creo correctamente", result);
                return result;
            }
            else {
                console.log("El detalle de la receta no se creo", result);
                return null;
            }
        } catch (error: any) {
            console.error("Ha ocurrido un error inesperado :", error.message);
            return null;
        }
    }

    async read(): Promise<PrescriptionItem[]> {
        try {
            const result = await this.repository.read();
            if (result) {
                console.log("se encontro el registro");
                return result;
            }
            else {
                console.log("no se encontro el registro");
                return [];
            }
        }
        catch (error) {
            throw error;
        }
    }

    async update(body: { id_item: number; id_prescription: number; id_medicine: number; quantity: number; usage_instructions: string; }): Promise<PrescriptionItem | null> {
        try {
            const prescriptionItemDto = new PrescriptionItemDto(body);
            const errors = await prescriptionItemDto.validateDto();
            if (errors.length > 0) {
                console.log('Errores en los datos : ', errors);
                return null;
            }

            const prescriptionItem = new PrescriptionItem(body);
            const result = await this.repository.update(prescriptionItem);
            if (result && result.id_item) {
                console.log("se actualizo el registro");
                return result;
            }
            else {
                console.log("no se actualizo el registro");
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async remove(id: number): Promise<boolean> {
        try {
            const result = await this.repository.remove(id);
            if (result) {
                console.log("se elimino el registro");
                return result;
            }
            else {
                console.log("no se elimino el registro");
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async searchById(id: number): Promise<PrescriptionItem | null> {
        try {
            const result = await this.repository.searchById(id);
            if (result) {
                console.log("se encontro el registro");
                return result;
            }
            else {
                console.log("no se encontro el registro");
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }

}