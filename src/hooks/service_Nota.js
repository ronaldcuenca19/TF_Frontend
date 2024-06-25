import Cookies from 'js-cookie';
import {GET, POST, DELETE} from './Connection';

export async function  all_factura(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('factura', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_nota(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('nota', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}


export async function  save_informe_nota(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('informe_nota/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function save_nota(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('nota/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function delete_nota(external, valor){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await DELETE(`nota/delete/${external}/${valor}`, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_unidad(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('unidad', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function all_materia(external) {
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('materia', token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
    // TODO agarrar errores
}

export async function all_materia_docente(external) {
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`materia/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
    // TODO agarrar errores
}

export async function all_nota_materia(external) {
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`nota/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
    // TODO agarrar errores
}


export async function all_materia_unidad_nota(external, valor) {
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`nota_unidad_materia/${external}/${valor}`, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
    // TODO agarrar errores
}