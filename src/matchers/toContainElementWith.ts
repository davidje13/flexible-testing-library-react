import type { RenderResult } from '@testing-library/react';
import { queryAllBy } from '../baseQueries';
import type Query from '../queries/Query';

export function toContainElementWith(
  this: jest.MatcherContext,
  base: RenderResult,
  query: Query,
): jest.CustomMatcherResult {
  if (!base) {
    throw new Error('Cannot use toContainElementWith on non-element');
  }
  const element = base.container || base;
  const expected =
    `${this.isNot ? 'no elements' : 'an element'} ${query.description}`;

  return {
    pass: queryAllBy(element, query).length > 0,
    message: (): string => [
      this.utils.matcherHint(`${this.isNot ? '.not' : ''}.toContainElementWith`, 'element', 'query'),
      '',
      'Expected',
      `  ${this.utils.printExpected(expected)}`,
      'Received',
      `  ${this.utils.printReceived(element)}`,
    ].join('\n'),
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainElementWith: (query: Query) => R;
    }
  }
}
