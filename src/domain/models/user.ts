export class User {
  id_user?: number | null;
  email: string;
  password: string;
  id_role: number;

  /**
   *
   */
  constructor(infoUser: {
    id_user?: number|null;
    email: string;
    password: string;
    id_role: number;
  }) {
    this.id_user = infoUser.id_user;
    this.email = infoUser.email;
    this.password= infoUser.password;
    this.id_role = infoUser.id_role
  }
}
