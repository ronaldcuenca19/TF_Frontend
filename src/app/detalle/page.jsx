'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { all_materia } from "../../../src/hooks/service_Nota";
import mensajes from "../menu/Mensajes";
import Menu from "../menu/menu";

export default function Page() {
  const [producto, setProducto] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      all_materia().then((info) => {
        console.log(info);
        if (info.code === 200) {
          setProducto(info.datos);
          setObt(true);
        } else {
          mensajes("Error al listar Lotes", "Error", "error");
        }
      });
    }
  }, [obt]);

  return (
    <>
      <header style={{ marginTop: '70px' }}>
        <Menu />
      </header>
      <main className="container text-center mt-5">
        <div className="row">
          {producto.map((dato, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{fontSize:'35px'}}>{dato.nombre}</h5>
                  <p className="card-text" style={{fontSize:'25px'}}>Código: {dato.codigo_materia}</p>
                  <p className="card-text"style={{fontSize:'25px'}}>Docente: {dato.nombre_profesor}</p>
                  <Link
                    href="/producto/detalles/[external]"
                    as={`detalle/nota/${dato.external_id}`}
                    className="btn btn-primary"
                    style={{
                        backgroundColor: '#ffa500', // Fondo color naranja
                        color: "black", // Color del texto en negro
                        fontSize: '16px', // Tamaño de fuente ajustado, puedes cambiar el valor según necesites
                        padding: '10px 20px', // Ajuste opcional del padding
                    }}
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
