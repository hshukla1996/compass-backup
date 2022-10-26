export class MenuData {
    header!: string;
    formNumber!: string;
    currentStep!: string;
    menuItems!: MenuItem[];  
}

export interface MenuItem {
    id: number;
    link: string;
    text: string;
    status: string;
    class: string;
}


