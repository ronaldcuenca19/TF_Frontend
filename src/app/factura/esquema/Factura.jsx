import React from 'react';

export default function Factura({ detalles }) {
    if (detalles.length === 0) {
        return <div>No hay detalles disponibles</div>;
    }

    const { cliente, cedula, total, factura } = detalles[0];

    return (
        <div id="factura" style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>FACTURACIÓN</h1>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Cliente:</strong> {cliente}</p>
                <p><strong>Cédula:</strong> {cedula}</p>
                <p><strong>Nro Factura:</strong> {factura}</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Producto</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', backgroundColor: '#f2f2f2' }}>Cantidad</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', backgroundColor: '#f2f2f2' }}>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {detalles.map((detalle, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detalle.producto}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{detalle.cantidad}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{detalle.total_producto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'right', fontSize: '18px' }}>
                <p><strong>Total:</strong> {total}$</p>
            </div>
        </div>
    );
}
