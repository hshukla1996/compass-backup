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
      link: RoutePath.DOIQUALIFY_GETTINGSTARTED,
      text: 'Getting Started',
      status: MenuItemState.NOTSTARTED,
      class: 'start',
    },
    {
      id: 2,
      link: RoutePath.DOIQUALIFY_BASICDETAILS,
      text: 'Basic Details',
      status: MenuItemState.NOTSTARTED,
      class: 'basic',
    },
    {
      id: 3,
      link: RoutePath.DOIQUALIFY_PROGRAMSELECTION,
      text: 'Program Selection',
      status: 'Not Started',
      class: 'program',
    },
    {
      id: 4,
      link: RoutePath.DOIQUALIFY_HOUSEHOLDVALUE,
      text: 'Household Value',
      status: 'Not Started',
      class: 'resources',
    },
    {
      id: 5,
      link: RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS,
      text: 'Other Household Situations',
      status: 'Not Started',
      class: 'situations',
    },
    {
      id: 6,
      link: RoutePath.DOIQUALIFY_RESULTS,
      text: 'Summary',
      status: 'Not Started',
      class: 'summary',
    },
  ],
};

