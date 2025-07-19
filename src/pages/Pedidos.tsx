import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Pedido } from "../types/Pedido";
import { API_URL } from "../utils";

function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState<Pedido[]>([]);
    const [filasPagina] = useState(25);
    const [numero_pagina, setNumeroPagina] = useState(1);

    const bloquearRef = useRef(false);

    useEffect(() => {
        leerServicio(numero_pagina);
    }, [numero_pagina]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !bloquearRef.current) {
                bloquearRef.current = true;
                setNumeroPagina(prev => prev + 1);
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    });

    const leerServicio = async (pagina: number) => {
        try {
            const response = await fetch(`${API_URL}pedidos.php?filas_pagina=${filasPagina}&numero_pagina=${pagina}`)
            const data = await response.json()
            let nuevaLista = [...listaPedidos, ...data.pedidos];
            setListaPedidos(nuevaLista);
        }
        catch (error) {
            console.error("Error consultando datos:", error);
        }
        finally {
            bloquearRef.current = false;
        }
    }


    const dibujarTabla = () => {
        return (
            <>
                <div className="row fw-bold border-bottom p-2 mb-2">
                    <div className="col-1">No. Pedido</div>
                    <div className="col-3 text-start">Cliente</div>
                    <div className="col-1 text-end">Fecha</div>
                    <div className="col-2">Empresa envio</div>
                    <div className="col-2">Destinatario</div>
                    <div className="col-2">Vendedor</div>
                </div>

                {
                    listaPedidos.map(item => {
                        let total = 0
                        return(<>
                            <div className="row border-bottom p-1" key={item.idpedido} data-bs-toggle="collapse" data-bs-target={"#collapsePedido" + item.idpedido}>
                                <div className="col-1">{item.idpedido}</div>
                                <div className="col-3">{item.cliente}</div>
                                <div className="col-1 text-end">{new Date(item.fechapedido).toLocaleDateString("es-PE")}</div>
                                <div className="col-2">{item.destinatario}</div>
                                <div className="col-2">{item.empresaenvio}</div>
                                <div className="col-2">{item.vendedor}</div>
                            </div>

                            <div className="collapse" id={"collapsePedido" + item.idpedido}>
                                <div className="card card-body">
                                    <div className="row fw-bold">
                                        <div className="col-1">Cod</div>
                                        <div className="col-4">Producto</div>
                                        <div className="col-1 text-end">Precio</div>
                                        <div className="col-1 text-end">Cantidad</div>
                                        <div className="col-1 text-end">Subtotal</div>
                                    </div>
                                    {
                                        item.detalle.map(itemDetalle => {
                                            const subtotal = itemDetalle.precio * itemDetalle.cantidad
                                            total += subtotal;
                                            return (
                                                <div className="row" key={itemDetalle.idproducto}>
                                                    <div className="col-1">{itemDetalle.idproducto}</div>
                                                    <div className="col-4">{itemDetalle.producto}</div>
                                                    <div className="col-1 text-end">{Number(itemDetalle.precio).toFixed(2)}</div>
                                                    <div className="col-1 text-end">{itemDetalle.cantidad}</div>
                                                    <div className="col-1 text-end">{subtotal.toFixed(2)}</div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                    <div className="row fw-bold">
                                        <div className="col-7 text-end">Total</div>
                                        <div className="col-1 text-end">{total.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </>)
    }
                    )}
            </>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Pedidos" />
            <section id="pedidos" className='padded'>
                <div className="container">
                    {dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Pedidos