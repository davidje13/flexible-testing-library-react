import React from 'react';
import { screen, render, role } from '../../src';

const Component = () => (
  <section>
    <div data-testid="a" role="heading" />
    <button data-testid="b" />
    <div data-testid="c" role="button" />
    <div data-testid="d" />
  </section>
);

describe('role', () => {
  it('returns elements with role = value', () => {
    render(<Component />);
    const items = screen.queryAllBy(role('button'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(role('Nope'))).toThrow(
      'Unable to find any element with the role Nope.',
    );
  });
});
