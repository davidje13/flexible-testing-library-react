import type { ReactElement } from 'react';
import {
  render as baseRender,
  RenderOptions as BaseRenderOptions,
  RenderResult as BaseRenderResult,
} from '@testing-library/react';
import type Query from './queries/Query';
import screen from './screen';
import * as baseQueries from './baseQueries';

export * from '@testing-library/dom';
export { cleanup, act } from '@testing-library/react';

export type { Query };
export type RenderResult = BaseRenderResult<typeof baseQueries>;
export type RenderOptions = Omit<BaseRenderOptions, 'queries'>;

export function render(
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult {
  return baseRender(ui, { ...options, queries: baseQueries });
}

export { screen };

export * from './baseQueries';
export * from './queries';
