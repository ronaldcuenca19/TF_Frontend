'use client';
import mensajes from '../../menu/Mensajes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { save_lote, all_lote, all_producto, save_lote_producto } from '@/src/hooks/service_producto';
import Menu from '../../menu/menu';


export default function Page() {
  const router = useRouter();
  const [producto, setProducto] = useState([]);
  const [lote, setLote] = useState([]);
  const [obt, setObt] = useState(false);

  const fechaProduccionValidationSchema = Yup.object().shape({
    fecha_produccion: Yup.date().required('Ingrese la fecha de producción para el lote ingresado'),
  });
  
  const otherFieldsValidationSchema = Yup.object().shape({
    fecha_caducidad: Yup.string().required('Ingrese la fecha de caducidad para el lote ingresado'),
    cantidad: Yup.number().required('Ingrese la cantidad del lote del producto'),
    lote: Yup.string().required('Ingrese el lote fecha para el producto a guardar'),
    producto: Yup.string().required('Ingrese qué producto será registrado en el lote'),
  });
  
  const formOptionsFechaProduccion = { resolver: yupResolver(fechaProduccionValidationSchema) };
  const formOptionsOtherFields = { resolver: yupResolver(otherFieldsValidationSchema) };
  
  const { register: registerFechaProduccion, handleSubmit: handleSubmitFechaProduccion, formState: formStateFechaProduccion } = useForm(formOptionsFechaProduccion);
  const { register: registerOtherFields, handleSubmit: handleSubmitOtherFields, formState: formStateOtherFields } = useForm(formOptionsOtherFields);
  
  const { errors: errorsFechaProduccion } = formStateFechaProduccion;
  const { errors: errorsOtherFields } = formStateOtherFields;

  const sendData = (data) => {
    console.log('Datos a enviar al backend:', data);
    const fechain = new Date(data.fecha_produccion).toISOString().split('T')[0];
    var datos = {
      'fecha_produccion': fechain,
    };

    save_lote(datos).then((info) => {
      console.log(info);
      if (info.code !== 200) {
        mensajes("Lote no se pudo guardar", "Error", "error")
      } else {
        mensajes("Lote guardado correctamente", "Informacion", "success")
        window.location.reload();
      }
    });
  };

  const sendData2 = (data) => {
    console.log('Datos a enviar al backend:', data);
    const fechacad = new Date(data.fecha_caducidad).toISOString().split('T')[0];
    var datos = {
      'fecha_caducidad': fechacad,
      'cantidad': data.cantidad,
      'id_lote': data.lote,
      'id_producto': data.producto
    };

    save_lote_producto(datos).then((info) => {
      console.log(info);
      if (info.code !== 200) {
        mensajes("Lote no se pudo guardar", "Error", "error")
      } else {
        mensajes("Lote guardado correctamente", "Informacion", "success")
        router.push("/lote");
      }
    });
  };

  useEffect(() => {
    if (!obt) {
        all_producto().then((info) => {
            console.log(info);
            if (info.code === 200) {
                setProducto(info.datos);
                setObt(true);
            } else {
                mensajes("Error al listar usuarios", "Error", "error");
            }
        });
    }
}, [obt]);

useEffect(() => {
    if (!obt) {
        all_lote().then((info) => {
            console.log(info);
            if (info.code === 200) {
                setLote(info.datos);
                setObt(true);
            } else {
                mensajes("Error al listar productos", "Error", "error");
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
          Registrar Lote
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
          <form className="fecha_produccion" onSubmit={handleSubmitFechaProduccion(sendData)}>
            <div className="col">
              <input
                {...registerFechaProduccion('fecha_produccion')}
                name="fecha_produccion"
                id="fecha_produccion"
                type='date'
                className={`form-control ${errorsFechaProduccion.fecha_produccion ? 'is-invalid' : ''}`}
                placeholder="Ingrese la fecha de produccion a tener el lote"
                autoComplete="off"
                style={{ fontSize: '25px' }}
              />
              <label className="form-label" style={{ color: '#889859' }}>
                fecha produccion
              </label>
              <div className="alert alert-danger invalid-feedback">
                {errorsFechaProduccion.fecha_produccion?.message}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link
                href="/lote"
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






      <div className="d-flex flex-column">
        <h1 style={{ color: '#005c00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Registrar Lote Producto
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
          <div className="col">
                <input
                  {...registerOtherFields('cantidad')}
                  name="cantidad"
                  id="cantidad"
                  className={`form-control ${errorsOtherFields.cantidad ? 'is-invalid' : ''}`}
                  placeholder="Ingrese una cantidad para el lote del producto"
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
            <div className="col">
              <input
                {...registerOtherFields('fecha_caducidad')}
                name="fecha_caducidad"
                id="fecha_caducidad"
                type='date'
                className={`form-control ${errorsOtherFields.fecha_caducidad ? 'is-invalid' : ''}`}
                placeholder="Ingrese la fecha de caducidad a tener el producto en este lote"
                autoComplete="off"
                style={{ fontSize: '25px' }}
              />
              <label className="form-label" style={{ color: '#889859' }}>
                fecha caducidad
              </label>
              <div className="alert alert-danger invalid-feedback">
                {errorsOtherFields.fecha_caducidad?.message}
              </div>
            </div>

            <div className="col mb-4">
                            <select {...registerOtherFields('producto')} name="producto" id="producto" className={`form-control ${errorsOtherFields.producto ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija el producto del lote</option>
                                {producto.map((aux, i) => (
                                    <option key={i} value={aux.external_id}>
                                        {`${aux.nombre}`}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>producto</label>
                            <div className='alert alert-danger invalid-feedback'>{errorsOtherFields.producto?.message}</div>
                        </div>

                        <div className="col mb-4">
                            <select {...registerOtherFields('lote')} name="lote" id="lote" className={`form-control ${errorsOtherFields.lote ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija el lote del lote</option>
                                {lote.map((aux, i) => (
                                    <option key={i} value={aux.external_id}>
                                        {`${aux.fecha_produccion} ${aux.num_lote}`}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>lote</label>
                            <div className='alert alert-danger invalid-feedback'>{errorsOtherFields.lote?.message}</div>
                        </div>

            <div className="d-flex justify-content-center mt-4">
              <Link
                href="/lote"
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