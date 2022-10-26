import { MenuData } from "@compass-ui/data";
import { MenuItemState } from "../shared/menu-item-state";
import { RoutePath } from "../shared/route-strategies";

export const menuData: MenuData = {
    header: 'See If You Qualify',
    formNumber: '',
    currentStep: '4 of 8',
    menuItems: [
        {
            id: 1,
            link: RoutePath.REFERRALS_GETTINGSTARTED,
            text: 'Getting Started',
            status: MenuItemState.NOTSTARTED,
            class: 'start'
        },
        {
            id: 2,
            link: RoutePath.REFERRALS_BASICDETAILS,
            text: 'Basic Details',
            status: MenuItemState.NOTSTARTED,
            class: 'basic'
        },
        {
            id: 3,
            link: RoutePath.REFERRALS_PROGRAMSELECTION,
            text: 'Program Selection',
            status: MenuItemState.NOTSTARTED,
            class: 'program'
        },
        {
            id: 4,
            link: RoutePath.REFERRALS_HOUSEHOLDDETAILS,
            text: 'Household Details',
            status: MenuItemState.NOTSTARTED,
            class: 'resources'
        },
        {
            id: 5,
            link: RoutePath.REFERRALS_MOREINFORMATION,
            text: 'More Information',
            status: MenuItemState.NOTSTARTED,
            class: 'situations'
        },
        {
            id: 6,
            link: RoutePath.REFERRALS_SUMMARY,
            text: 'Summary',
            status: MenuItemState.NOTSTARTED,
            class: 'summary'
        },

    ]
};
