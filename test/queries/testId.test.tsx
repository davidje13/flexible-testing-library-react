import React from 'react';
import { screen, render, testId } from '../../src';

const Component = () => (
  <section>
    <div data-testid="foob" />
    <div data-testid="bar" />
    <div data-testid="baz" />
  </section>
);

describe('testId', () => {
  it('returns elements with data-testid = value', () => {
    render(<Component />);
    const items = screen.queryAllBy(testId('bar'));
    expect(items).toHaveLength(1);
    expect(items[0].getAttribute('data-testid')).toEqual('bar');
  });

  it('shows a helpful error if no items are found', () => {
    render(<Component />);
    expect(() => screen.getAllBy(testId('Nope')))
      .toThrow('Unable to find any element with the test ID Nope.');
  });
});
