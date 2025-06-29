import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { Empleado } from "../types/Empleado"
import { API_URL } from "../utils";
import axios from "axios";

function Employees() {

    const [listaEmpleados, setListaEmpleados] = useState<Empleado[]>([]);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = async() => {
        try{
            const response = await axios.get<Empleado[]>(API_URL + "empleados.php")
            console.log(response)
            setListaEmpleados(response.data)
        }
        catch(error){
            console.error("Error consultando datos:", error);
        }
        /*
        fetch(API_URL + "empleados.php")
            .then(response => response.json())
            .then((data: Empleado[]) => {
                console.log(data);
                setListaEmpleados(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
            */
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row  row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">

                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card">
                            <img src={API_URL + "fotos/" + item.foto} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )
    }


    return (
        <>
            <PageHeader pageTitle="Empleados" />
            <section id="employees" className='padded'>
                <div className="container">
                    {dibujarCuadricula()}

                </div>
            </section>
        </>
    )
}

export default Employees