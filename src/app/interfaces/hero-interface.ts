import { Advantage } from './advantage-interface';
import { Background } from './background-interface';
import { HeroCharacteristic } from './hero-characteristic-interface';
import { HeroSkill } from './hero-skill-interface';
import { Hybris } from './hybris-interface';
import { Language } from './language-interface';
import { Nation } from './nation-interface';
import { Religion } from './religion-interface';
import { Skill } from './skill-interface';
import { User } from './user-interface';
import { Virtue } from './virtue-interface';

export interface Hero {
  id?: number;
  user: User;
  name: string;
  concept: string;
  nation?: Nation;
  religion?: Religion;
  reputation?: string;
  richness?: number;
  characteristics?: HeroCharacteristic[];
  backgrounds?: Background[];
  advantages?: Advantage[];
  skills?: HeroSkill[];
  virtue?: Virtue;
  hybris?: Hybris;
  imageUrl?: string;
  languages?: Language[];
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
