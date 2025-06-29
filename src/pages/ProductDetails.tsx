import { useEffect, useState } from "react"
import { API_URL } from "../utils"
import { useParams } from "react-router-dom"
import { Producto } from "../types/Producto"
import '../pages/ProductDetails.css'


function ProductDetails() {
    const params = useParams()
    console.log(params)
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>();
    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = async () => {
        try {
            const response = await fetch(API_URL + "productos.php?idproducto=" + params.idproducto)
            const data: Producto[] = await response.json();
            console.log(data);
            setProductoSeleccionado(data[0]) //data[0] hace referencia al primer y unico elemento del arreglo
        } catch (error) {
            console.log("Error consultando datos:", error);
        }
    }

    const precioRebajado = Number(productoSeleccionado?.preciorebajado)
    const precio = Number(productoSeleccionado?.precio)

    return (
        <section className="padded">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={productoSeleccionado?.imagengrande
                            ? API_URL + productoSeleccionado.imagengrande
                            : API_URL + "imagenes/nofoto.jpg"} className="img-fluid" alt="..." />
                    </div>
                    <div className="col">
                        <h2>{productoSeleccionado?.nombre}</h2>
                        <table className="table">
                            {productoSeleccionado && (<tbody>

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

                                <tr>
                                    <th>Stock</th>
                                    <td>{productoSeleccionado?.unidadesenexistencia}</td>
                                </tr>
                                <tr>
                                    <th>Proveedor</th>
                                    <td>{productoSeleccionado?.proveedor}</td>
                                </tr>
                                <tr>
                                    <th>Pais</th>
                                    <td>{productoSeleccionado?.pais}</td>
                                </tr>
                                <tr>
                                    <th>Atención al cliente</th>
                                    <td>{productoSeleccionado?.telefono}</td>
                                </tr>
                                <tr>
                                    <th>Valoracion</th>
                                    <td>
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} className={`bi ${index <productoSeleccionado?.promedioestrellas ? 'bi-star-fill' : 'bi-star'}`}
                                            
                                            ></i>
                                        ))}
                                        <span className="ms-2">({productoSeleccionado?.totalcalificaciones}) Calificaciones</span>
                                    </td>
                                </tr>

                            </tbody>)}
                        </table>
                        <h3>Descripcion</h3>
                        <div dangerouslySetInnerHTML={{ __html: productoSeleccionado?.descripcion || "" }}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails