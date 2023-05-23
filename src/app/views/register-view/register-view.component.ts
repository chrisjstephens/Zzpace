import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ProcessRegisterService } from '../../services/process-register.service';


@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {
  registerForm: UntypedFormGroup;
  newUserError: string;
  newUserCreated = false;

  constructor(private processRegisterService: ProcessRegisterService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
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
        data => {
          if (!data.ok) {
            // Error, perhaps duplicate entry
            this.newUserError = data.error;
            this.newUserCreated = false;
          }
          // User created
          this.newUserCreated = true;
          this.newUserError = '';
        },
        error => {
          // Error, perhaps server side
          this.newUserError = error.error;
          this.newUserCreated = false;
        });
  }

}
