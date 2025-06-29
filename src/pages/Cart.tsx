import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { ItemCarrito } from "../types/ItemCarrito"
import './Cart.css'

function Cart() {

  const [listaItems, setListaItems] = useState<ItemCarrito[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras") || '[]')
    setListaItems(datosCarrito)
    calcularTotal(datosCarrito)
  }

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Codigo</th>
            <th>Producto</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaItems.length > 0 && listaItems !== null

            ? listaItems.map(item =>
              <tr key={item.idproducto}>

                <td className="text-center">{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td className="text-end">S/ {(item.precio).toFixed(2)}</td>
                <td className="text-end">

                  <div className="input-group">
                    <button className="btn btn-outline-secondary" type="button" onClick={(event) => decrement(event)}>-</button>
                    <input type="number" className="form-control text-center quantity" min="1"
                      value={item.cantidad}
                      onChange={(event) => actualizarCantidad(Number(event.target.value), item.idproducto)} />
                    <button className="btn btn-outline-secondary" type="button" onClick={(event) => increment(event)}>+</button>
                  </div>

                </td>
                <td className="text-end">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                <td><i className="bi bi-x-lg icon-delete" title="Eliminar item"
                  onClick={() => eliminarItem(item)}></i></td>
              </tr>
            )
            : <tr><td colSpan={6}>
              <div className="alert alert-warning" role="alert">
                No hay productos en el carrito
              </div>
            </td></tr>

          }
        </tbody>
      </table>
    )

  }

  const decrement = (event: any) => {
    const inputCantidad = event.currentTarget.parentElement.querySelector("input")
    if(inputCantidad) {
      inputCantidad.stepDown()
      inputCantidad.dispatchEvent(new Event("change", {bubbles: true}))
    }
  }

  const increment = (event: any) => {
    const inputCantidad = event.currentTarget.parentElement.querySelector("input")
    if(inputCantidad) {
      inputCantidad.stepUp()
      inputCantidad.dispatchEvent(new Event("change", {bubbles: true}))
    }
  }

  const actualizarCantidad = (cantidad: number, idproducto: number) => {
    const carritoActualizado = listaItems.map(item => {
      if (item.idproducto === idproducto) {
        item.cantidad = cantidad
      }
      return item
    })
    setListaItems(carritoActualizado)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoActualizado))
    calcularTotal(carritoActualizado)
  }

  const eliminarItem = (item: ItemCarrito) => {
    const carritoMenos = listaItems.filter(i => i.idproducto != item.idproducto)
    setListaItems(carritoMenos)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos))
    calcularTotal(carritoMenos)
  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setListaItems([])
    setTotal(0)
  }

  const calcularTotal = (datosCarrito: ItemCarrito[]) => {
    const sumTotal = datosCarrito.reduce(
      (acumulador: number, item: ItemCarrito) => acumulador + (item.precio * item.cantidad), 0)
    setTotal(sumTotal)
  }

  return (
    <>
      <PageHeader pageTitle="Carrito" />
      <section className="padded">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {dibujarTabla()}
              <button className="btn btn-primary"
                onClick={() => vaciarCarrito()}>Vaciar Carrito</button>
            </div>
            <div className="col-md-3">
              <div className="card text-bg-light mb-3">
                <div className="card-header">Total del carrito</div>
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <p className="card-text">S/ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart