import { allRoles, usersRoles, dictionariesRoles } from '@we-met-app/globals/globals';

export class NavigationItem {
  path: string;
  name: string;
  icon: string;
  id: string;
  children: NavigationItem[];
  roles: string[];
  disabled?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    path: "/mypage",
    name: "PROFIL UŻYTKOWNIKA",
    icon: "assets/images/nav-icons-wh/mypage_wh.png",
    id: "MYPAGE",
    children: [],
    roles: [],
    disabled: true
  },
  {
    path: "/administration",
    name: "PANEL ADMINA",
    icon: "assets/images/nav-icons-wh/administration_wh.png",
    id: "PANEL ADMINA",
    children: [
      {
        path: "/administration/users",
        name: "UŻYTKOWNICY",
        icon: "",
        id: "UŻYTKOWNICY",
        children: [],
        roles: usersRoles,
        disabled: true
      },
      {
        path: "administration/dictionaries",
        name: "SŁOWNIKI",
        icon: "",
        id: "SŁOWNIKI",
        children: [],
        roles: dictionariesRoles,
        disabled: true
      }
    ],
    roles: allRoles,
    disabled: true
  },
  {
    path: "/purchase-manage",
    name: "ZAKUP",
    icon: "assets/images/nav-icons-wh/dashboard_wh.png",
    id: "PURCHASE",
    children: [],
    roles: allRoles,
    disabled: true
  },
  {
    path: "/sale",
    name: "SPRZEDAŻ",
    icon: "assets/images/nav-icons-wh/dashboard_wh.png",
    id: "SPRZEDAŻ",
    children: [],
    roles: allRoles,
    disabled: true
  },
  {
    path: "/sort",
    name: "WYSORT",
    icon: "assets/images/nav-icons-wh/dashboard_wh.png",
    id: "WYSORT",
    children: [],
    roles: allRoles,
    disabled: true
  },
  {
    path: "/reports",
    name: "RAPORTY",
    icon: "assets/images/nav-icons-wh/ops_wh.png",
    id: "RAPORTY",
    children: [
      {
        path: "/reports/daily",
        name: "DZIENNY",
        icon: "",
        id: "DZIENNY",
        children: [],
        roles: allRoles,
        disabled: true
      },
      {
        path: "/reports/monthly",
        name: "MIESIĘCZNY",
        icon: "",
        id: "MIESIĘCZNY",
        children: [],
        roles: allRoles,
        disabled: true
      }
    ],
    roles: allRoles,
    disabled: true
  },

];
