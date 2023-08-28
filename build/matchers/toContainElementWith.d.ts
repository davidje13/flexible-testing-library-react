/// <reference types="jest" />
import type { RenderResult } from '@testing-library/react';
import type Query from '../queries/Query';
export declare function toContainElementWith(this: jest.MatcherContext, base: RenderResult, query: Query): jest.CustomMatcherResult;
declare global {
    namespace jest {
        interface Matchers<R> {
            toContainElementWith: (query: Query) => R;
        }
    }
}
