import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('queryAllBy', () => {
  it('returns all matching elements', () => {
    render(<TestComponent />);
    const items = screen.queryAllBy(text('More text'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('c');
    expect(items[1]!.getAttribute('data-testid')).toEqual('d');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const items = dom.queryAllBy(text('More text'));
    expect(items).toHaveLength(2);
  });

  it('returns an empty list if no elements are found', () => {
    render(<TestComponent />);
    const items = screen.queryAllBy(text('Nope'));
    expect(items).toHaveLength(0);
  });
});
