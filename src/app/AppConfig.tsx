import 'reflect-metadata';
import { FontAwesome } from '../font/FontAwesome';
import { AppContext } from './AppContext';

export const AppConfig = (): null => {
  AppContext();
  FontAwesome();

  return null;
};
