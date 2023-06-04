import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Hero } from '../interfaces/hero-interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly API_URL = 'http://localhost:8080/api/v1/hero';

  constructor(private http: HttpClient) {}

  getRandomHero(): Observable<Hero> {
    return this.http.get<Hero>(this.API_URL + '/Leyre/random');
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.API_URL + '/Leyre' + '/' + id);
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.API_URL + '/Leyre');
  }

  deleteHeroById(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + '/Leyre' + '/' + id);
  }

  saveHero(hero: Hero): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/Leyre`, hero);
  }
}
