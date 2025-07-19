interface NavItem {
    label: string;
    url: string;
    title: string;
    icon: string;
}

export const navItems: NavItem[] = [
    { label: "Inversiones", url: "/inversiones", title: "Observe nuestras inversiones", icon: "" },
    { label: "Proveedores", url: "/proveedores", title: "Conozca nuestros proveedores", icon: "" },
    { label: "Empleados", url: "/empleados", title: "Nuestro equipo", icon: "" },
    { label: "Directores", url: "/directores", title: "Directores", icon: "" },
    { label: "Clientes", url: "/clientes", title: "Nuestros clientes", icon: "" },
    { label: "Pedidos", url: "/pedidos", title: "Pedidos", icon: "" },
    { label: "Tienda", url: "/tienda", title: "Los mejores productos", icon: "" }
]

export const navItemsRight: NavItem[] = [
    { label: " Carrito", url: "/carrito", title: "Carrito de compras", icon: "bi-basket" },
    { label: " Iniciar sesion", url: "/login", title: "Inicio de sesión", icon: "bi-person" }
]