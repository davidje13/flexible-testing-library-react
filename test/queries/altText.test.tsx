import React from 'react';
import { screen, render, altText } from '../../src';

const Component = () => (
  <section>
    <img data-testid="a" alt="foob" />
    <img data-testid="b" alt="bar" />
    <img data-testid="c" alt="bar" />
    <img data-testid="d" />
  </section>
);

describe('altText', () => {
  it('returns elements with alt=value', () => {
    render(<Component />);
    const items = screen.queryAllBy(altText('bar'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(altText('Nope'))).toThrow(
      'Unable to find any element with the alt text Nope.',
    );
  });
});
