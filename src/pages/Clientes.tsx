import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { Cliente } from "../types/Cliente";
import { API_URL } from "../utils";

function Clientes() {
    const [listaClientes, setListaClientes] = useState<Cliente[]>([]);
    const [filasPagina, setFilasPagina] = useState(20)
    const [numeroPagina, setNumeroPagina] = useState(1)
    const [totalFilas, setTotalFilas] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)

    useEffect(() => {
        leerServicio();
    }, [numeroPagina, filasPagina]);

    const leerServicio = () => {
        fetch(`${API_URL}clientes_paginacion.php?filas_pagina=${filasPagina}&numero_pagina=${numeroPagina}`)
            .then(response => response.json())
            .then((data: { total: number, clientes: Cliente[] }) => {
                console.log(data.total);
                setTotalFilas(data.total)
                setListaClientes(data.clientes);
                const tPaginas = Math.ceil(data.total / filasPagina)
                setTotalPaginas(tPaginas)
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }


    const retroceder = () => {
        if (numeroPagina > 1) {
            setNumeroPagina(numeroPagina - 1)
        }
    }

    const avanzar = () => {
        if (numeroPagina < totalPaginas) {
            setNumeroPagina(numeroPagina + 1)
        }
    }

    const dibujarNumerosPagina = () => {
        return (
            <>
                {Array.from({ length: totalPaginas }, (_, index) => {
                    return (
                        <li key={index} className={`page-item ${index + 1 === numeroPagina ? "active" : ""}`}>
                            <a className="page-link" href="#" onClick={() => {
                                setNumeroPagina(index + 1)
                            }}>
                                {index + 1}
                            </a>
                        </li>
                    )
                })

                }
            </>
        )
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${numeroPagina === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => retroceder()}>
                            Anterior
                        </a>
                    </li>

                    {dibujarNumerosPagina()}

                    <li className={`page-item ${numeroPagina === totalPaginas ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => avanzar()}>
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>

        )
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Empresa</th>
                        <th>Nombres</th>
                        <th>Cargo</th>
                        <th>Ciudad</th>
                        <th>Pais</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        listaClientes.map(item =>
                            <tr key={item.idcliente}>
                                <td>{item.idcliente}</td>
                                <td>{item.empresa}</td>
                                <td>{item.nombres}</td>
                                <td>{item.cargo}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                            </tr>
                        )

                    }
                </tbody>
            </table>
        )

    }

    const asignarFilasPaginar = () => {
        return (
            <select className="form-select w-auto d-inline ms-2"
            value={filasPagina} onChange={(event) => {
                setFilasPagina(Number(event.target.value))
                setNumeroPagina(1)
            }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Clientes" />
            <section id="clientes" className='padded'>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        {dibujarPaginacion()}
                        <div>Número de Filas
                        {asignarFilasPaginar()}
                        </div>
                    </div>
                    {dibujarTabla()}
                    {"Total de filas: " + totalFilas}
                </div>
            </section>
        </>
    )
}

export default Clientes