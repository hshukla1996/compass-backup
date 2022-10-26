import { IApplyNowState } from "../../../../../../apps/intake/src/app/apply-now/+state/apply-now.models"
import { DoIQualifyState } from "../../../../../../apps/intake/src/app/do-i-qualify/+state/do-i-qualify.models"

export interface IConfigPageQueue {
    defaultPath: string[],
    pageQueueName: string,
    getPathNameFunction: Function,
    currentModule: string,
    actionName: any,
    gateWaypathName: string,
    reducerObjectType: any,
    lastPath: string,
    selectedPath: string[]
}
export interface PageQueueState {
    diqState: DoIQualifyState,
    applyNowState: IApplyNowState,

}