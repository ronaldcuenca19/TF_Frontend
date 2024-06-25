'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import mensajes from '../menu/Mensajes';
import Menu from '../menu/menu';
import { all_unidad, save_nota, all_materia_docente, delete_nota, all_nota_materia, all_materia_unidad_nota } from '@/src/hooks/service_Nota';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

export default function Page() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [selectedRowNames, setSelectedRowNames] = useState('');
    const [selectedColumnNames, setSelectedColumnNames] = useState('');
    const [selectedRowSurnames, setSelectedRowSurnames] = useState('');
    const [selectedColumnSurnames, setSelectedColumnSurnames] = useState('');
    const [selectedRowNotas, setSelectedRowNotas] = useState('');
    const [selectedColumnNotas, setSelectedColumnNotas] = useState('');
    const [columns, setColumns] = useState([]);
    const [materia, setMateria] = useState([]);
    const [unidad, setUnidad] = useState([]);
    const [selectedMateriaId, setSelectedMateriaId] = useState(null);
    const [selectedUnidadId, setSelectedUnidadId] = useState(null);
    const [obt, setObt] = useState(false);

    const [names, setNames] = useState([]);
    const [surnames, setSurnames] = useState([]);
    const [nota, setNota] = useState([]);
    const [concatenatedData, setConcatenatedData] = useState([]);

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        unidad: Yup.string().required('Seleccione la unidad para ingresar las notas'),
        materia: Yup.string().required('Seleccione la materia para ingresar las notas')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const extPermitidas = ['xlsx', 'xls'];
        const puntoExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (!extPermitidas.includes(puntoExtension)) {
            mensajes("Solo archivos Excel", "Advertencia", "warning");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setData(jsonData);
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    const handleRowChangeNames = (e) => {
        const rowIndex = parseInt(e.target.value, 10) - 1;
        setSelectedRowNames(rowIndex);
        if (data.length > 0 && rowIndex >= 0) {
            const rowColumns = data[rowIndex];
            setColumns(rowColumns);
            setSelectedColumnNames('');
        }
    };

    const handleRowChangeSurnames = (e) => {
        const rowIndex = parseInt(e.target.value, 10) - 1;
        setSelectedRowSurnames(rowIndex);
        if (data.length > 0 && rowIndex >= 0) {
            const rowColumns = data[rowIndex];
            setColumns(rowColumns);
            setSelectedColumnSurnames('');
        }
    };

    const handleRowChangeNotas = (e) => {
        const rowIndex = parseInt(e.target.value, 10) - 1;
        setSelectedRowNotas(rowIndex);
        if (data.length > 0 && rowIndex >= 0) {
            const rowColumns = data[rowIndex];
            setColumns(rowColumns);
            setSelectedColumnNotas('');
        }
    };

    const handleColumnChangeNames = (e) => {
        setSelectedColumnNames(parseInt(e.target.value, 10));
    };

    const handleColumnChangeSurnames = (e) => {
        setSelectedColumnSurnames(parseInt(e.target.value, 10));
    };

    const handleColumnChangeNotas = (e) => {
        setSelectedColumnNotas(parseInt(e.target.value, 10));
    };

    const extractColumnDataByType = (type) => {
        if (data.length > 0) {
            let selectedRow, selectedColumn, setFunction;
            switch (type) {
                case 'names':
                    selectedRow = selectedRowNames;
                    selectedColumn = selectedColumnNames;
                    setFunction = setNames;
                    break;
                case 'surnames':
                    selectedRow = selectedRowSurnames;
                    selectedColumn = selectedColumnSurnames;
                    setFunction = setSurnames;
                    break;
                case 'notas':
                    selectedRow = selectedRowNotas;
                    selectedColumn = selectedColumnNotas;
                    setFunction = setNota;
                    break;
                default:
                    break;
            }
            if (selectedRow !== '' && selectedColumn !== '') {
                const columnData = data.slice(selectedRow).map(row => row[selectedColumn] || '').filter(cell => cell !== '');
                setFunction(columnData);
            }
        }
    };

    const handleMateriaChange = (e) => {
        setSelectedMateriaId(e.target.value);
    };

    const handleUnidadChange = (e) => {
        setSelectedUnidadId(e.target.value);
    };


    useEffect(() => {
        setConcatenatedData(names.map((name, index) => `${name} ${surnames[index] || ''}`));
    }, [names, surnames]);

    useEffect(() => {
        const external = Cookies.get('external');
        if (!obt) {
            all_materia_docente(external).then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setMateria(info.datos);
                    setSurnames('')
                    setObt(true);
                } else {
                    mensajes("Error al listar materias", "Error", "error");
                }
            });
        }
    }, [obt]);

    useEffect(() => {
        if (!obt) {
            all_unidad().then((info) => {
                console.log(info);
                if (info.code === 200) {
                    setUnidad(info.datos);
                    setObt(true);
                } else {
                    mensajes("Error al listar unidades", "Error", "error");
                }
            });
        }
    }, [obt]);

    const sendData = async (data) => {
        console.log('Datos a enviar al backend:', data);

        const notasValidas = nota.every(n => !isNaN(n) && parseFloat(n) >= 0 && parseFloat(n) <= 10);
        if (!notasValidas) {
            mensajes("Formato de nota incorrecto. Las notas deben ser números entre 0 y 10.", "Error", "error");
            return;
        }

        if (names.length !== nota.length) {
            mensajes("El número de nombres, apellidos y notas seleccionados no coincide", "Error", "error");
            return;
        }

        let longitud = 0;

        try {
            const info = await all_materia_unidad_nota(selectedMateriaId, selectedUnidadId);

            if (info.code === 200) {
                longitud = info.datos.length;

                if (longitud > 0) {
                    mensajes("Notas Actualizadas", "Informacion", "success");
                    try {
                        const info = await delete_nota(selectedMateriaId, selectedUnidadId);
                        console.log(info);
                        if (info.code !== 200) {
                            mensajes("Nota no se pudo eliminar", "Error", "error");
                            return false;
                        }
                        else {
                            const alumnos = names.map((name, index) => {

                                return {
                                    'nombre_alumno': `${name} ${surnames[index]}`,
                                    'nota_total': parseFloat(nota[index]),
                                    'id_unidad': data.unidad,
                                    'id_materia': data.materia
                                };
                            });

                            const saveAlumnos = async () => {
                                for (const alumno of alumnos) {
                                    try {
                                        const info = await save_nota(alumno);
                                        console.log(info);
                                        if (info.code !== 200) {
                                            mensajes("Nota no se pudo guardar", "Error", "error");
                                            return false;
                                        }
                                    } catch (error) {
                                        console.error("Error al guardar alumno:", error);
                                        mensajes("Error al guardar alumnos", "Error", "error");
                                        return false;
                                    }
                                }
                                return true;
                            };

                            const success = await saveAlumnos();
                            if (success) {
                                mensajes("Productos guardados correctamente", "Informacion", "success");
                                router.push("/producto");
                            }
                        }
                    } catch (error) {
                        console.error("Error al guardar alumno:", error);
                        mensajes("Error al guardar alumnos", "Error", "error");
                        return false;
                    }
                } else {
                    const alumnos = names.map((name, index) => {
                        return {
                            'nombre_alumno': `${name} ${surnames[index]}`,
                            'nota_total': parseFloat(nota[index]),
                            'id_unidad': data.unidad,
                            'id_materia': data.materia
                        };
                    });

                    const saveAlumnos = async () => {
                        for (const alumno of alumnos) {
                            try {
                                const info = await save_nota(alumno);
                                console.log(info);
                                if (info.code !== 200) {
                                    mensajes("Nota no se pudo guardar", "Error", "error");
                                    return false;
                                }
                            } catch (error) {
                                console.error("Error al guardar alumno:", error);
                                mensajes("Error al guardar alumnos", "Error", "error");
                                return false;
                            }
                        }
                        return true;
                    };

                    const success = await saveAlumnos();
                    if (success) {
                        mensajes("Productos guardados correctamente", "Informacion", "success");
                        router.push("/producto");
                    }
                }
            } else {
                mensajes("Error al listar unidades", "Error", "error");
            }
        } catch (error) {
            console.error("Error al verificar notas existentes:", error);
            mensajes("Error al verificar notas existentes", "Error", "error");
        }

    };


    useEffect(() => {
        if (selectedRowNames !== '' && selectedColumnNames !== '') {
            extractColumnDataByType('names');
        }
    }, [selectedRowNames, selectedColumnNames]);

    useEffect(() => {
        if (selectedRowSurnames !== '' && selectedColumnSurnames !== '') {
            extractColumnDataByType('surnames');
        }
    }, [selectedRowSurnames, selectedColumnSurnames]);

    useEffect(() => {
        if (selectedRowNotas !== '' && selectedColumnNotas !== '') {
            extractColumnDataByType('notas');
        }
    }, [selectedRowNotas, selectedColumnNotas]);

    return (
        <div style={{ marginTop: '70px' }}>
            <Menu />
            <h1 className="text-center" style={{ fontSize: '50px' }}>Carga de Notas</h1>
            <div className="d-flex justify-content-center">
                <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            </div>
            {data.length > 0 && (
                <>
                   <div className="row justify-content-center">
    <div className="col-md-5 mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <fieldset>
            <legend style={{ color: '#db3210', textAlign: 'center' }}>Materia</legend>
            {materia.map((aux, i) => (
                <div key={i} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id={`materia-${i}`}
                        value={aux.external_id}
                        {...register('materia')}
                        onChange={handleMateriaChange}
                        checked={selectedMateriaId === aux.external_id}
                    />
                    <label className="form-check-label" htmlFor={`materia-${i}`}>
                        {aux.nombre}
                    </label>
                </div>
            ))}
            <div className='alert alert-danger invalid-feedback'>{errors.materia?.message}</div>
        </fieldset>
    </div>

    <div className="col-md-5 mb-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <fieldset>
            <legend style={{ color: '#db3210', textAlign: 'center' }}>Unidad</legend>
            {unidad.map((aux, i) => (
                <div key={i} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id={`unidad-${i}`}
                        value={aux.external_id}
                        {...register('unidad')}
                        onChange={handleUnidadChange}
                        checked={selectedUnidadId === aux.external_id}
                    />
                    <label className="form-check-label" htmlFor={`unidad-${i}`}>
                        {aux.nombre}
                    </label>
                </div>
            ))}
            <div className='alert alert-danger invalid-feedback'>{errors.unidad?.message}</div>
        </fieldset>
    </div>
</div>

                </>
            )}

            {data.length > 0 && (

                <div>
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}>Seleccionar Nombres</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="mb-3">
                            <label className="form-label">Fila:</label>
                            <select onChange={handleRowChangeNames} value={selectedRowNames + 1} className="form-select">
                                <option value="" disabled>Seleccione una fila</option>
                                {data.map((_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        {columns.length > 0 && (
                            <div className="mb-3">
                                <label className="form-label">Columna:</label>
                                <select onChange={handleColumnChangeNames} value={selectedColumnNames} className="form-select">
                                    <option value="" disabled>Seleccione una columna</option>
                                    {columns.map((header, index) => (
                                        <option key={index} value={index}>{header || `Columna ${index + 1}`}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

            )}

            {names.length > 0 && (
                <div>
                    <h2>Nombres:</h2>
                    <p>{names.join(', ')}</p>
                </div>
            )}

            {data.length > 0 && (
                <div>
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}>Seleccionar Apellidos</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="mb-3">
                            <label className="form-label">Fila:</label>
                            <select onChange={handleRowChangeSurnames} value={selectedRowSurnames + 1} className="form-select">
                                <option value="" disabled>Seleccione una fila</option>
                                {data.map((_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        {columns.length > 0 && (
                            <div className="mb-3">
                                <label className="form-label">Columna:</label>
                                <select onChange={handleColumnChangeSurnames} value={selectedColumnSurnames} className="form-select">
                                    <option value="">Seleccione una columna</option>
                                    {columns.map((header, index) => (
                                        <option key={index} value={index}>{header !== undefined ? header : ''}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                    </div>
                </div>
            )}
            {surnames.length > 0 && (
                <div>
                    <h2>Apellidos:</h2>
                    <p>{surnames.join(', ')}</p>
                </div>
            )}

            {data.length > 0 && (
                <div>
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}>Seleccionar Notas</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="mb-3">
                            <label className="form-label">Fila:</label>
                            <select onChange={handleRowChangeNotas} value={selectedRowNotas + 1} className="form-select">
                                <option value="" disabled>Seleccione una fila</option>
                                {data.map((_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        {columns.length > 0 && (
                            <div className="mb-3">
                                <label className="form-label">Columna:</label>
                                <select onChange={handleColumnChangeNotas} value={selectedColumnNotas} className="form-select">
                                    <option value="" disabled>Seleccione una columna</option>
                                    {columns.map((header, index) => (
                                        <option key={index} value={index}>{header || `Columna ${index + 1}`}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {nota.length > 0 && (
                <div>
                    <h2>Notas:</h2>
                    <p>{nota.join(', ')}</p>
                </div>
            )}


            {data.length > 0 && (
                <div className="row justify-content-center" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleSubmit(sendData)} className="btn btn-success" style={{
                        backgroundColor: '#ffa500', // Fondo color naranja
                        color: "black", // Color del texto en negro
                        fontSize: '16px', // Tamaño de fuente ajustado, puedes cambiar el valor según necesites
                        padding: '10px 20px', // Ajuste opcional del padding
                    }}>Guardar</button>
                </div>
            </div>
            
            )}
        </div>
    );
}
