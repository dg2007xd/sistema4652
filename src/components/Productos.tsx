import { useEffect, useState } from "react";
import { Producto } from "../types/Producto";
import { agregarCarrito, API_URL } from "../utils";
import "./Productos.css"
import { Link } from "react-router-dom";

interface ProductosProps {
  codigoCategoria: number;
}

function Productos({ codigoCategoria }: ProductosProps) {
  console.log(codigoCategoria);
  const [listaProductos, setListaProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>();

  const [numeroPagina, setNumeroPagina] = useState(0)
  const filasPagina = 5

  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0)

  useEffect(() => {
    leerServicio(codigoCategoria);
    setNumeroPagina(0)//Poner en primera pagina cada que cambia
  }, [codigoCategoria]);

  useEffect(() => {
    ordenarListaProductos(opcionSeleccionada)
  }, [opcionSeleccionada])

  const leerServicio = async (idcategoria: number) => {

    try {
      const response = await fetch(API_URL + "productos.php?idcategoria=" + idcategoria)
      const data: Producto[] = await response.json();
      console.log(data);
      setListaProductos(data);
    } catch (error) {
      console.log("Error consultando datos:", error);
    }
  }



  const dibujarWa = () => {
    return (
      <div id="cards-productos"
        className="row  row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {listaProductos.slice(filasPagina * numeroPagina, filasPagina * (numeroPagina + 1)).map(item => {
          const precioRebajado = Number(item.preciorebajado)
          const precio = Number(item.precio)
          return (
            <div className="col" key={item.idproducto}>
              <div className="card h-100">

                <Link to={"/productodetalle/" + item.idproducto}>
                  <img src={item.imagenchica === null
                    ? API_URL + "imagenes/nofoto.jpg"
                    : API_URL + item.imagenchica} className="card-img-top" alt="..." />
                </Link>
                <i
                  className="bi bi-eye icon-quick-view"
                  title="Vista rápida"
                  data-bs-toggle="modal"
                  data-bs-target="#quickViewModal"
                  onClick={() => seleccionarProducto(item.idproducto)}
                ></i>

                {precioRebajado !== 0
                  ? <div className="porcentaje-descuento">-
                    {Math.round((1 - precioRebajado / precio) * 100) + "%"}</div>
                  : ""
                }
                <div className="card-body">
                  <h5 className="card-title">{item.nombre}</h5>
                  <p className="card-text">S/
                    {precioRebajado === 0
                      ? precio.toFixed(2)
                      : precioRebajado.toFixed(2)
                    }
                    <span className="precio-anterior">
                      {precioRebajado === 0
                        ? ""
                        : "S/" + precio.toFixed(2)
                      }
                    </span><i className="bi bi-cart icon-cart" title="Añadir al carrito"
                      onClick={() => agregarCarrito(item, 1)}
                    ></i>
                  </p>
                </div>
              </div>
            </div>
          )
        }
        )}

      </div>
    )
  }

  const seleccionarProducto = async (idproducto: Number) => {
    console.log(idproducto)
    try {
      const response = await fetch(API_URL + "productos.php?idproducto=" + idproducto)
      const data: Producto[] = await response.json();
      console.log(data);
      setProductoSeleccionado(data[0]) //data[0] hace referencia al primer y unico elemento del arreglo
    } catch (error) {
      console.log("Error consultando datos:", error);
    }
  }

  const showQuickView = () => {
    const precioRebajado = Number(productoSeleccionado?.preciorebajado)
    const precio = Number(productoSeleccionado?.precio)
    return (
      <div className="modal fade" id="quickViewModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">{productoSeleccionado?.nombre}</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-md">
                  <img src={productoSeleccionado?.imagengrande
                    ? API_URL + productoSeleccionado.imagengrande
                    : API_URL + "imagenes/nofoto.jpg"} width={371} height={371} className="img-fluid" alt="..." />
                </div>
                <div className="col-md">
                  <table className="table">
                    <tbody>

                      <tr>
                        <th>Detalle</th>
                        <td>{productoSeleccionado?.detalle}</td>
                      </tr>
                      <tr>
                        <th>Categoría</th>
                        <td>{productoSeleccionado?.categoria}</td>
                      </tr>
                      <tr>
                        <th>Precio</th>
                        <td>S/
                          {precioRebajado === 0
                            ? precio.toFixed(2)
                            : precioRebajado.toFixed(2)
                          }
                          <span className="precio-anterior">
                            {precioRebajado === 0
                              ? ""
                              : "S/" + precio.toFixed(2)
                            }
                          </span></td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const dibujarPaginacion = () => {
    const totalPaginas = Math.ceil(listaProductos.length / filasPagina)
    const botones = [];
    for (let i = 1; i <= totalPaginas; i++) {
      botones.push(
        <li key={i} className={`page-item ${i === numeroPagina + 1 ? 'active' : ''}`}><a className="page-link" href="#" onClick={() => setNumeroPagina(i - 1)}>{i}</a></li>
      )
    }

    return (
      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination">
          {botones}
        </ul>
      </nav>
    )
  }

  const ordenarListaProductos = (criterio: Number) => {
    const productosOrdenados = Array.from(listaProductos)

    switch (criterio) {
      case 0:
        productosOrdenados.sort((a,b) => Number(a.idproducto) - Number(b.idproducto))
        break
      case 1:
        productosOrdenados.sort((a,b) => Number(b.idproducto) - Number(a.idproducto))
        break
      case 2:
        productosOrdenados.sort((a,b) => Number(a.preciorebajado || a.precio) - Number(b.preciorebajado || b.precio))
        break
      case 3:
        productosOrdenados.sort((a,b) => Number(b.preciorebajado || b.precio) - Number(a.preciorebajado || a.precio))
        break
    }
    setListaProductos(productosOrdenados)
  }

  const dibujarOrdenarPor = () => {
    return (
      <select className="form-select mb-3 w-auto"
        value={opcionSeleccionada} onChange={(event) => setOpcionSeleccionada(Number(event.target.value))}>
        <option value={0}>Mas antiguo</option>
        <option value={1}>Reciente</option>
        <option value={2}>Precio mas bajo</option>
        <option value={3}>Precio mas alto</option>
      </select>
    )
  }

  return (
    <>
      {dibujarOrdenarPor()}
      {dibujarWa()}
      {dibujarPaginacion()}
      {showQuickView()}
    </>
  )
}

export default Productos