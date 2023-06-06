import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: string;
  private userSubscription?: Subscription;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.username$.subscribe((username) => {
      this.user = username;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onNewHeroClick() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/hero-details']);
    });
  }

  logOut() {
    this.user = '';
    this.router.navigate(['/login']);
  }
}
