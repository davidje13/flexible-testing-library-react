import {
  queryAllByAltText,
  queryAllByDisplayValue,
  queryAllByLabelText,
  getAllByLabelText,
  queryAllByAttribute,
  queryAllByPlaceholderText,
  queryAllByRole,
  queryAllByTestId,
  queryAllByText,
  queryAllByTitle,
  MatcherOptions,
  SelectorMatcherOptions,
  ByRoleOptions,
} from '@testing-library/react';
import type Query from './Query';

export const altText = (value: string, options?: MatcherOptions): Query => ({
  description: `with the alt text ${value}`,
  queryAll: (container): HTMLElement[] => queryAllByAltText(container, value, options),
});

export const displayValue = (value: string, options?: MatcherOptions): Query => ({
  description: `with the value ${value}`,
  queryAll: (container): HTMLElement[] => queryAllByDisplayValue(container, value, options),
});

export const labelText = (value: string, options?: SelectorMatcherOptions): Query => ({
  description: `with the label text ${value}`,
  queryAll: (container): HTMLElement[] => queryAllByLabelText(container, value, options),
  getAll: (container): HTMLElement[] => getAllByLabelText(container, value, options),
});

// undocumented since *ByAttribute is undocumented in DOM Testing Library
export const attribute = (name: string, value: string, options?: MatcherOptions): Query => ({
  description: `by [${name}=${value}]`,
  queryAll: (container): HTMLElement[] => queryAllByAttribute(name, container, value, options),
});

export const placeholderText = (value: string, options?: MatcherOptions): Query => ({
  description: `with the placeholder text ${value}`,
  queryAll: (container): HTMLElement[] => queryAllByPlaceholderText(container, value, options),
});

export const role = (roleName: string, options?: ByRoleOptions): Query => ({
  description: `with the role ${roleName}`,
  queryAll: (container): HTMLElement[] => queryAllByRole(container, roleName, options),
});

export const testId = (id: string, options?: MatcherOptions): Query => ({
  description: `with the test ID ${id}`,
  queryAll: (container): HTMLElement[] => queryAllByTestId(container, id, options),
});

export const text = (value: string, options?: SelectorMatcherOptions): Query => ({
  description: `with the text ${value}`,
  missingErrorDetail: [
    'This could be because the text is broken up by multiple elements. ',
    'In this case, you can provide a function for your text matcher ',
    'to make your matcher more flexible.',
  ].join(''),
  queryAll: (container): HTMLElement[] => queryAllByText(container, value, options),
});

export const textFragment = (
  value: string,
  options?: Omit<SelectorMatcherOptions, 'exact'>,
): Query => text(value, { ...options, exact: false });

export const title = (value: string, options?: MatcherOptions): Query => ({
  description: `with the title ${value}`,
  queryAll: (container): HTMLElement[] => queryAllByTitle(container, value, options),
});
