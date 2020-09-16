import React from 'react';
import { screen, render, labelText } from '../../src';

const Component = () => (
  <section>
    <label>Foo <input data-testid="a" /></label>
    <label htmlFor="b">Bar</label> <input id="b" data-testid="b" />
    <label>Baz</label>
  </section>
);

describe('labelText', () => {
  it('returns elements with corresponding label with given text', () => {
    render(<Component />);
    const items = screen.queryAllBy(labelText('Bar'));
    expect(items).toHaveLength(1);
    expect(items[0].getAttribute('data-testid')).toEqual('b');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(labelText('Nope')))
      .toThrow('Unable to find a label with the text of: Nope');
  });

  it('shows a helpful error if a label without an input is found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(labelText('Baz')))
      .toThrow('Found a label with the text of: Baz, however no form control was found associated to that label.');
  });
});
