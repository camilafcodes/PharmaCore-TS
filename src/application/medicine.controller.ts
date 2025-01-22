import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Medicine } from "../domain/models/medicine";
import { MedicineDto, updateMedicineDto } from "../infrastructure/dto/medicine.dto";
import { MedicineRepository } from "../infrastructure/repositories/medicines.repository";

export class MedicineController implements Imanageable<Medicine> {
    private repository: MedicineRepository;
    constructor() {
        this.repository = new MedicineRepository();
    }

    async create(body:
        {
            name_medicine: string,
            form: string,
            prescription: boolean,
            quantity_stock: number,
            unit_cost: number
        }
    ): Promise<Medicine | null> {
        try {
            console.log(body);
            
            const dto = new MedicineDto(body);
            const errores = await dto.validateDto();
            if (errores.length > 0) {
                console.log("Existe errores en los datos", errores)
                return null;
            }
            
            const medicine = new Medicine(body);

            const result = await this.repository.create(medicine);
            if (result && result.id_medicine) {
                console.log(`el medicamento se agregó con exito`)
                return result;
            } else {
                console.log(`el medicamento pudo ser agregado`)
                return null;
            }

        } catch (error: any) {
            console.log("ha ocurrido un erro al agregar el medicamento.", error.message)
            return null
        }

    }
    

    async read(): Promise<Medicine[]> {
        const result: Medicine[] = await this.repository.read()

        if (result.length > 0) {
            console.log("medicamentos obtenidos")
        } else {
            console.log("no hay medicamentos registrados")
        }
        return result;
    }

    async searchById(id: number): Promise<Medicine | null> {
        try {
            const result = await this.repository.searchById(id)
            if (result) {
                return result
            } else {
                return null;
            }

        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }

    async searchByName(name: string): Promise<Medicine | null> {        
        try {
            const result = await this.repository.searchByName(name)            
            if (result) {
                return result
            } else {
                return null;
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }
    async remove(id: number): Promise<boolean> {
        try {
            const result = await this.repository.remove(id)
            if (result === true) {  
                console.log(`Medicamento eliminado`)
                return true;
            } else {
                console.log(`no se pudo eliminar el medicamento con id ${id}`)
                console.log(result);
                
                return false;
            }
        }
        catch (error) {
            console.log(`Ocurrio un error inesperado con el medicamento con ${id} Debido a que ya tiene una venta relacionada`)
            // console.log(error);
            return false;
        };
    }
    async removeStock(id: number): Promise<boolean> {
        try {
            const result = await this.repository.remove(id)
            if (result === true) {  
                console.log(`Stock eliminado`)
                return true;
            } else {
                console.log(`no se pudo eliminar el stock del medicamento con id ${id}`)
                console.log(result);
                
                return false;
            }
        }
        catch (error) {
            console.log(`Ocurrio un error inesperado con el medicamento con ${id}`)
            console.log(error);
            return false;
        };
    }

    async update(body: { 
        id_medicine: number;
        name_medicine: string,
        form: string,
        prescription: boolean,
        quantity_stock: number,
        unit_cost: number }): Promise<Medicine | null> {
        try {
            const updateDto = new updateMedicineDto(body);
            const errores = await updateDto.validateDto();
            console.log(errores);
            if (errores.length > 0) {
                throw new Error('Error al validar los datos');
            }
            const medicine = new Medicine(body);
            const result = await this.repository.update(medicine);
            console.log(result);
            if(result && result.id_medicine){
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
  }