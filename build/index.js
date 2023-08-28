'use strict';

var react = require('@testing-library/react');
var dom = require('@testing-library/dom');

function getMultipleElementsFoundError(container, query) {
    return react.getElementError([
        `Found multiple elements ${query.description}.`,
        query.multipleErrorDetail,
        '\n\n(If this is intentional, then use `getAllBy`, `queryAllBy` or `findAllBy`).',
    ]
        .filter((p) => p)
        .join(' '), container);
}
function getNoElementFoundError(container, query) {
    return react.getElementError([
        `Unable to find any element ${query.description}.`,
        query.missingErrorDetail,
    ]
        .filter((p) => p)
        .join(' '), container);
}
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
const queryBy = (container, query) => {
    const elements = queryAllBy(container, query);
    if (elements.length > 1) {
        throw getMultipleElementsFoundError(container, query);
    }
    return elements[0] || null;
};
const getAllBy = (container, query) => {
    const fn = query.getAll || query.queryAll;
    const elements = elementListToArray(fn(container));
    if (!elements.length) {
        throw getNoElementFoundError(container, query);
    }
    return elements;
};
const getBy = (container, query) => {
    const elements = getAllBy(container, query);
    if (elements.length > 1) {
        throw getMultipleElementsFoundError(container, query);
    }
    return elements[0];
};
const findAllBy = (container, query, waitOptions) => react.waitFor(() => getAllBy(container, query), waitOptions);
const findBy = (container, query, waitOptions) => react.waitFor(() => getBy(container, query), waitOptions);

var baseQueries = /*#__PURE__*/Object.freeze({
    __proto__: null,
    findAllBy: findAllBy,
    findBy: findBy,
    getAllBy: getAllBy,
    getBy: getBy,
    queryAllBy: queryAllBy,
    queryBy: queryBy
});

const body = typeof document !== 'undefined' ? document.body : undefined;
let screen = {
    debug: react.screen.debug,
    ...react.getQueriesForElement(body, baseQueries),
};
if (!body) {
    screen = new Proxy(screen, {
        get(_, key) {
            if (Object.prototype.hasOwnProperty.call(react.screen, key)) {
                return react.screen[key];
            }
            return react.screen.findAllByText;
        },
    });
}
const constScreen = screen;

const altText = (value, options) => ({
    description: `with the alt text ${value}`,
    queryAll: (container) => react.queryAllByAltText(container, value, options),
});
const displayValue = (value, options) => ({
    description: `with the value ${value}`,
    queryAll: (container) => react.queryAllByDisplayValue(container, value, options),
});
const labelText = (value, options) => ({
    description: `with the label text ${value}`,
    queryAll: (container) => react.queryAllByLabelText(container, value, options),
    getAll: (container) => react.getAllByLabelText(container, value, options),
});
// undocumented since *ByAttribute is undocumented in DOM Testing Library
const attribute = (name, value, options) => ({
    description: `by [${name}=${value}]`,
    queryAll: (container) => react.queryAllByAttribute(name, container, value, options),
});
const placeholderText = (value, options) => ({
    description: `with the placeholder text ${value}`,
    queryAll: (container) => react.queryAllByPlaceholderText(container, value, options),
});
const role = (roleName, options) => ({
    description: `with the role ${roleName}`,
    queryAll: (container) => react.queryAllByRole(container, roleName, options),
});
const testId = (id, options) => ({
    description: `with the test ID ${id}`,
    queryAll: (container) => react.queryAllByTestId(container, id, options),
});
const text = (value, options) => ({
    description: `with the text ${value}`,
    missingErrorDetail: [
        'This could be because the text is broken up by multiple elements. ',
        'In this case, you can provide a function for your text matcher ',
        'to make your matcher more flexible.',
    ].join(''),
    queryAll: (container) => react.queryAllByText(container, value, options),
});
const textFragment = (value, options) => text(value, { ...options, exact: false });
const title = (value, options) => ({
    description: `with the title ${value}`,
    queryAll: (container) => react.queryAllByTitle(container, value, options),
});

function render(ui, options) {
    return react.render(ui, { ...options, queries: baseQueries });
}

Object.defineProperty(exports, 'act', {
    enumerable: true,
    get: function () { return react.act; }
});
Object.defineProperty(exports, 'cleanup', {
    enumerable: true,
    get: function () { return react.cleanup; }
});
exports.altText = altText;
exports.attribute = attribute;
exports.displayValue = displayValue;
exports.findAllBy = findAllBy;
exports.findBy = findBy;
exports.getAllBy = getAllBy;
exports.getBy = getBy;
exports.labelText = labelText;
exports.placeholderText = placeholderText;
exports.queryAllBy = queryAllBy;
exports.queryBy = queryBy;
exports.render = render;
exports.role = role;
exports.screen = constScreen;
exports.testId = testId;
exports.text = text;
exports.textFragment = textFragment;
exports.title = title;
Object.keys(dom).forEach(function (k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () { return dom[k]; }
    });
});
