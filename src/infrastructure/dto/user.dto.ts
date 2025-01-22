import { IsEmail, IsNumber, IsString, Length, validate } from "class-validator";

export class userDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 19)
  password: string;
  @IsNumber()
  id_role:number;



  constructor(body: {
    email: string;
    password: string;
    id_role: number;
   
  }) {
    this.email = body.email;
    this.password= body.password;
    this.id_role = body.id_role
   
  }

  async validateDto() {
    
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }

   

}

export class updateDto extends userDto {
        
    @IsNumber()
    id_user: number;

    constructor(body: {
    id_user:number
    email: string;
    password: string;
    id_role:number;

      
     
    }) {
      super(body);
      this.id_user = body.id_user;
  }
  }
