import {ejecutaPeticion} from './api.services';

export async function validaToken(token: string): Promise<number> {
    const {statusCode} = await ejecutaPeticion({
        metodo: 'post',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/oauth2/verifica/token',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return statusCode;
}
