'use client';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import mensajes from "../../menu/Mensajes";
import { save_foto_usuario } from '@/src/hooks/service_persona';

export default function Page({ params }) {
    const validationSchema = Yup.object().shape({
        nameArchivo: Yup.string().required('Ingrese una descripcion'),
        foto: Yup.mixed().required('Seleccione una imagen')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, watch, handleSubmit, formState } = useForm(formOptions);
    const router = useRouter();
    const { errors } = formState;

    const onSubmit = async (data) => {
        const autoId = params.external;
        console.log('ahdfaesbfibesjfvbesfvs',autoId.external);

        if (!autoId) {
            console.error("No se pudo obtener el ID del auto desde la URL");
            return;
        }

        console.log("Datos del formulario:", data);

        const formData = new FormData();
        formData.append('nameArchivo', data.nameArchivo);
        formData.append('external', autoId);
        formData.append('file', data.foto[0]);

        console.log("FormData:", formData);

        save_foto_usuario(formData).then((info) => {
            console.log(info);
            if (info.code === 200) {
                mensajes("Foto Cambiada", "MODIFICADO CON ÉXITO");
                router.push('/usuario');
            } else {
                mensajes("Error en inicio de sesion", info.msg, "error");
            }
        });
    };

    return (
        <div className="container" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '50px' }}>
            <h2 className="text-center">SUBIR FOTO DE PERFIL</h2>
            <div className="wrapper">
                <div className="d-flex flex-column">
                    <div className="content">
                        <div className='container-fluid'>
                            <form className="user" style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-outline mb-4">
                                            <label className="form-label">Nombre del archivo</label>
                                            <input {...register('nameArchivo')} name="nameArchivo" id="nameArchivo" className={`form-control ${errors.nameArchivo ? 'is-invalid' : ''}`} />
                                            <div className='alert alert-danger invalid-feedback'>{errors.nameArchivo?.message}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-outline mb-4">
                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label">Subir imagen</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Seleccionar una Foto"
                                                    {...register('foto', { required: true })}
                                                />
                                                <div className='alert alert-danger invalid-feedback'>{errors.foto?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                                            <a href="/autos" className="btn btn-danger btn-rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                                <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                            </a>
                                            <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
