'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { all_nota_materia } from "../../../../hooks/service_Nota";
import mensajes from "../../../menu/Mensajes";
import Menu from "../../../menu/menu";

export default function Page({ params }) {
  const external = params;
  const [producto, setProducto] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      all_nota_materia(external.external).then((info) => {
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

  // Filtra los datos según la sección "Uno"
  const datosSeccionUno = producto.filter((dato) => dato.unidad.nombre === "Uno");

  // Filtra los datos según la sección "Dos"
  const datosSeccionDos = producto.filter((dato) => dato.unidad.nombre === "Dos");

  const datosSeccionTres = producto.filter((dato) => dato.unidad.nombre === "Tres");

  return (
    <>
      <header style={{ marginTop: '70px' }}>
        <Menu />
      </header>
      <main className="container text-center mt-5">
        <div className="row">
          {datosSeccionUno.length > 0 && (
            <div className="col">
              <h2>Unidad Uno</h2>
              <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
                <thead className="table-active">
                  <tr>
                    <th>id</th>
                    <th>Alumno</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {datosSeccionUno.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{dato.nombre_alumno}</td>
                      <td className={dato.nota_total < 7 ? "text-danger" : ""}>
                        {dato.nota_total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {datosSeccionDos.length > 0 && (
            <div className="col">
              <h2>Unidad Dos</h2>
              <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
                <thead className="table-active">
                  <tr>
                    <th>id</th>
                    <th>Alumno</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {datosSeccionDos.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{dato.nombre_alumno}</td>
                      <td className={dato.nota_total < 7 ? "text-danger" : ""}>
                        {dato.nota_total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {datosSeccionTres.length > 0 && (
            <div className="col">
              <h2>Unidad Tres</h2>
              <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
                <thead className="table-active">
                  <tr>
                    <th>id</th>
                    <th>Alumno</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {datosSeccionTres.map((dato, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{dato.nombre_alumno}</td>
                      <td className={dato.nota_total < 7 ? "text-danger" : ""}>
                        {dato.nota_total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
