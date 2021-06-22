import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms"

import {PasswordChecker} from "./custom-validators/password-checker"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'signup-reactive-app';

  registerForm! : FormGroup
  submitted = false;


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      acceptTandC: [false, Validators.requiredTrue],
    },{
      validators: PasswordChecker('password','confirmPassword')
    }
    
    )
  }

  constructor(private fb: FormBuilder){

  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm?.invalid){
      return 
    }

    console.table(this.registerForm?.value);
    console.table(this.registerForm);
    console.log("Success Signup"+ JSON.stringify(this.registerForm?.value) );
  }

  onReset(){
    this.submitted = false
    this.registerForm?.reset();
  }

  get h(){
    return this.registerForm.controls
  }


}
