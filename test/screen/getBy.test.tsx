import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('getBy', () => {
  it('returns one matching element', () => {
    render(<TestComponent />);
    const item = screen.getBy(text('Some text'));
    expect(item.getAttribute('data-testid')).toEqual('a');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const item = dom.getBy(text('Some text'));
    expect(item.getAttribute('data-testid')).toEqual('a');
  });

  it('throws if no elements are found', () => {
    render(<TestComponent />);
    expect(() => screen.getBy(text('Nope'))).toThrow(
      'Unable to find any element with',
    );
  });

  it('throws if multiple elements are found', () => {
    render(<TestComponent />);
    expect(() => screen.getBy(text('More text'))).toThrow(
      'Found multiple elements with',
    );
  });
});
