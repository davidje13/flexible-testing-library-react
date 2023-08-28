declare type HTMLElementList = NodeListOf<HTMLElement> | HTMLElement[];
export default interface Query {
    description: string;
    multipleErrorDetail?: string;
    missingErrorDetail?: string;
    queryAll: (container: HTMLElement) => HTMLElementList;
    getAll?: (container: HTMLElement) => HTMLElementList;
}
export {};
