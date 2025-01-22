
import { Doctor } from "../domain/models/doctor";
import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { DoctorDto, updateDtoDoctor } from "../infrastructure/dto/doctor.dto";
import { doctorRepository } from "../infrastructure/repositories/doctor.repository";


export class doctorController implements Imanageable<Doctor> {
  // agregar la interface
  private repository: doctorRepository;

  constructor() {
    this.repository = new doctorRepository();
  }

  async create(body:{
    id_doctor: number;
    name:string;
    last_name:string;

  }): Promise<Doctor | null> {
    try {
      const create = new DoctorDto(body)
      const errores = await create.validateDto();
      if (errores.length > 0) {
        throw new Error("Hubo un eror al validar los datos "); 
        
      } 

      const doctor = new Doctor(body);
      const result = await this.repository.create(doctor);
      if(result) {
        console.log(`se agregó con exito`);
        return result;
      }else {
        console.log (" no se agregó")
      }

    
    } catch (error: any) {
      console.log("ha ocurrido un erro al agregar.", error.message);
    }
    return null;
  }

  async read(): Promise<Doctor[]> {
    const result: Doctor[] = await this.repository.read();
    if (result.length > 0) {
      console.log(" obtenidos");
    } else {
      console.log("no se encontró");
    }

    return result;
  }

  async searchById(id: number): Promise<Doctor | null> {
    try {
      const resultado = await this.repository.searchById(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error inesperado", error.message);
      return null;
    }
  }

  async remove(id: number): Promise<boolean> {
    
    try {
      const resultado = await this.repository.remove(id);

      if (resultado === true) {
        console.log(` eliminado`);
        return true;
      } else {
        console.log(`no se pudo eliminar el ${id}`);
        return false;
      }
    } catch (error) {
      throw{ message:"error inesperado", error}
    }
  }
   
  async update(body: {
    id_doctor: number;
    name: string;
    last_name: string;
  
  }): Promise<Doctor | null> {
    try {
      const update = new updateDtoDoctor(body);
      const errores = await update.validateDto();

      if (errores.length > 0) {
        console.log(" actualizado");
        throw new Error("Hubo un eror al validar los datos ");
      }

      const doctor = new Doctor(body);
      const result = await this.repository.update(doctor);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
