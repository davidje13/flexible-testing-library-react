import React from 'react';
import { render, altText, testId } from '../../src';
import '../../src/extend-expect';

const Component = () => (
  <section>
    <img data-testid="a" alt="foob" />
    <div data-testid="b" />
  </section>
);

describe('toContainElementWith', () => {
  it('succeeds if the element exists', () => {
    const dom = render(<Component />);
    expect(dom).toContainElementWith(altText('foob'));
  });

  it('fails if the element does not exist', () => {
    const dom = render(<Component />);
    expect(() => expect(dom).toContainElementWith(altText('nope'))).toThrow(
      /Expected.*an element with the alt text nope.*Received.*<div><section><img alt="foob"/s,
    );
  });

  it('fails if the element does not exist within the current element', () => {
    const dom = render(<Component />);
    const b = dom.getBy(testId('b'));
    expect(() => expect(b).toContainElementWith(altText('foob'))).toThrow(
      /Expected.*an element with the alt text foob.*Received.*[^>]<div data-testid="b" \/>/s,
    );
  });
});

describe('not.toContainElementWith', () => {
  it('succeeds if the element does not exist', () => {
    const dom = render(<Component />);
    expect(dom).not.toContainElementWith(altText('nope'));
  });

  it('succeeds if the element does not exist within the current element', () => {
    const dom = render(<Component />);
    const b = dom.getBy(testId('b'));
    expect(b).not.toContainElementWith(altText('foob'));
  });

  it('fails if the element exists', () => {
    const dom = render(<Component />);
    expect(() => expect(dom).not.toContainElementWith(altText('foob'))).toThrow(
      /Expected.*no elements with the alt text foob.*Received.*<div><section><img alt="foob"/s,
    );
  });
});
