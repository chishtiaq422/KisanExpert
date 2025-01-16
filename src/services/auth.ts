import { users } from '../models/entities/users';
import * as helper from '../helpers/generalHelper';
import { AuthDto, RegisterDto, User } from './../models/user';
import { roles } from '../models/entities/roles';
export async function CheckUserDetails(authDto: AuthDto): Promise<User> {
    let userDetails: User = new User();
    try {
        var user = await users.findOne({
            where: {
                email: authDto.email
            },
            include:[{model: roles, as: 'role'}]
        });
        if (user) {
            if(user.password_hash != authDto.password) {
                userDetails.IsSuccess = false;
                userDetails.ErrorDetails = "Invalid credentials.";
                return userDetails;
            }
            userDetails.email = user.email;
            userDetails.created_at = user.created_at;
            userDetails.id = user.id;
            userDetails.IsSuccess = true;
            userDetails.IsFarmer = user.role?.name == "Farmer" ? true : false; 
            userDetails.IsVendor = user.role?.name == "Vendor" ? true : false; 
            userDetails.IsGovtAgency = user.role?.name == "Government Official" ? true : false; 
        } else {
            
            userDetails.IsSuccess = false;
            userDetails.ErrorDetails = "user not found in the database.";
        }
    } catch(error:any) {
        userDetails.IsSuccess = false;
        userDetails.ErrorDetails = error.message;
    }
    return userDetails;
}



export async function createUser(authDto: RegisterDto): Promise<User> {
    let userDetails: User = new User();
    try {
        var existingUser = await users.findOne({
            where: {
                email: authDto.email
            },
            attributes:['id']
        });

        if (existingUser) {
            userDetails.IsSuccess = false;
            userDetails.ErrorDetails = "Email already exists.";
            return userDetails;
        }

        var newUser = await users.create({
            username: authDto.email,
            email: authDto.email,    
            password_hash: authDto.password_hash,
            role_id: authDto.role_id});

        userDetails.email = newUser.email;
        userDetails.created_at = newUser.created_at;
        userDetails.IsFarmer = authDto.role_id=== 1 ? true : false; 
            userDetails.IsVendor = authDto.role_id=== 2 ? true : false; 
            userDetails.IsGovtAgency = authDto.role_id=== 3 ? true : false; 
   
        userDetails.IsSuccess = true;
    } catch (error: any) {
        userDetails.IsSuccess = false;
        userDetails.ErrorDetails = error.message;
    }
    return userDetails;
}