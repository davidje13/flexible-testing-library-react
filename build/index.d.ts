import type { ReactElement } from 'react';
import { RenderOptions as BaseRenderOptions, RenderResult as BaseRenderResult } from '@testing-library/react';
import type Query from './queries/Query';
import screen from './screen';
import * as baseQueries from './baseQueries';
export * from '@testing-library/dom';
export { cleanup, act } from '@testing-library/react';
export type { Query };
export declare type RenderResult = BaseRenderResult<typeof baseQueries>;
export declare type RenderOptions = Omit<BaseRenderOptions, 'queries'>;
export declare function render(ui: ReactElement, options?: RenderOptions): RenderResult;
export { screen };
export * from './baseQueries';
export * from './queries';
//# sourceMappingURL=index.d.ts.map