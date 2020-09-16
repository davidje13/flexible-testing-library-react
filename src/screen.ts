import {
  screen as baseScreen,
  getQueriesForElement,
} from '@testing-library/react';
import * as baseQueries from './baseQueries';

const body = typeof document !== 'undefined' ? document.body : undefined;
let screen = {
  debug: baseScreen.debug,
  ...getQueriesForElement(body!, baseQueries),
};
if (!body) {
  screen = new Proxy(screen, {
    get(target, key): unknown {
      if (Object.prototype.hasOwnProperty.call(baseScreen, key)) {
        return baseScreen[key as keyof typeof baseScreen];
      }
      return baseScreen.findAllByText;
    },
  });
}
const constScreen = screen;
export default constScreen;
