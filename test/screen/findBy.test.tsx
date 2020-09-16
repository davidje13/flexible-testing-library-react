import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('findBy', () => {
  it('returns one pre-existing matching element', async () => {
    render(<TestComponent />);
    const item = await screen.findBy(text('Some text'));
    expect(item.getAttribute('data-testid')).toEqual('a');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const item = await dom.findBy(text('Some text'));
    expect(item.getAttribute('data-testid')).toEqual('a');
  });

  it('waits for an element to match', async () => {
    render(<TestComponent />);
    setTimeout(() => {
      render(<TestComponent override="Some later text" />);
    }, 100);
    const itemPromise = screen.findBy(text('Some later text'), { timeout: 200 });
    const item = await itemPromise;
    expect(item.getAttribute('data-testid')).toEqual('a');
  });

  it('throws if the timeout is reached before the item exists', async () => {
    render(<TestComponent />);
    const itemPromise = screen.findBy(text('Some later text'), { timeout: 200 });
    await expect(itemPromise).rejects.toThrow('Unable to find any element with');
  });

  it('throws if multiple elements are found', async () => {
    render(<TestComponent />);
    await expect(screen.findBy(text('More text'))).rejects.toThrow('Found multiple elements with');
  });
});
