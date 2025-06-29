import { ItemCarrito } from "../types/ItemCarrito"
import { Producto } from "../types/Producto"

export const API_URL = "https://servicios.campus.pe/"


export const agregarCarrito = (producto: Producto, cantidadProducto: number) => {
    const ItemCarrito: ItemCarrito = {
        idproducto: producto.idproducto,
        nombre: producto.nombre,
        cantidad: cantidadProducto,
        precio: producto.preciorebajado == 0 ? producto.precio : producto.preciorebajado
    }
    let carrito: ItemCarrito[] = sessionStorage.getItem("carritocompras") == null
        ? []
        : JSON.parse(sessionStorage.getItem("carritocompras") || '[]')

    const index = carrito.findIndex(p => p.idproducto === ItemCarrito.idproducto)
    if (index != -1) {
        carrito[index].cantidad += cantidadProducto
    }
    else {
        carrito.push(ItemCarrito)
    }

    sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
}