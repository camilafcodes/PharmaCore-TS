export class Doctor {
  id_doctor: number ;
  name: string;
  last_name: string;
  

  /**
   *
   */
  constructor(infoUser: {
    id_doctor: number ;
    name: string;
    last_name: string;
    
  }) {
    this.id_doctor = infoUser.id_doctor;
    this.name = infoUser.name;
    this.last_name= infoUser.last_name;
    
  }
}
