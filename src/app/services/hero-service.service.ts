import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Hero } from '../interfaces/hero-interface';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly API_URL = 'http://localhost:8080/api/v1/hero';

  private username: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.username$.subscribe((username) => {
      this.username = username;
    });
  }

  getRandomHero(): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}/${this.username}/random`);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}/${this.username}/${id}`);
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.API_URL}/${this.username}`);
  }

  deleteHeroById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${this.username}/${id}`);
  }

  saveHero(hero: Hero): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.username}`, hero);
  }

  downloadPdf(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.username}/${id}/pdf`, {
      responseType: 'blob',
    });
  }
}
