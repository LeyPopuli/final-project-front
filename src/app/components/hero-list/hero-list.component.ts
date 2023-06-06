import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/interfaces/hero-interface';
import { HeroService } from 'src/app/services/hero-service.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  user?: string;

  private userSubscription?: Subscription;

  constructor(
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
      this.getAllHeroes();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getAllHeroes() {
    this.heroService.getAllHeroes().subscribe({
      next: (heroes: Hero[]) => {
        this.heroes = heroes;
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

  dialogDataDelete: ConfirmDialogData = {
    title: 'Confirm delete',
    message: '',
    button1: 'Cancel',
    button2: 'Delete',
  };

  confirmDelete(hero: Hero): void {
    this.dialogDataDelete.message = `Do you want to end the adventures of ${hero.name}?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.dialogDataDelete,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'button2') {
        this.heroService.deleteHeroById(hero.id!).subscribe(
          () => {
            this.router.navigate(['']);
          },
          (error: any) => {
            if (error.status === 417) {
              alert(error.error.message);
            } else {
              console.log(error);
            }
          }
        );
      }
    });
  }

  editHero(heroId: number) {
    this.router.navigate(['/hero-details'], { queryParams: { id: heroId } });
  }

  onDownloadClick(heroId: number) {
    const downloadUrl = `http://localhost:8080/api/v1/hero/${this.user}/${heroId}/pdf`;
    window.location.href = downloadUrl;
  }
}
