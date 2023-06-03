import { Characteristic } from './characteristic-interface';
import { Hero } from './hero-interface';

export interface HeroCharacteristic {
  id?: number;
  characteristic: Characteristic;
  hero: Hero;
  level: number;
}
