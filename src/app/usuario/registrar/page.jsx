'use client';
import mensajes from '../../menu/Mensajes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { save_person } from '@/src/hooks/service_persona';
import Menu from '../../menu/menu';


export default function Page() {
    const router = useRouter();

    const validationShema = Yup.object().shape({
        apellido: Yup.string().required('ingrese el apellido del usuario'),
        nombre: Yup.string().required('ingrese el nombre del usuario'),
        cedula: Yup.string().required('ingrese la cedula del usuario'),
        edad: Yup.string().required('ingrese la edad del usuario'),
        estado: Yup.string().required('ingrese el estado del usuario')
    });

    const formOptions = { resolver: yupResolver(validationShema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendData = (data) => {
        console.log('Datos a enviar al backend:', data);

        var datos = {
            'nombres': data.nombre,
            'apellidos': data.apellido,
            'estado': data.estado,
            'cedula': data.cedula,
            'edad': data.edad
        };

        save_person(datos).then((info) => {
            console.log(info);
            if (info.code !== 200) {
                mensajes("estado no se pudo guardar", "Error", "error")
            } else {
                mensajes("estado guardado correctamente", "Informacion", "success")
                router.push("/usuario");
            }
        });
    };

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
                    Registrar Usuario
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
                    <form className="mota" onSubmit={handleSubmit(sendData)}>
                        <div className="row mb-4">
                            <div className="col">
                                <input
                                    {...register('nombre')}
                                    name="nombre"
                                    id="nombre"
                                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                    placeholder="Ingrese el nombre del usuario"
                                    autoComplete="off"
                                    style={{ fontSize: '25px' }}
                                />
                                <label className="form-label" style={{ color: '#889859' }}>
                                    nombre
                                </label>
                                <div className="alert alert-danger invalid-feedback">
                                    {errors.nombre?.message}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <input
                                {...register('apellido')}
                                name="apellido"
                                id="apellido"
                                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el apellido dl usuario"
                                autoComplete="off"
                                style={{ fontSize: '25px' }}
                            />
                            <label className="form-label" style={{ color: '#889859' }}>
                                apellido
                            </label>
                            <div className="alert alert-danger invalid-feedback">
                                {errors.apellido?.message}
                            </div>
                        </div>
                        <div className="col">
                            <input
                                {...register('cedula')}
                                name="cedula"
                                id="cedula"
                                className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
                                placeholder="Ingrese la cedula del usuario"
                                autoComplete="off"
                                style={{ fontSize: '25px' }}
                            />
                            <label className="form-label" style={{ color: '#889859' }}>
                                cedula
                            </label>
                            <div className="alert alert-danger invalid-feedback">
                                {errors.cedula?.message}
                            </div>
                        </div>
                        <div className="col">
                            <input
                                {...register('edad')}
                                name="edad"
                                id="edad"
                                className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                                placeholder="Ingrese la edad del usuario"
                                autoComplete="off"
                                style={{ fontSize: '25px' }}
                            />
                            <label className="form-label" style={{ color: '#889859' }}>
                                edad
                            </label>
                            <div className="alert alert-danger invalid-feedback">
                                {errors.edad?.message}
                            </div>
                        </div>
                        <div className="col mb-4">
                            <select {...register('estado')} name="estado" id="estado" className={`form-control ${errors.estado ? 'is-invalid' : ''}`} style={{ fontSize: '25px' }}>
                                <option value="">Elija el estado civil</option>
                                <option value="1">SOLTERO/A</option>
                                <option value="2">CASADO/A</option>
                                <option value="3">VIUDO/A</option>
                                <option value="4">DIVORCIADO/A</option>
                            </select>
                            <label className="form-label" style={{ color: '#889859' }}>estado</label>
                            <div className='alert alert-danger invalid-feedback'>{errors.estado?.message}</div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Link
                                href="/mota"
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