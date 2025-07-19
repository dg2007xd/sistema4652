import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { Empleado } from "../types/Empleado"
import { API_URL } from "../utils";
import axios from "axios";
import "./Employees.css";

function Employees() {

    const [listaEmpleados, setListaEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);
    const [imagenesCargadas, setImagenesCargadas] = useState(0);

    useEffect(() => {
        leerServicio();
    }, []);

    useEffect(() => {
        if(listaEmpleados.length > 0 && imagenesCargadas === listaEmpleados.length) {
            setLoading(false);
        }
    })

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
            <div className={"row  row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4 "
                + (loading ? "d-none" : "")}>

                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card">
                            <img src={API_URL + "fotos/" + item.foto} className="card-img-top" alt="..."
                            onLoad={() => setImagenesCargadas(contar => contar + 1)} />
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

    const dibujarPrecarga = () => {
        const placeholders = Array.from({ length: 10})
        return (
            <div className={"row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4 "
                + (loading ? "" : "d-none")
            }>

                {placeholders.map((_, index) =>
                    <div className="col" key={index}>
                        <div className="card">
                            <div className="skeleton-img"></div>
                            <div className="card-body">
                                <div className="skeleton-line skeleton-title"> </div>
                                <div className="skeleton-line skeleton-subtitle"> </div>
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
                    {dibujarPrecarga()}
                    {dibujarCuadricula()}
                </div>
            </section>
        </>
    )
}

export default Employees