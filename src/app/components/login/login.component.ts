import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName!: string;
  password!: string;
  isRegistrationMode: boolean = false;
  userCreated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = '';
    this.password = '';
  }

  activeRegistrationMode() {
    this.isRegistrationMode = !this.isRegistrationMode;
  }

  loginOrRegister(): void {
    const user = {
      userName: this.userName,
      password: this.password,
    };

    if (!this.isRegistrationMode) {
      this.authService.login(user).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.authService.setUserName(this.userName);
        },
        error: (error: any) => {
          if (error.status === 417) {
            alert(error.error.message);
          } else {
            console.log(error);
          }
        },
      });
    } else {
      this.authService.register(user).subscribe({
        next: () => {
          this.activeRegistrationMode();
          this.userCreated = true;
          this.userName = '';
          this.password = '';
        },
        error: (error: any) => {
          if (error.status === 417) {
            alert(error.error.message);
          } else {
            console.log(error);
          }
        },
      });
    }
  }
}
