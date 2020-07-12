import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/sesion.service';
import { ISession } from '../../models/sesion.interface';
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
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService) {
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
        this.correctLogin(response);
      },
      error: (err: any) => {
        this.clean(); // TODO - Handler error
        console.log(err, '¿ERROR?')
      }
    });
  }

  private correctLogin = (sesion: ISession) => {
    this.sessionService.setSession(sesion);
    this.router.navigate(['/todo']);
  }
}

export { LoginComponent };
