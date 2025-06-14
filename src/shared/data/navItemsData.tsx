import {
  BoxCubeIcon,
  GroupIcon,
  ListIcon,
} from "../icons";

export type NavSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  roles?: string[]; // <- aquí
};

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[]; // <- aquí
  subItems?: NavSubItem[];
};

export const navItems: NavItem[] = [
  /*{
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Ventas", path: "/dash-ventas", pro: false },
      { name: "Empleados", path: "/dash-empleados", pro: false },
      { name: "Almacén", path: "/dash-recepciones", pro: false }
    ],
  },*/
  {
    icon: <BoxCubeIcon />,
    name: "Inventario",
    roles: ["Almacen", "Administrador"],
    subItems: [
      { name: "Almacén", path: "/almacen", pro: false, roles: ["Almacen", "Administrador"] },
      { name: "Producción", path: "/lotes", pro: false, roles: ["Almacen", "Administrador"] },
      { name: "Despachos", path: "/despachos", pro: false, roles: ["Almacen", "Administrador"] },
      { name: "Recepciones", path: "/recepciones", pro: false, roles: ["Almacen", "Administrador"] },
    ],
  },
  {
    name: "Comercial",
    icon: <ListIcon />,
    subItems: [
      { name: "Ventas", path: "/ventas", pro: false, roles: ["Vendedor", "Administrador"] },
      { name: "Clientes", path: "/clientes", pro: false, roles: ["Vendedor", "Administrador"] },
    ],
    roles: ["Vendedor", "Administrador"],
  },/*
  {
    icon: <CalenderIcon />,
    name: "Calendario",
    path: "/calendar",
  },*/
  {
    icon: <GroupIcon />,
    name: "Empleados",
    path: "/usuarios",
    roles: ["Administrador"],
  },

];

/*
export const othersItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
      { name: "Icons", path: "/icons", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];
*/
