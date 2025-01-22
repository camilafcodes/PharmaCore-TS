import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { User } from "../domain/models/user";
import { updateDto, userDto } from "../infrastructure/dto/user.dto";
import { UserRepository } from "../infrastructure/repositories/user.repository";


export class UserCtrl implements Imanageable<User> {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
   
  async create(body: {
    email: string;
    password: string;
    id_role: number;
  }): Promise<User | null> {
    try {
      const create = new userDto(body);
            
      const errores = await create.validateDto();

      if (errores.length > 0) {
        throw new Error("Hubo un eror al validar los datos "); 
      } 
       
      const user = new User(body);

      const result = await this.repository.create(user);
      console.log(3);
        if (result ) {
          console.log(`el usuario  se agregó con exito`);
          return result;
      }else{
        console.log ("el usuario no se agregó")
        return null
      }
    } catch (error: any) {
      console.log("ha ocurrido un erro", error.message);
      return null;
    }
   
  }

  async read(): Promise<User[]> {
    const result: User[] = await this.repository.read();
    if (result.length > 0) {
      console.log("usuarios obtenidos");
    } else {
      console.log("no se encontró");
    }

    return result;
  }

  async searchById(id: number): Promise<User | null> {
    
    try {
      const resultado = await this.repository.searchById(id);
      if (resultado) {
        console.log("busqueda exitosa ")
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
        console.log(`usuario eliminado`);
        return true;
      } else {
        console.log(`no se pudo eliminar el usuario ${id}`);
        return false;
      }
    } catch (error) {
      throw{ message:"error inesperado", error}
      
    }
  }

  async update(body: {
    id_user: number;
    email: string;
    password: string;
    id_role: number;
  }): Promise<User | null> {
    
     
    const update = new updateDto(body);
  
    const errores = await update.validateDto();

    if (errores.length > 0) {
          
      throw new Error(errores.join(', '));
    }
          
    const user = new User(body);
          
    const result = await this.repository.update(user);
                
    return result;
   
  }
}
