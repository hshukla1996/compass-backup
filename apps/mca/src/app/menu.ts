import { MenuData } from "@compass-ui/data";
import { MenuItemState } from "./shared/menu-item-state";
import { RoutePath } from "./shared/route-strategies";

export const menuData: MenuData = {
    header: 'My benefits',
    formNumber: '',
    currentStep: '4 of 8',
    menuItems: [
      {
        id: 1,
        link: RoutePath.DASHBOARD,
        text: 'Dashboard',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      },
        {
            id: 2,
            link: RoutePath.MYBENEFIT,
            text: 'My Benefits',
            status: MenuItemState.NOTSTARTED,
            class: 'start'
        },
      {
        id: 3,
        link: RoutePath.MYNOTICES,
        text: 'My Notices',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      }, {
        id: 4,
        link: RoutePath.NOTIFICATION_PREFERENCES,
        text: 'Notificaiton Preferences',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      },
      {
        id: 5,
        link: RoutePath.REPORT_CHANGES,
        text: 'Report Changes',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      },
      {
        id: 6,
        link: RoutePath.CHECK_EBT,
        text: 'Check EBT',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      },
      {
        id: 7,
        link: RoutePath.RECEIVE_1095,
        text: 'Receive 1095B',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      }, {
        id: 8,
        link: RoutePath.SUBMIT_LIHEAP,
        text: 'Submit LIHEAP Pre-Season',
        status: MenuItemState.NOTSTARTED,
        class: 'start'
      }

    ]
};
