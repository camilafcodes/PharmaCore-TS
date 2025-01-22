import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Prescription } from "../domain/models/prescription";
import { PrescriptionItem } from "../domain/models/prescriptionItem";
import { PrescriptionDto, updatePrescriptionDto } from "../infrastructure/dto/Prescription.dto";
import { PrescriptionRepository } from "../infrastructure/repositories/prescription.repository";

export class PrescriptionController implements Imanageable<Prescription> {
    private repository: PrescriptionRepository;
    constructor() {
        this.repository = new PrescriptionRepository();
    }
    async create(body: {
        id_patient: string;
        id_doctor: number;
        issue_date: Date;
        items: Array<PrescriptionItem>;
    }): Promise<Prescription | null> {
        try {
            body.issue_date = new Date(body.issue_date);
            const prescriptionDto: PrescriptionDto = new PrescriptionDto(body);
            const errors = await prescriptionDto.validateDto();
            if (errors.length > 0) {
                console.log('Errores en los datos: ', errors);
                return null;
            }
            const prescription = new Prescription(body);
            const result = await this.repository.create(prescription);
            console.log(result);
            if (result && result.id_prescription) {
                console.log("la receta se creo correctamente", result);
                return result;
            } else {
                console.log("El receta no se creo", result);
            } return null;
        } catch (error: any) {
            console.error("Ha ocurrido un error inesperado :", error);
            return null;
        }
    }

    async read(): Promise<Prescription[]> {
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


    async update(body: { id_prescription: number; id_patient: string; id_doctor: number; issue_date: Date; items: Array<PrescriptionItem> }): Promise<Prescription | null> {
        try {
            body.issue_date = new Date(body.issue_date);
            const updateDto = new updatePrescriptionDto(body);
            const errores = await updateDto.validateDto();
            console.log(errores);
            if (errores.length > 0) {
                throw new Error('Error al validar los datos');
            }
            const result = await this.repository.update(body);
            if (result && result.id_prescription) {
                console.log("se actualizo el registro");
                return result;
            }
            else {
                console.log("no se actualizo el registro");
                return null;
            }
        }
        catch (error: any) {
            console.error("Ha ocurrido un error inesperado :", error);
            return null;
        }
    }

    async remove(id: number): Promise<boolean> {
        try {
            const result = await this.repository.remove(id);
            if (result) {
                console.log("se elimino el registro");
                return true;
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

    async searchById(id: number): Promise<Prescription | null> {
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