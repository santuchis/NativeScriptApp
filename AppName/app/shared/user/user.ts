//var validator = require("email-validator");

export class User {
    email: string;
    password: string;

    constructor(email:string, password:string) {
        this.email = email;
        this.password = password;
    }
    
    isValidEmail() {
        if(this.email.includes("@")) {
            return true
        }
        return false;
        //return validator.validate(this.email);
    }
}