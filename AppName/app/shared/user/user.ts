//var validator = require("email-validator");

export class User {
    email: string;
    password: string;

    constructor(email:string, password:string) {
        this.email = email;
        this.password = password;
    }
    
    isValidEmail() {
        return true;
        //return validator.validate(this.email);
    }
}