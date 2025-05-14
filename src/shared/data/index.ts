export type rol = {
  value: string | boolean | number;
  label: string;
}
export type ruta = {
  path: string;
  name: string;
}

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const roles: rol[] = [
  { value: "Almacen", label: "Almacen" },
  { value: "Vendedor", label: "Vendedor" },
  { value: "Administrador", label: "Administrador" },
];

export const estados: rol[] = [
  { value: true, label: "Activo" },
  { value: false, label: "Inactivo" },
];

export const estadosVenta: rol[] = [
  { value: true, label: "Confirmada" },
  { value: false, label: "Pendiente" },
];

export const rutas: ruta[] = [
  { path: "/", name: "Inicio" },
  { path: "/almacen", name: "Almacén" },
  { path: "/lotes", name: "Lotes" },
  { path: "/despachos", name: "Despachos" },
  { path: "/recepciones", name: "Recepciones" },
  { path: "/profile", name: "Perfil de Usuario" },
  { path: "/usuarios", name: "Usuarios" },
  { path: "/clientes", name: "Clientes" },
  { path: "/ventas", name: "Ventas" },
  /*
  
  { path: "/calendar", name: "Calendario" },
  { path: "/icons", name: "Íconos" },
  { path: "/form-elements", name: "Elementos de Formulario" },
  { path: "/basic-tables", name: "Tablas Básicas" },
  { path: "/alerts", name: "Alertas" },
  { path: "/avatars", name: "Avatares" },
  { path: "/badge", name: "Insignias" },
  { path: "/buttons", name: "Botones" },
  { path: "/images", name: "Imágenes" },
  { path: "/videos", name: "Videos" },
  { path: "/line-chart", name: "Gráfico de Líneas" },
  { path: "/bar-chart", name: "Gráfico de Barras" },*/
];

/*
const othersItems: NavItem[] = [
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