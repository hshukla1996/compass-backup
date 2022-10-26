import { MenuData } from "@compass-ui/data";
import { MenuItemState } from "../shared/menu-item-state";
import { RoutePath } from "../shared/route-strategies";

export const menuData: MenuData = {
    header: 'Apply for Services',
    formNumber: 'e-form #W433123898901',
    currentStep: '0 of 8',
    menuItems: [
      {
        id: 1,
        link: RoutePath.APPLYNOW_GETTINGSTARTED,
        text: 'Getting Started',
        status: MenuItemState.NOTSTARTED,
        class: 'start',
      },
      {
        id: 2,
        link: RoutePath.APPLYNOW_HOUSEHOLD,
        text: 'Household',
        status: MenuItemState.NOTSTARTED,
        class: 'household',
      },
      {
        id: 3,
        link: RoutePath.APPLYNOW_INDIVIDUALDETAILS,
        text: 'Individual Details',
        status: MenuItemState.NOTSTARTED,
        class: 'individual-details',
      },
   
      {
        id: 4,
        link: RoutePath.APPLYNOW_INCOME,
        text: 'Income',
        status: MenuItemState.NOTSTARTED,
        class: 'income',
      },
      {
        id: 5,
        link: RoutePath.APPLYNOW_EXPENSES,
        text: 'Expenses',
        status: MenuItemState.NOTSTARTED,
        class: 'expenses',
      },
      {
        id: 6,
        link: RoutePath.APPLYNOW_INSURANCE,
        text: 'Insurance',
        status: MenuItemState.NOTSTARTED,
        class: 'insurance',
      },
      {
        id: 7,
        link: RoutePath.APPLYNOW_RESOURCES,
        text: 'Resources',
        status: MenuItemState.NOTSTARTED,
        class: 'resources',
      },
      {
        id: 8,
        link: RoutePath.APPLYNOW_REVIEWANDSUBMIT,
        text: 'Review and Submit',
        status: MenuItemState.NOTSTARTED,
        class: 'summary',
      },
    ],
  };
