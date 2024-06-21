import Cookies from 'js-cookie';
import {GET, POST} from './Connection';

export async function  all_producto(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('producto', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_producto(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('producto/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_lote(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('lote/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_lote(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('lote', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_lote_producto(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('lote_producto/save', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_lote_producto(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('lote_producto', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  cambiarEstado(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('lote_producto/cambiarEstado', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_foto_producto(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('foto/producto', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  update_producto(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('producto/update', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  get_product(external){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`producto/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_product_caducado(external){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('producto/caducado', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_product_por_caducar(external){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('producto/apunto', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_product_fresco(external){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('producto/fresco', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}