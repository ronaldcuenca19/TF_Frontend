'use client';
import mensajes from '../menu/Mensajes';
import Menu from '../menu/menu';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { save_factura_detalle, all_detalle_factura, all_factura, save_factura } from '../../hooks/service_factura';
import { all_client } from '../../hooks/service_persona';
import { all_producto } from '../../hooks/service_producto';


export default function Page() {
    const router = useRouter();
    const [factura, setfactura] = useState([]);
    const [persona, setPersona] = useState([]);
    const [producto, setProducto] = useState([]);
    const [obt, setObt] = useState(false);

    const facturaValidationSchema = Yup.object().shape({
        cliente: Yup.string().required('Ingrese para que cliente generar la factura'),
    });

    const otherFieldsValidationSchema = Yup.object().shape({
        factura: Yup.string().required('Ingrese la factura a guardar los productos'),
        cantidad: Yup.number().required('Ingrese la cantidad del producto para la factura'),
        producto: Yup.string().required('Ingrese el producto a guardar en la factura'),
    });

    const formOptionsFactura = { resolver: yupResolver(facturaValidationSchema) };
    const formOptionsDetalleFactura = { resolver: yupResolver(otherFieldsValidationSchema) };

    const { register: registerFactura, handleSubmit: handleSubmitFactura, formState: formStateFactura } = useForm(formOptionsFactura);
    const { register: registerDetalleFactura, handleSubmit: handleSubmitOtherFields, formState: formStateOtherFields } = useForm(formOptionsDetalleFactura);

    const { errors: errorsFactura } = formStateFactura;
    const { errors: errorsOtherFields } = formStateOtherFields;

    const sendData = (data) => {
        console.log('Datos a enviar al backend:', data);
        var datos = {
            'id_persona': data.cliente,
        };

        save_factura(datos).then((info) => {
            console.log(info);
            if (info.code !== 200) {
                mensajes("detalle_factura no se pudo guardar", "Error", "error")
            } else {
                mensajes("detalle_factura guardado correctamente", "Informacion", "success")
                window.location.reload();
            }
        });
    };

    const sendData2 = (data) => {
        console.log('Datos a enviar al backendddddd:', data);
        var datos = {
            'cantidad': data.cantidad,
            'id_factura': data.factura,
            'id_producto': data.producto
        };

        save_factura_detalle(datos).then((info) => {
            console.log(info);
            if (info.code !== 200) {
                mensajes("detalle_factura no se pudo guardar", "Error", "error")
            } else {
                mensajes("detalle_factura guardado correctamente", "Informacion", "success")
                router.push("/facturacion");
            }
        });
    };

    useEffect(() => {
        if (!obt) {
            all_factura().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setfactura(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar usuarios", "Error", "error");
                }
            });
        }
    }, [obt]);


    useEffect(() => {
        if (!obt) {
            all_client().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setPersona(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar facturas", "Error", "error");
                }
            });
        }
    }, [obt]);

    useEffect(() => {
        if (!obt) {
            all_producto().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setProducto(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar facturas", "Error", "error");
                }
            });
        }
    }, [obt]);

    return (
        <div
            className="row justify-content-center"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Asegura que el contenedor ocupe el 100% de la altura de la pantalla
            }}
        >
            <div className="d-flex flex-column">
                <Menu></Menu>
                <h1 style={{ color: '#005c00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Generar Nueva Factura
                </h1>
                <div
                    className="container-fluid"
                    style={{
                        border: '4px solid #ccc',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '1000px',
                        background: 'white', // Asegura que el fondo sea blanco para mejorar la legibilidad
                    }}
                >
                    <br />
                    <form className="cliente" onSubmit={handleSubmitFactura(sendData)}>
                        <div className="col mb-4">
                            <select {...registerFactura('cliente')} name="cliente" id="cliente" className={`form-control ${errorsFactura.factura ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija el cliente para generar nueva factura</option>
                                {persona.map((aux, i) => (
                                    <option key={i} value={aux.external_id}>
                                        {`${aux.nombre} ${aux.apellido}  -  ${aux.cedula}`}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>cliente</label>
                            <div className='alert alert-danger invalid-feedback'>{errorsFactura.factura?.message}</div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-success ml-3"
                                style={{
                                    background: '#728C69',
                                    marginLeft: '20px',
                                    fontSize: '25px',
                                }}
                            >
                                GUARDAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>






            <div className="d-flex flex-column">
                <h1 style={{ color: '#005c00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Registrar Detalle de Factura
                </h1>
                <div
                    className="container-fluid"
                    style={{
                        border: '4px solid #ccc',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '1000px',
                        background: 'white',
                    }}
                >
                    <br />
                    <form className="fecha_caducidad" onSubmit={handleSubmitOtherFields(sendData2)}>
                    <div className="col mb-4">
                            <select {...registerDetalleFactura('factura')} name="factura" id="factura" className={`form-control ${errorsOtherFields.factura ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija la factura a calcular</option>
                                {factura.map((aux, i) => (
                                    <option key={i} value={aux.external}>
                                        {`Nro: ${aux.numero_factura} - Cliente: ${aux.cliente} - Cedula: ${aux.cedula} `}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>factura</label>
                            <div className='alert alert-danger invalid-feedback'>{errorsOtherFields.factura?.message}</div>
                        </div>
                        <div className="col mb-4">
                            <select {...registerDetalleFactura('producto')} name="producto" id="producto" className={`form-control ${errorsOtherFields.producto ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija el producto de la factura</option>
                                {producto.map((aux, i) => (
                                    <option key={i} value={aux.external_id}>
                                        {`${aux.nombre} - Stock: ${aux.stock}`}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>factura</label>
                            <div className='alert alert-danger invalid-feedback'>{errorsOtherFields.producto?.message}</div>
                        </div>
                        <div className="col">
                            <input
                                {...registerDetalleFactura('cantidad')}
                                name="cantidad"
                                id="cantidad"
                                className={`form-control ${errorsOtherFields.cantidad ? 'is-invalid' : ''}`}
                                placeholder="Ingrese una cantidad para el producto"
                                autoComplete="off"
                                style={{ fontSize: '25px' }}
                            />
                            <label className="form-label" style={{ color: '#889859' }}>
                                cantidad
                            </label>
                            <div className="alert alert-danger invalid-feedback">
                                {errorsOtherFields.cantidad?.message}
                            </div>
                        </div>


                        

                        <div className="d-flex justify-content-center mt-4">
                            <Link
                                href="/detalle_factura"
                                className="btn btn-danger mr-3"
                                style={{ background: 'red', fontSize: '25px' }}
                            >
                                CANCELAR
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-success ml-3"
                                style={{
                                    background: '#728C69',
                                    marginLeft: '20px',
                                    fontSize: '25px',
                                }}
                            >
                                GUARDAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};