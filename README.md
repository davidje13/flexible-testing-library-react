# Flexible Testing Library React

A thin wrapper around [React Testing Library](https://github.com/testing-library/react-testing-library)
which makes using custom queries easier.

See [this PR](https://github.com/testing-library/dom-testing-library/issues/266) for the
discussion behind this and for reasoning why this isn't in core `@testing-library/dom`.

## Install dependency

```bash
npm install --save-dev flexible-testing-library-react
```

## Usage

This mostly follows the API of React Testing Library but with one important difference:

```jsx
// old
import { screen, render } from '@testing-library/react';
render(<MyComponent />);
screen.getByLabelText('foo').something();

// new
import { screen, render, labelText } from 'flexible-testing-library-react';
render(<MyComponent />);
screen.getBy(labelText('foo')).something();
```

Or the alternative (scoped) syntax:

```jsx
// old
import { render } from '@testing-library/react';
const { getByLabelText } = render(<MyComponent />);
getByLabelText('foo').something();

// new
import { render, labelText } from 'flexible-testing-library-react';
const { getBy } = render(<MyComponent />);
getBy(labelText('foo')).something();
```

Also parameters for `findBy` now live in a more logical place:

```jsx
// old
import { screen, render } from '@testing-library/react';
render(<MyComponent />);
screen.findByTitle('foo', {}, { timeout: 1000 }).something();

// new
import { screen, render, title } from 'flexible-testing-library-react';
render(<MyComponent />);
screen.findBy(title('foo'), { timeout: 1000 }).something();
// no need to pass the empty {} argument to title() any more!
```

If you are using Jest, a new matcher is also available:

```jsx
import { screen, render, labelText } from 'flexible-testing-library-react';
import 'flexible-testing-library-react/extend-expect';

render(<MyComponent />);
expect(screen).toContainElementWith(labelText('foo'));
expect(screen).not.toContainElementWith(labelText('nope'));
```

(this matcher improves on `toBeInTheDocument`, which has
[problems with negation](https://github.com/testing-library/jest-dom/issues/106))

## Reference

### `getBy`

```javascript
getBy(title('hello'))
```

Returns en element, or throws an exception if no elements were found (or multiple elements
matched).

### `getAllBy`

```javascript
getAllBy(title('hello'))
```

Returns a list of elements, or throws an exception if no elements were found.

### `queryBy`

```javascript
queryBy(title('hello'))
```

Returns an element, or `null` if no elements were found, or throws an exception if multiple
elements matched.

### `queryAllBy`

```javascript
queryAllBy(title('hello'))
```

Returns a list of elements (which could be empty).

### `findBy`

```javascript
await findBy(title('hello'))
await findBy(title('hello'), { timeout: 1000 })
```

Waits until at least one matching element exists and returns it, or throws if the
timeout is reached before a matching element is found. Throws if multiple elements
match.

The second parameter is an optional options dictionary, which is passed directly to
DOM Testing Library's [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async#waitfor).

### `findAllBy`

```javascript
await findAllBy(title('hello'))
await findAllBy(title('hello'), { timeout: 1000 })
```

Waits until at least one matching element exists and returns a list of all matches,
or throws if the timeout is reached before a matching element is found.

The second parameter is an optional options dictionary, which is passed directly to
DOM Testing Library's [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async#waitfor).

### Queries

For a list of supported queries, see the
[DOM Testing Library documentation](https://testing-library.com/docs/dom-testing-library/api-queries#queries);
each query is available here.

Examples (note that the options can be omitted but are shown here to demonstrate their usage):

| Function | Example | Upstream Docs |
|----------|---------|---------------|
| `labelText` | `getAllBy(labelText('hello', { exact: false }))` | [ByLabelText](https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext) |
| `placeholderText` | `getAllBy(placeholderText('hello', { exact: false }))` | [ByPlaceholderText](https://testing-library.com/docs/dom-testing-library/api-queries#byplaceholdertext) |
| `text` | `getAllBy(text('hello', { exact: false }))` | [ByText](https://testing-library.com/docs/dom-testing-library/api-queries#bytext) |
| `altText` | `getAllBy(altText('hello', { exact: false }))` | [ByAltText](https://testing-library.com/docs/dom-testing-library/api-queries#byalttext) |
| `title` | `getAllBy(title('hello', { exact: false }))` | [ByTitle](https://testing-library.com/docs/dom-testing-library/api-queries#bytitle) |
| `displayValue` | `getAllBy(displayValue('hello', { exact: false }))` | [ByDisplayValue](https://testing-library.com/docs/dom-testing-library/api-queries#bydisplayvalue) |
| `role` | `getAllBy(role('tab', { selected: true }))` | [ByRole](https://testing-library.com/docs/dom-testing-library/api-queries#byrole) |
| `testId` | `getAllBy(testId('hello', { exact: false }))` | [ByTestId](https://testing-library.com/docs/dom-testing-library/api-queries#bytestid) |

As a convenience another query is available as a shorthand:

| Function | Description | Example |
|----------|-------------|---------|
| `textFragment` | Same as `text` with `exact: false` in the options. | `getAllBy(textFragment('hello'))` |

For other features, see the main [React Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro).

## Writing custom queries

```javascript
const positionInTable = (column, row) => ({ // parameters can be anything you like
  description: `in column ${column}, row ${row}`,
  queryAll: (container) => {
    // your query implementation here:
    const rowElement = container.querySelectorAll('tr')[row];
    if (!rowElement) {
      return [];
    }
    const cellElement = rowElement.querySelectorAll('td')[column];
    if (!cellElement) {
      return [];
    }
    return [cellElement]; // always return a list, even if there is only one element
  },
});
```

This can now be used easily with any of
`getBy`, `getAllBy`, `findBy`, `findAllBy`, `queryBy`, `queryAllBy`:

```jsx
import { screen, render } from 'flexible-testing-library-react';
import { positionInTable } from './positionInTable';

render(<MyComponent />);
screen.getBy(positionInTable(2, 3)).something();
```

And can be used with `toContainElementWith`:

```jsx
import { screen, render } from 'flexible-testing-library-react';
import 'flexible-testing-library-react/extend-expect';
import { positionInTable } from './positionInTable';

render(<MyComponent />);
expect(screen).toContainElementWith(positionInTable(2, 3));
```

### Optional query configuration

As well as a `description` and `queryAll`, you can provide some other (optional)
configuration:

- `multipleErrorDetail`: a string to include in error messages about finding too many
  matching elements.
- `missingErrorDetail`: a string to include in error messages about not finding any
  element.
- `getAll`: a version of `queryAll` which throws if no elements are found (can be used
  to provide more detailed error information). Note that you _must_ specify `queryAll`,
  even if you also provide `getAll`.

### TypeScript

The types for custom queries are:

```typescript
import type { Query } from 'flexible-testing-library-react';

const tableCell = (row: number, column: number): Query => ({
  description: `in column ${column}, row ${row}`,
  queryAll: (container): NodeListOf<HTMLElement> | HTMLElement[] => { /* implementation here */ },
});
```
