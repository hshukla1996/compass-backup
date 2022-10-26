export interface IRoutable {
    // Full url, like applynow/income/1/2/3/4
    get currentRoute(): string;
    nextRoute(): string;
    previousRoute(): string;
    hideBackButton?: boolean;
    hideNextButton?: boolean;
    backButtonText?: string;
    nextButtonText?: string;
}
export interface IConditionalRoutable extends IRoutable {
    setDataContext(data: any): void;
}
export interface IPrintable {
    print(): void;
}

export type StrategyTypes = IRoutable | IConditionalRoutable;