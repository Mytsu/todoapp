import { uuidv4 } from './../utils/uuidv4';

export interface Todo {
  id: string;
  done: boolean;
  content: string;
}
