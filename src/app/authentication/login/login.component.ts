import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup =  this.initLoginForm();
  public error: string | null = null;

  constructor( private readonly loginService: LoginService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(8)])
    })
  }

  public submit(): void {
    if (this.loginForm.valid) {
      this.loginService.authenticate(this.loginForm.value).subscribe((res) => 
        res && this.router.navigate(['../','dashboard'])
      );
    }
    const errs = Object.values({...this.loginForm.get('Username')?.errors, ...this.loginForm.get('Password')?.errors});

    switch(errs[0]) {
      case Validators.required:
        this.error = 'Missing required field';
        break;
      case Validators.maxLength:
        this.error = 'Missing required field';
        break;
      case Validators.minLength:
        this.error = 'Missing required field';
        break;

    }

  }

  public authLoadTestWithParallelRequests(): void {
    const requests: Observable<boolean>[] = [];
    for(let i = 0; i < 100; i++) {
      window.setTimeout(() => this.loginService.authenticate({
        username: "atis8711",
        password: "atis8711",
        count: i+1
      }).subscribe(), i);
    }
    forkJoin(requests).subscribe((res) => console.log(res));
  }
}

