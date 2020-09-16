import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('queryBy', () => {
  it('returns one matching element', () => {
    render(<TestComponent />);
    const item = screen.queryBy(text('Some text'));
    expect(item).not.toBeNull();
    expect(item!.getAttribute('data-testid')).toEqual('a');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const item = dom.queryBy(text('Some text'));
    expect(item).not.toBeNull();
  });

  it('returns null if no elements are found', () => {
    render(<TestComponent />);
    const item = screen.queryBy(text('Nope'));
    expect(item).toBeNull();
  });

  it('throws if multiple elements are found', () => {
    render(<TestComponent />);
    expect(() => screen.queryBy(text('More text'))).toThrow('Found multiple elements with');
  });
});
