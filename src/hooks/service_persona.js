import Cookies from 'js-cookie';
import {GET, POST} from './Connection';

export async function  all_person(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('persona', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  all_client(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('persona/cliente', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  get_client(external){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET(`persona/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_person(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('persona/save/cliente', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  update_person(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('persona/update/cliente', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  get_person(){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await GET('persona/<external>', token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}

export async function  save_foto_usuario(data){
    let datos = null;

    try {
        const token = await Cookies.get('token');
        datos = await POST('usuario/foto', data, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos.data;
    // TODO agarrar errores
}