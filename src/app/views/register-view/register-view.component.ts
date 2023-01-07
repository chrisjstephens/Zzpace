import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProcessRegisterService } from '../../services/process-register.service';


@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {
  registerForm: FormGroup;
  newUserError = false;
  newUserCreated = false;

  constructor(private processRegisterService: ProcessRegisterService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    const formData = {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value
    };

    this.processRegisterService
      .submitData(formData)
      .subscribe(
         data => { this.newUserCreated = true },
         error => { this.newUserError = true, this.newUserCreated = false }
      );
  }

}
