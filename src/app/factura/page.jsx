'use client'
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Factura from '../factura/esquema/Factura'; // Asegúrate de importar tu componente Factura
import { all_detalle_factura } from '../../hooks/service_factura';

export default function FacturaPage() {
    const [detalle_factura, setdetalle_factura] = useState([]);
    const [obt, setObt] = useState(false);

    useEffect(() => {
        if (!obt) {
            all_detalle_factura().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setdetalle_factura(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar facturas", "Error", "error");
                }
            });
        }
    }, [obt]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.html(document.querySelector('#factura'), {
            callback: function (doc) {
                doc.save('factura.pdf');
            },
            x: 10,
            y: 10
        });
    };

    return (
        <div>
            <Factura detalles={detalle_factura} />
            <button onClick={generatePDF}>Generar PDF</button>
        </div>
    );
};
