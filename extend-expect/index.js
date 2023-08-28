'use strict';

require('@testing-library/react');

function elementListToArray(elements) {
    if (!elements) {
        return [];
    }
    if (Array.isArray(elements)) {
        return elements;
    }
    return Array.from(elements);
}
const queryAllBy = (container, query) => elementListToArray(query.queryAll(container));

function toContainElementWith(base, query) {
    if (!base) {
        throw new Error('Cannot use toContainElementWith on non-element');
    }
    const element = base.container || base;
    const expected = `${this.isNot ? 'no elements' : 'an element'} ${query.description}`;
    return {
        pass: queryAllBy(element, query).length > 0,
        message: () => [
            this.utils.matcherHint(`${this.isNot ? '.not' : ''}.toContainElementWith`, 'element', 'query'),
            '',
            'Expected',
            `  ${this.utils.printExpected(expected)}`,
            'Received',
            `  ${this.utils.printReceived(element)}`,
        ].join('\n'),
    };
}

var extensions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    toContainElementWith: toContainElementWith
});

expect.extend(extensions);

exports.extensions = extensions;
