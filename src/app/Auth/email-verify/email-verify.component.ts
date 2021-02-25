import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css'],
})
export class EmailVerifyComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
