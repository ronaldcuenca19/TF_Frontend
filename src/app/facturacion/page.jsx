'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { all_factura } from '../../hooks/service_factura';
import mensajes from "../menu/Mensajes";
import Menu from "../menu/menu";
import jsPDF from 'jspdf';
import Factura from '../factura/esquema/Factura'; 
import { all_detalle_factura_especifico } from '../../hooks/service_factura';

export default function Page() {
  const [producto, setProducto] = useState([]);
  const [eleccion, setEleccion] = useState(null);
  const [producto2, setProducto2] = useState([]);
  const [obt, setObt] = useState(false);

  useEffect(() => {
    if (!obt) {
      all_factura().then((info) => {
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

  const generatePDF = async (external) => {
    setEleccion(external);

    try {
      const info = await all_detalle_factura_especifico(external);
      console.log(info);
      if (info.code === 200) {
        setProducto2(info.datos);

        setTimeout(() => {
          const doc = new jsPDF('landscape', 'mm', 'letter');
          const content = document.querySelector('#factura');
          
          doc.html(content, {
            callback: function (doc) {
              doc.save('factura.pdf');
            },
            x: 10,
            y: 10,
            html2canvas: { scale: 0.2 }
          });
        }, 1000);
      } else {
        mensajes("Error al listar Lotes", "Error", "error");
      }
    } catch (error) {
      console.error("Error al obtener detalles de factura:", error);
      mensajes("Error al listar Lotes", "Error", "error");
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
            height: '30vh', 
          }}
        >
          <div className="container-fluid">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 mb-4 text-center">
                  <div className="btn-group" role="group">
                    <Link href="/principal" className="btn btn-success font-weight-bold" style={{ fontSize: '25px' }}>Registrar</Link>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-bordered" style={{ borderColor: "ActiveBorder", fontSize: '25px' }}>
              <thead className="table-active">
                <tr>
                  <th>id</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Nro Factura</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {producto.map((dato, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dato.cliente}</td>
                    <td>{formatFecha(dato.fecha)}</td>
                    <td>{dato.numero_factura}</td>
                    <td>{dato.total}</td>
                    <td style={{ width: '280px' }}>
                      <button onClick={() => generatePDF(dato.external)}>Generar PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Renderizar Factura solo si producto2 tiene datos */}
        {producto2.length > 0 && <Factura detalles={producto2} />}
      </main>
    </>
  );
}
