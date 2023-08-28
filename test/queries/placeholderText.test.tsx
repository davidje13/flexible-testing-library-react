import React from 'react';
import { screen, render, placeholderText } from '../../src';

const Component = () => (
  <section>
    <input data-testid="a" placeholder="foob" />
    <input data-testid="b" placeholder="bar" />
    <input data-testid="c" placeholder="bar" />
    <input data-testid="d" />
  </section>
);

describe('placeholderText', () => {
  it('returns elements with placeholder=value', () => {
    render(<Component />);
    const items = screen.queryAllBy(placeholderText('bar'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(placeholderText('Nope'))).toThrow(
      'Unable to find any element with the placeholder text Nope.',
    );
  });
});
