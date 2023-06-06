import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  user?: string;

  private userSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.username$.subscribe((username) => {
      this.user = username;
    });
    if (this.user) {
      return;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
