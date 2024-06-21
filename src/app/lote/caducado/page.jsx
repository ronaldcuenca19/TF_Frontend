'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import { all_lote_producto, all_product_caducado, cambiarEstado } from "@/src/hooks/service_producto";
import mensajes from "../../menu/Mensajes";
import Menu from "../../menu/menu";

export default function Page() {
    useEffect(() => {
        cambiarEstado()
    }, []);
    const router = useRouter();
    const [lote, setLote] = useState([]);
    const [obt, setObt] = useState(false);

    useEffect(() => {
        if (!obt) {
            all_product_caducado().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setLote(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar Lotes", "Error", "error");
                }
            });
        }
    }, [obt]);

    
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const datosCaducados = () => {
        router.push('/lote/caducado');
    }

    const datosAPunto = () => {
        router.push('/lote/APunto')
    }


    return (
        <>
            <header>
                <Menu></Menu>
            </header>
            <main className="container text-center mt-5">
                <div
                    className="row justify-content-center"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '30vh', // Asegura que el contenedor ocupe el 100% de la altura de la pantalla
                    }}
                >
                    <div className="container-fluid">

                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 mb-4 text-center">
                                    <div className="btn-group" role="group">
                                        <Link href="/lote/registrar" className="btn btn-success font-weight-bold" style={{ fontSize: '25px' }}>Registrar</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Filtrar:
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" onClick={datosCaducados}>Caducados</a>
                                <a class="dropdown-item" href="#" onClick={datosAPunto}>A Punto Caducar</a>
                            </div>
                        </div>
                        <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
                            <thead className="table-active">
                                <tr>
                                    <th>id</th>
                                    <th>Fecha Caducidad</th>
                                    <th>Cantidad</th>
                                    <th>Producto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.map((dato, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{formatFecha(dato.fecha_caducidad)}</td>
                                        <td>{dato.lote}</td>
                                        <td>{dato.producto.nombre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
