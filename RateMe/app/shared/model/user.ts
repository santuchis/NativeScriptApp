//var validator = require("email-validator");
/*
valida el formato del email, poniendo email
<input type="email" ngModel name="email" required email>
*/

export class User {
    constructor(public name: string, public username: string, public email:string,
         public password:string, public roles:string[]) {}
    
    isValidEmail() {
        return this.email.includes("@");
    }
}