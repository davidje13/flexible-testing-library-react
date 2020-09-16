import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('getAllBy', () => {
  it('returns all matching elements', () => {
    render(<TestComponent />);
    const items = screen.getAllBy(text('More text'));
    expect(items[0].getAttribute('data-testid')).toEqual('c');
    expect(items[1].getAttribute('data-testid')).toEqual('d');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const items = dom.getAllBy(text('More text'));
    expect(items).toHaveLength(2);
  });

  it('throws if no elements are found', () => {
    render(<TestComponent />);
    expect(() => screen.getAllBy(text('Nope'))).toThrow('Unable to find any element with');
  });
});
