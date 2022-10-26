
import { IChangeReportState } from "./models/change-report/change-report.model"; 
import { PostsState } from "./posts/posts.state";
import { RefDataState } from "./models/ref-data/ref-data.state";
import { MenuData } from "@compass-ui/data";
import * as menu from '../menu';
import { MyBenefits } from "./models/my-benefits/my-benefits.model"; 
import { MyNotices } from "./models/my-notices/my-notices.model";
import { IReceive1095FormState } from "./models/receive-1095-form/receive-1095-form.model";
export interface State{
  currentState:string,
  menu: MenuData | null
}
export const initialState: State = {
currentState:'MCA State',
menu:menu.menuData 
}
export interface AppState {
  posts: PostsState; 
  myBenefits: MyBenefits;
  refData: RefDataState | null;
  appState:State,
  changeReport: IChangeReportState, 
  myNotices: MyNotices;
  receive1095FormState: IReceive1095FormState;
}

 