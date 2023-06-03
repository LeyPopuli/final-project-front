import { Advantage } from './advantage-interface';
import { Skill } from './skill-interface';

export interface Background {
  id: string;
  name: string;
  description: string;
  peculiarity: string;
  advantages: Advantage[];
  skills: Skill[];
}
