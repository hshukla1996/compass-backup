import { IApplyNowState } from "../../apply-now/+state/apply-now.models";
import { DoIQualifyState } from "../../do-i-qualify/+state/do-i-qualify.models";

export interface PageQueueState {
    diqState: DoIQualifyState,
    applyNowState: IApplyNowState,

}
export interface IConfigPageQueue {
    defaultPath: string[],
    pageQueueName: string,
    getPathNameFunction: Function,
    currentModule: string,
    actionName?: any,
    gateWaypathName?: string,
    reducerObjectType: any,
    lastPath?: string,
    selectedPath?: string[]
}