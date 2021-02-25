import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  signIn() {
    console.log('i am login component');
    this.authService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
