//var validator = require("email-validator");

export class User {
    email: string;
    password: string;
    roles: string[];

    constructor(email:string, password:string, roles:string[]) {
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
    
    isValidEmail() {
        if(this.email.includes("@")) {
            return true
        }
        return false;
        //return validator.validate(this.email);
    }
}