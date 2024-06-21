import {POST} from './Connection';

export async function  login (data){
    let datos = null;
    try {
        datos = await POST('login', data);
    } catch (error) {
        //console.log(error.response.data);
        return error.response.data;
    }
    return datos.data;
}