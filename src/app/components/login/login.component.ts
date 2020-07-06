import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get field() {
    return this.loginForm.controls;
  }

  clean = () => {
    this.submitted = false;
    this.loginForm.reset();
  }

  onSubmit = () => {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.clean();
        console.log(response, '¿RESPONSE?')
      },
      error: (err: any) => {
        console.log(err, '¿ERROR?')
      }
    });
  }
}

export { LoginComponent };
