import {deviceResponseGET, IAltaDispositivoI} from '../models/device';
import {IResponseGeneral, ejecutaPeticion} from './api.services';

export async function altaDispositivos(token: string, data: IAltaDispositivoI): Promise<IResponseGeneral<[]>> {
    const resp = await ejecutaPeticion<[]>({
        metodo: 'post',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/devices',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data,
    });

    return resp;
}

export async function consultaDispositivos(token: string): Promise<IResponseGeneral<deviceResponseGET>> {
    const resp = await ejecutaPeticion<deviceResponseGET>({
        metodo: 'get',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/devices',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return resp;
}
