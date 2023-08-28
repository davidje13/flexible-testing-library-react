import React from 'react';
import { screen, render, text } from '../../src';
import TestComponent from './TestComponent';

describe('findAllBy', () => {
  it('returns all pre-existing matching elements', async () => {
    render(<TestComponent />);
    const items = await screen.findAllBy(text('More text'));
    expect(items).toHaveLength(2);
    expect(items[0]!.getAttribute('data-testid')).toEqual('c');
    expect(items[1]!.getAttribute('data-testid')).toEqual('d');
  });

  it('is bound to render results', async () => {
    const dom = render(<TestComponent />);
    const items = await dom.findAllBy(text('More text'));
    expect(items).toHaveLength(2);
  });

  it('waits for an element to match', async () => {
    render(<TestComponent />);
    setTimeout(() => {
      render(<TestComponent override="Some later text" />);
    }, 100);
    const itemsPromise = screen.findAllBy(text('Some later text'), {
      timeout: 200,
    });
    const items = await itemsPromise;
    expect(items).toHaveLength(1);
    expect(items[0]!.getAttribute('data-testid')).toEqual('a');
  });

  it('throws if the timeout is reached before the item exists', async () => {
    render(<TestComponent />);
    const itemsPromise = screen.findAllBy(text('Some later text'), {
      timeout: 200,
    });
    await expect(itemsPromise).rejects.toThrow(
      'Unable to find any element with',
    );
  });
});
