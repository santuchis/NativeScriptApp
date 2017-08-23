//var validator = require("email-validator");

export class User {
    name: string;
    username: string;
    email: string;
    password: string;
    roles: string[];

    constructor(name: string, username: string, email:string, password:string, roles:string[]) {
        this.name = name;
        this.username = username;
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