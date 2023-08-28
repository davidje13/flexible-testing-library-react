import React from 'react';
import { screen, render, attribute } from '../../src';

const Component = () => (
  <section>
    <img data-testid="a" data-x="foob" />
    <img data-testid="b" data-x="bar" />
    <img data-testid="c" data-x="bar" />
    <img data-testid="d" data-nope="bar" />
    <img data-testid="e" data-x />
    <img data-testid="f" data-x="" />
    <img data-testid="g" />
  </section>
);

describe('attribute', () => {
  it('returns elements with (attribute) = value', () => {
    render(<Component />);
    const items = screen.queryAllBy(attribute('data-x', 'bar'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(attribute('data-x', 'Nope'))).toThrow(
      'Unable to find any element by [data-x=Nope].',
    );
  });
});
