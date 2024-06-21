'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { all_producto, cambiarEstado} from "@/src/hooks/service_producto";
import mensajes from "../menu/Mensajes";
import Menu from "../menu/menu";

export default function Page() {
  useEffect(() => {
    cambiarEstado()
}, []);
  const [producto, setProducto] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      all_producto().then((info) => {
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
                    <Link href="/producto/registrar" className="btn btn-success font-weight-bold" style={{ fontSize: '25px' }}>Registrar</Link>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
              <thead className="table-active">
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {producto.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dato.nombre}</td>
                    <td>{dato.precio}</td>
                    <td>{dato.stock}</td>
                    <td>
                                    {dato.foto === 'producto.png' ? (
                                        <>
                                        <Link href="/foto/[external]" as={`/foto/${dato.external_id}`} className="btn btn-outline-succes btn-rounded">
                                        <img
                                            src={`http://localhost:5000/static/product_gallery/${dato.foto}`}
                                            alt="Foto del producto"
                                            style={{ width: '90px', height: 'auto' }}
                                        />
                                        </Link>
                                        </>
                                    ) : (
                                      <>
                                        <Link href="/foto/[external]" as={`/foto/${dato.external_id}`} className="btn btn-outline-succes btn-rounded">
                                        <img
                                            src={`http://localhost:5000/static/product_gallery/${dato.foto}`}
                                            alt="Foto del producto"
                                            style={{ width: '200px', height: 'auto' }}
                                        />
                                        </Link>
                                        </>
                                    )}
                                </td>
                    <td style={{ width: '280px' }}>
                      <Link
                        href="/producto/editar/[external]"
                        as={`producto/editar/${dato.external_id}`}
                        style={{ marginRight: "15px", fontSize: '20px' }}
                        className="btn btn-warning font-weight-bold"
                      >
                        Editar
                      </Link>
                    </td>
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
