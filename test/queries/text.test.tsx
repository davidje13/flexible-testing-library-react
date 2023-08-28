import React from 'react';
import { screen, render, text } from '../../src';

const Component = () => (
  <section>
    <div data-testid="a">foob</div>
    <div data-testid="b">bar</div>
    <div data-testid="c">bar</div>
    <div data-testid="d" />
  </section>
);

describe('text', () => {
  it('returns elements with inner text = value', () => {
    render(<Component />);
    const items = screen.queryAllBy(text('bar'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('b');
    expect(items[1]!.getAttribute('data-testid')).toEqual('c');
  });

  it('uses exact matching by default', () => {
    render(<Component />);
    const items = screen.queryAllBy(text('b'));
    expect(items).toHaveLength(0);
  });

  it('allows partial matching', () => {
    render(<Component />);
    const items = screen.queryAllBy(text('b', { exact: false }));
    expect(items).toHaveLength(3);
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(text('Nope'))).toThrow(
      [
        'Unable to find any element with the text Nope. ',
        'This could be because the text is broken up by multiple elements.',
      ].join(''),
    );
  });
});
