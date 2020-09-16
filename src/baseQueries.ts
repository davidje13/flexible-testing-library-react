import {
  waitFor,
  getElementError,
  waitForOptions,
} from '@testing-library/react';
import type Query from './queries/Query';

function getMultipleElementsFoundError(container: HTMLElement, query: Query): Error {
  return getElementError(
    [
      `Found multiple elements ${query.description}.`,
      query.multipleErrorDetail,
      '\n\n(If this is intentional, then use `getAllBy`, `queryAllBy` or `findAllBy`).',
    ].filter((p) => p).join(' '),
    container,
  );
}

function getNoElementFoundError(container: HTMLElement, query: Query): Error {
  return getElementError(
    [
      `Unable to find any element ${query.description}.`,
      query.missingErrorDetail,
    ].filter((p) => p).join(' '),
    container,
  );
}

function elementListToArray(elements: NodeListOf<HTMLElement> | HTMLElement[]): HTMLElement[] {
  if (!elements) {
    return [];
  }
  if (Array.isArray(elements)) {
    return elements;
  }
  return Array.from(elements);
}

export const queryAllBy = (
  container: HTMLElement,
  query: Query,
): HTMLElement[] => elementListToArray(query.queryAll(container));

export const queryBy = (
  container: HTMLElement,
  query: Query,
): HTMLElement | null => {
  const elements = queryAllBy(container, query);
  if (elements.length > 1) {
    throw getMultipleElementsFoundError(container, query);
  }
  return elements[0] || null;
};

export const getAllBy = (
  container: HTMLElement,
  query: Query,
): HTMLElement[] => {
  const fn = query.getAll || query.queryAll;
  const elements = elementListToArray(fn(container));
  if (!elements.length) {
    throw getNoElementFoundError(container, query);
  }
  return elements;
};

export const getBy = (
  container: HTMLElement,
  query: Query,
): HTMLElement => {
  const elements = getAllBy(container, query);
  if (elements.length > 1) {
    throw getMultipleElementsFoundError(container, query);
  }
  return elements[0];
};

export const findAllBy = (
  container: HTMLElement,
  query: Query,
  waitOptions: waitForOptions,
): Promise<HTMLElement[]> => waitFor(
  () => getAllBy(container, query),
  waitOptions,
);

export const findBy = (
  container: HTMLElement,
  query: Query,
  waitOptions: waitForOptions,
): Promise<HTMLElement> => waitFor(
  () => getBy(container, query),
  waitOptions,
);
