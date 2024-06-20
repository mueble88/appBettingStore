import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export class MyValidations{

  static comparePasswords:ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = control.get("newPassword");
    const checkPassword = control.get("checkPassword");
    if(newPassword !== checkPassword){
      return { comparePasswords: true }
    }
    return null;
  }

  static checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = control.get("newPassword");
    const checkPassword = control.get("checkPassword");
    //Comprobamos unicamente
    return newPassword &&
      checkPassword &&
      newPassword.value !== checkPassword.value
      ? { passwordCoincide: false }
      : null;
  };

  static differentPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const oldPassword = control.get("oldPassword");
    const newPassword = control.get("newPassword");
    //Comprobamos unicamente
    return oldPassword &&
    newPassword &&
      newPassword.value !== oldPassword.value
      ? { passwordCoincide: false }
      : null;
  };

  static validatedField: ValidatorFn = (control: AbstractControl): ValidationErrors | null=> {
    const email = control.get("email");
    const password = control.get("password");
    if(email?.invalid || password?.invalid){
      return { emptyField: true }
    }
    return null;
  };


}
