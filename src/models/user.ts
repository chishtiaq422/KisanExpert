import { StatusModel } from "./StatusDto";

export class  User extends StatusModel{
    id!: number;
    email!: string;
    password_hash!: string;
    role_id!: number;
    created_at?: Date;
    IsFarmer: boolean=false;
    IsVendor: boolean=false;
    IsGovtAgency: boolean=false;
}



export class RegisterDto{
    email!: string;
    password_hash!: string;
    role_id!: number;
}

export class AuthDto
{
  public email!: string;
    public password!: string;
}

export class AuthResponseDto extends StatusModel
{
    public Token?: string;
}

export class GoogleAuthDto{
    ClientId!: string;
    ClientSecret!: string;
}




