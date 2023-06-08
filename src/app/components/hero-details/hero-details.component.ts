import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/interfaces/hero-interface';
import { HeroService } from 'src/app/services/hero-service.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnInit {
  heroId!: number;
  random!: boolean;
  hero!: Hero;
  isEdit: boolean = false;
  readonlyMode: boolean = true;
  user?: string;

  private userSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.username$.subscribe((username) => {
      this.user = username;
    });
    if (this.user) {
      if (this.wantEdit() === false) {
        this.createNewHero();
      }
      this.formTypeDefinition();
    } else {
      this.router.navigate(['/login']);
    }
  }

  wantEdit(): boolean {
    this.route.queryParams.subscribe((params) => {
      this.heroId = params['id'];

      if (this.heroId) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    });

    return this.isEdit;
  }

  dialogDataNewHero: ConfirmDialogData = {
    title: 'New hero',
    message:
      'Do you desire to forge a random epic hero or meticulously tailor their journey?',
    button1: 'Customize',
    button2: 'Random',
  };

  createNewHero(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.dialogDataNewHero,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'button1') {
        this.router.navigate(['/hero-details'], {
          queryParams: { random: 'false' },
        });
      } else {
        this.router.navigate(['/hero-details'], {
          queryParams: { random: 'true' },
        });
      }
    });
  }

  formTypeDefinition(): void {
    this.route.queryParams.subscribe((params) => {
      this.heroId = params['id'];
      this.random = params['random'];

      if (this.heroId) {
        this.heroService.getHeroById(this.heroId).subscribe({
          next: (hero: Hero) => {
            this.hero = hero;
          },
          error: (error) => {
            if (error.status === 417) {
              alert(error.error.message);
            } else {
              console.log(error);
            }
          },
        });
      } else if (this.random) {
        this.heroService.getRandomHero().subscribe({
          next: (hero: Hero) => {
            this.hero = hero;
          },
          error: (error) => {
            if (error.status === 417) {
              alert(error.error.message);
            } else {
              console.log(error);
            }
          },
        });
      } else if (this.random === false) {
      }
    });
  }

  saveHero(hero: Hero) {
    this.heroService.saveHero(hero).subscribe({
      next: () => {
        this.router.navigate(['/']);
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
