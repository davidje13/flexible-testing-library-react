import { waitForOptions } from '@testing-library/react';
import type Query from './queries/Query';
export declare const queryAllBy: (container: HTMLElement, query: Query) => HTMLElement[];
export declare const queryBy: (container: HTMLElement, query: Query) => HTMLElement | null;
export declare const getAllBy: (container: HTMLElement, query: Query) => HTMLElement[];
export declare const getBy: (container: HTMLElement, query: Query) => HTMLElement;
export declare const findAllBy: (container: HTMLElement, query: Query, waitOptions: waitForOptions) => Promise<HTMLElement[]>;
export declare const findBy: (container: HTMLElement, query: Query, waitOptions: waitForOptions) => Promise<HTMLElement>;
//# sourceMappingURL=baseQueries.d.ts.map