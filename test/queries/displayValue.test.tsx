import React from 'react';
import { screen, render, displayValue } from '../../src';

const Component = () => (
  <section>
    <input readOnly data-testid="a" value="foob" />
    <input readOnly data-testid="b" value="bar" />
    <textarea readOnly data-testid="c" defaultValue="bar" />
    <input readOnly data-testid="d" />
  </section>
);

describe('displayValue', () => {
  it('returns elements with matching current value', () => {
    render(<Component />);
    const items = screen.queryAllBy(displayValue('bar'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(displayValue('Nope'))).toThrow(
      'Unable to find any element with the value Nope.',
    );
  });
});
