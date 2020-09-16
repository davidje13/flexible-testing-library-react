declare const constScreen: {
    queryAllBy: (text: import(".").Query, options?: unknown, waitForElementOptions?: unknown) => HTMLElement[];
    queryBy: (text: import(".").Query, options?: unknown, waitForElementOptions?: unknown) => HTMLElement;
    getAllBy: (text: import(".").Query, options?: unknown, waitForElementOptions?: unknown) => HTMLElement[];
    getBy: (text: import(".").Query, options?: unknown, waitForElementOptions?: unknown) => HTMLElement;
    findAllBy: (text: import(".").Query, options?: import("@testing-library/react").waitForOptions, waitForElementOptions?: unknown) => Promise<HTMLElement[]>;
    findBy: (text: import(".").Query, options?: import("@testing-library/react").waitForOptions, waitForElementOptions?: unknown) => Promise<HTMLElement>;
    debug: (element?: Element | HTMLDocument | (Element | HTMLDocument)[], maxLength?: number, options?: import("pretty-format/build/types").OptionsReceived) => void;
};
export default constScreen;
//# sourceMappingURL=screen.d.ts.map