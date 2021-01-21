import React from 'react';
import { Router } from '../../router/Router';
import { Store } from '../../store/StoreProvider';
import { Cookies } from '../cookies/Cookies';
import { I18n } from '../i18n/I18n';
import { Outline } from '../outline/Outline';
import { LoadingSkeleton } from '../skeleton/LoadingSkeleton';
import { ExceptionHandler } from '../utility/exception/ExceptionHandler';
import { AppConfig } from './AppConfig';

export const App = (): JSX.Element => {
  return (
    <ExceptionHandler>
      <AppConfig>
        <Cookies>
          <Store>
            <Router>
              <I18n>
                <LoadingSkeleton>
                  <Outline />
                </LoadingSkeleton>
              </I18n>
            </Router>
          </Store>
        </Cookies>
      </AppConfig>
    </ExceptionHandler>
  );
};
