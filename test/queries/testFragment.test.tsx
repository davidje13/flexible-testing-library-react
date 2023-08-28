import React from 'react';
import { screen, render, textFragment } from '../../src';

const Component = () => (
  <section>
    <div data-testid="a">foob</div>
    <div data-testid="b">bar</div>
    <div data-testid="c">bar</div>
    <div data-testid="d" />
  </section>
);

describe('textFragment', () => {
  it('returns elements with inner text containing value', () => {
    render(<Component />);
    const items = screen.queryAllBy(textFragment('b'));
    expect(items).toHaveLength(3);
    expect(items[0]!.getAttribute('data-testid')).toEqual('a');
    expect(items[1]!.getAttribute('data-testid')).toEqual('b');
    expect(items[2]!.getAttribute('data-testid')).toEqual('c');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(textFragment('Nope'))).toThrow(
      [
        'Unable to find any element with the text Nope. ',
        'This could be because the text is broken up by multiple elements.',
      ].join(''),
    );
  });
});
