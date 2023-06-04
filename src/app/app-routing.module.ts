import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'hero-details', component: HeroDetailsComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
