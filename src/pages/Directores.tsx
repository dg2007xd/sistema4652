import PageHeader from "../components/PageHeader";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils";
import { Director } from "../types/Director";
import axios from "axios";

function Directores() {
    const [listaDirectores, setListaDirectores] = useState<Director[]>([]);
    const [iddirector, setIddirector] = useState(0)
    const [nombres, setNombres] = useState("")
    const [peliculas, setPeliculas] = useState("")

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = async () => {
        try {
            const response = await fetch(API_URL + "directores.php")
            const data: Director[] = await response.json()
            console.log(data)
            setListaDirectores(data);
        }
        catch (error) {
            console.error("Error consultando datos:", error);
        };

        /*
        fetch(API_URL + "directores.php")
            .then(response => response.json())
            .then((data: Director[]) => {
                console.log(data);
                setListaDirectores(data);
            })
            .catch((error) => {
            console.error("Error consultando datos:", error);
            });
        */
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombres</th>
                        <th>Peliculas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {

                        listaDirectores.map(item =>
                            <tr key={item.iddirector}>
                                <td>{item.iddirector}</td>
                                <td>{item.nombres}</td>
                                <td>{item.peliculas}</td>
                                <td><i className="bi bi-pencil" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasUpdate" style={{ cursor: "pointer" }}
                                    onClick={() => seleccionarDirector(item)}></i></td>
                                <td><i className="bi bi-trash3" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasDelete" style={{ cursor: "pointer" }}
                                    onClick={() => seleccionarDirector(item)}></i></td>
                            </tr>
                        )

                    }
                </tbody>
            </table>
        )

    }

    const seleccionarDirector = (director: Director) => {
        setIddirector(director.iddirector)
        setNombres(director.nombres)
        setPeliculas(director.peliculas)
    }


    const insertDirector = async (event: React.SyntheticEvent) => {
        event.preventDefault() //Evita que se vuelva a cargar la pagina 
        console.log(nombres, peliculas)

        const formData = new FormData()
        formData.append("nombres", nombres) //En php y en el codigo d aca ps(el azul)
        formData.append("peliculas", peliculas)

        try {
            const response = await fetch(API_URL + "directoresinsert.php", {
                method: "POST",
                body: formData
            })
            const data: string = await response.text()
            console.log(data)

            leerServicio()
            const botonCerrar = document.querySelector("#offcavasInsert .btn-close") as HTMLElement
            botonCerrar.click()
            setNombres("") //Vaciar las cajas dsps de haberlo mandado
            setPeliculas("")
        }
        catch (error) {
            console.error("Error al registrar un nuevo director ", error)
        }

        /*
                fetch(API_URL + "directoresinsert.php", {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then((data: string) => {
                        console.log(data)
                        leerServicio()
                        const botonCerrar = document.querySelector("#offcavasInsert .btn-close") as HTMLElement
                        botonCerrar.click()
                        setNombres("") //Vaciar las cajas dsps de haberlo mandado
                        setPeliculas("")
                    })
        */
    }


    const dibujarInsertModal = () => {
        return (
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasInsert"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Nuevo Director
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => insertDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del Director"
                                value={nombres} onChange={event => setNombres(event.target.value)} required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Peliculas"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    const updateDirector = async (event: React.SyntheticEvent) => {
        event.preventDefault() //Evita que se vuelva a cargar la pagina 
        console.log(nombres, peliculas)

        const formData = new FormData()
        formData.append("iddirector", iddirector.toString())
        formData.append("nombres", nombres) //En php y en el codigo d aca ps(el azul)
        formData.append("peliculas", peliculas)

        {/*Ultimo solo con axios  */ }
        try {
            const response = await axios.post(API_URL + "directoresupdate.php", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            leerServicio()
            const botonCerrar = document.querySelector("#offcavasUpdate .btn-close") as HTMLElement
            botonCerrar.click()
            setIddirector(0)
            setNombres("") //Vaciar las cajas dsps de haberlo mandado
            setPeliculas("")
        }
        catch (error) {
            console.error("Error al actualizar los datos del director ", error)
        }


        {/*Anterior con async await */ }
        /*
        try {

            const response = await fetch(API_URL + "directoresupdate.php", {
                method: "POST",
                body: formData
            })
            const data: string = await response.text()
            console.log(data)
            leerServicio()
            const botonCerrar = document.querySelector("#offcavasUpdate .btn-close") as HTMLElement
            botonCerrar.click()
            setIddirector(0)
            setNombres("") //Vaciar las cajas dsps de haberlo mandado
            setPeliculas("")
        }
        catch (error) {
            console.error("Error al actualizar los datos del director ", error)
        }
            */


        {/*Anterior sin async await ni axios */ }
        /*
                fetch(API_URL + "directoresupdate.php", {
                    method: "POST",
                    body: formData
                })
                    .then(response => response.text())
                    .then((data: string) => {
                        console.log(data)
                        leerServicio()
                        const botonCerrar = document.querySelector("#offcavasUpdate .btn-close") as HTMLElement
                        botonCerrar.click()
                        setIddirector(0)
                        setNombres("") //Vaciar las cajas dsps de haberlo mandado
                        setPeliculas("")
                    })
                        */
    }

    const dibujarUpdateModal = () => {
        return (
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasUpdate"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Actualizar Director
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={(event) => updateDirector(event)}>
                        <div className="mb-3">
                            <input type="text" className="form-control" readOnly value={iddirector} />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre del Director"
                                value={nombres} onChange={event => setNombres(event.target.value)} required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Peliculas"
                                value={peliculas} onChange={event => setPeliculas(event.target.value)} required minLength={2} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    const deleteDirector = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("iddirector", iddirector.toString());

    try {
        const response = await fetch(API_URL + "directoresdelete.php", {
            method: "POST",
            body: formData
        });
        const data = await response.text();
        console.log(data);
        leerServicio();
        const botonCerrar = document.querySelector("#offcanvasDelete .btn-close") as HTMLElement;
        if (botonCerrar) botonCerrar.click();
        setIddirector(0);
        setNombres("");
        setPeliculas("");
    } catch (error) {
        console.error("Error al eliminar el director", error);
    }
}

    const dibujarDeleteModal = () => (
        <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasDelete"
            aria-labelledby="offcanvasDeleteLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDeleteLabel">
                    Eliminar Director
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                />
            </div>
            <div className="offcanvas-body">
                <form onSubmit={(event) => deleteDirector(event)}>
                    <h6 className="mb-3">¿Está seguro de eliminar el director?</h6>
                    <div className="mb-3">
                        <input type="text" className="form-control mb-2" readOnly value={iddirector} />
                        <input type="text" className="form-control mb-2" readOnly value={nombres} />
                        <input type="text" className="form-control mb-2" readOnly value={peliculas} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-danger" type="submit">Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <>
            <PageHeader pageTitle="Directores" />
            <section id="directores" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <button className="btn btn-primary" type="button"
                            //Esto es para llamar la funcion de bootstrap
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasInsert"
                        >Nuevo Director</button>
                    </div>

                    {dibujarTabla()}
                    {dibujarInsertModal()}
                    {dibujarUpdateModal()}
                    {dibujarDeleteModal()}
                </div>
            </section>
        </>
    )
}

export default Directores