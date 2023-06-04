import { Hero } from './hero-interface';
import { Skill } from './skill-interface';

export interface HeroSkill {
  id?: number;
  skill: Skill;
  hero: Hero;
  level: number;
}
