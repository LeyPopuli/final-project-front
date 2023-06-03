import { Religion } from './religion-interface';

export interface Nation {
  id: string;
  name: string;
  religion: Religion;
}
