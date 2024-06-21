import Cookies from 'js-cookie';
import {GET, POST} from './Connection';

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

export async function  save_factura(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('factura/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_factura_detalle(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('detalle_factura/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_detalle_factura(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('detalle_factura', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function all_detalle_factura_especifico(external) {
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`detalle_factura/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return { "code": 500 };
    }
    return datos.data;
    // TODO agarrar errores
}