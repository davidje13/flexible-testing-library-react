declare const constScreen: {
    queryAllBy: (query: import(".").Query) => HTMLElement[];
    queryBy: (query: import(".").Query) => HTMLElement | null;
    getAllBy: (query: import(".").Query) => HTMLElement[];
    getBy: (query: import(".").Query) => HTMLElement;
    findAllBy: (query: import(".").Query, waitOptions?: import("@testing-library/react").waitForOptions | undefined) => Promise<HTMLElement[]>;
    findBy: (query: import(".").Query, waitOptions?: import("@testing-library/react").waitForOptions | undefined) => Promise<HTMLElement>;
    debug: (element?: Element | HTMLDocument | (Element | HTMLDocument)[] | undefined, maxLength?: number | undefined, options?: import("pretty-format").PrettyFormatOptions | undefined) => void;
};
export default constScreen;
