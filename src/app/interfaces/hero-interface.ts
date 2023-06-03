import { Advantage } from './advantage-interface';
import { Background } from './background-interface';
import { HeroCharacteristic } from './hero-characteristic-interface';
import { Hybris } from './hybris-interface';
import { Nation } from './nation-interface';
import { Religion } from './religion-interface';
import { Skill } from './skill-interface';
import { Virtue } from './virtue-interface';

export interface Hero {
  id?: number;
  user: string;
  name: string;
  concept: string;
  nation?: Nation;
  religion?: Religion;
  reputation?: string;
  richness?: string;
  characteristics?: HeroCharacteristic[];
  backgrounds?: Background[];
  advantages?: Advantage[];
  skills?: Map<Skill, number>;
  virtue?: Virtue;
  hybris?: Hybris;
  history?: string;
  imageUrl?: string;
  maximumBackgrounds: number;
  remainingBackgrounds: number;
  remainingCharacteristicPoints: number;
  maximumCharacteristicLevel: number;
  maximumSkillLevel: number;
  remainingSkillPoints: number;
  remainingAdvantagePoints: number;
  maximumAdvantagePoints: number;
  error?: string;
}
