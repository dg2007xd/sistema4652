import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader"
import { Categoria } from "../types/Categoria";
import Productos from "../components/Productos";
import { API_URL } from "../utils";

function Store() {

    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "categorias.php")
            .then(response => response.json())
            .then((data: Categoria[]) => {
                console.log(data);
                setListaCategorias(data);
                setCategoriaSeleccionada(data[0]);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarLista = () => {
        return (
            <ul className="list-group">


                {listaCategorias.map(item => (
                    <li key={item.idcategoria} 
                        className={"list-group-item" + (categoriaSeleccionada?.idcategoria === item.idcategoria ? " active" : "")}
                        title={item.descripcion}
                        onClick={() => seleccionarCategoria(item)}>
                        {item.nombre} ({item.total})
                    </li>
                ))}

            </ul>
        )
    }

    const seleccionarCategoria = (item: Categoria) => {
        console.log(item);
        setCategoriaSeleccionada(item);
    }




    return (
        <>
            <PageHeader pageTitle="Tienda" />
            <section id="store" className='padded'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <h3>Categorias</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-9">
                            <h3>{categoriaSeleccionada?.nombre}</h3>
                            <p>{categoriaSeleccionada?.descripcion}</p>
                            <Productos codigoCategoria={categoriaSeleccionada?.idcategoria || 0}/>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Store