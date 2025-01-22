import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { Patient } from "../domain/models/patient";
import { PatientDto } from "../infrastructure/dto/patient.dto";
import { PatientRepository } from "../infrastructure/repositories/patient.repository";


export class PatientController implements Imanageable<Patient> {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async create(body: Patient): Promise<Patient | null> {
        try {
            body.birth_date = new Date(body.birth_date);
            const patientDto = new PatientDto(body);
            const errors = await patientDto.validateDto();
            if (errors.length > 0) {
                console.log('Validación fallida. error: ', errors);
                return null;
            }
            const patient = new Patient(body);
            const result = await this.patientRepository.create(patient);
            console.log(result);
            if (result && result.id_patient) {
                console.log(`El paciente ${patientDto.name} fue agregado correctamente.`);
                return result;
            } else {
                console.log("El paciente no se agregó", result);
            } return null;
        } catch (error: any) {
            console.error("Ha ocurrido un error al guardar el paciente:", error.message);
            return null;
        }

    }

    async read(): Promise<Patient[]> {
        try {
            const result = await this.patientRepository.read();

            if (result.length > 0) {
                console.log(`Se encontraron ${result.length} pacientes: `, result);
            } else {
                console.log("No se encontraron pacientes.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al leer los pacientes.", error?.message);
            return error;
        }
    }

    async searchById(id_patient: number): Promise<Patient | null> {
        try {
            if (!id_patient) {
                console.log("No se ha introducido el id del paciente.");
                return null;
            }
            const result = await this.patientRepository.searchById(id_patient);
            if (result) {
                console.log('Paciente encontrado:', result);
            } else {
                console.log("No se encontró el paciente.");
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al buscar el paciente por ID.", error?.message);
            throw new Error(error.message);
        }
    }

    async remove(id_patient: number): Promise<boolean> {
        try {
            if (!id_patient) {
                console.log("No se ha introducido el id del paciente.");
                return false;
            }
            const result = await this.patientRepository.remove(id_patient);
            if (result === true) {
                console.log(`Paciente eliminado con éxito.`);
            } else {
                console.log(`No se pudo eliminar el paciente con id ${id_patient}.`);
                return false;
            }
            return result;
        } catch (error: any) {
            console.log("Ha ocurrido un error al eliminar el paciente." + error?.message);
            return error;
        }
    }

    async update(patient: Patient): Promise<Patient | null> {
        try {
            patient.birth_date = new Date(patient.birth_date);
            const patientDto = new PatientDto(patient);
            const errors = await patientDto.validateDto();
            if (errors.length === 0) {
                console.log('Validación correcta. error: ', errors);
            } else {
                console.log('Validación fallida. error: ', errors);
                return null;
            }
            const patientUp = new Patient(patient);
            const result = await this.patientRepository.update(patientUp);
            if (result && result.id_patient) {
                console.log(`Paciente actualizado con éxito: ${patientUp.id_patient}`);
                return result;
            } else {
                console.log("No se pudo actualizar el paciente.");
                return null;
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error al actualizar el paciente.");
            throw new Error(error?.message);
        }
    }
}