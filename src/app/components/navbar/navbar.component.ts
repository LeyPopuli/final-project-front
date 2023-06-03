import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  dialogDataNewHero: ConfirmDialogData = {
    title: 'New hero',
    message:
      'Do you desire to forge an epic hero or meticulously tailor their journey?',
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
          queryParams: { random: 'true' },
        });
      } else {
        this.router.navigate(['/hero-details']);
      }
    });
  }
}
