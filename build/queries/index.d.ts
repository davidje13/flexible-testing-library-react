import { MatcherOptions, SelectorMatcherOptions, ByRoleOptions } from '@testing-library/react';
import type Query from './Query';
export declare const altText: (value: string, options?: MatcherOptions) => Query;
export declare const displayValue: (value: string, options?: MatcherOptions) => Query;
export declare const labelText: (value: string, options?: SelectorMatcherOptions) => Query;
export declare const attribute: (name: string, value: string, options?: MatcherOptions) => Query;
export declare const placeholderText: (value: string, options?: MatcherOptions) => Query;
export declare const role: (roleName: string, options?: ByRoleOptions) => Query;
export declare const testId: (id: string, options?: MatcherOptions) => Query;
export declare const text: (value: string, options?: SelectorMatcherOptions) => Query;
export declare const textFragment: (value: string, options?: Omit<SelectorMatcherOptions, 'exact'>) => Query;
export declare const title: (value: string, options?: MatcherOptions) => Query;
//# sourceMappingURL=index.d.ts.map