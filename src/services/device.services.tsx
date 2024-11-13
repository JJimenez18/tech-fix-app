import {deviceResponseGET, IAltaDispositivoI, IDetallaFalla} from '../models/device';
import {IResponseGeneral, ejecutaPeticion} from './api.services';

export async function altaDispositivos(
    token: string,
    data: IAltaDispositivoI
): Promise<IResponseGeneral<{uuid: string}>> {
    const resp = await ejecutaPeticion<{uuid: string}>({
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

export async function consultaDispositivos(
    token: string,
    idDispositivo?: string
): Promise<IResponseGeneral<deviceResponseGET>> {
    const resp = await ejecutaPeticion<deviceResponseGET>({
        metodo: 'get',
        url: `http://localhost:8888/microservices/techfix-tracker/v1/${
            idDispositivo ? `device/${idDispositivo}` : 'devices'
        }`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return resp;
}

export async function registraFallasDispositivos(token: string, data: IDetallaFalla): Promise<IResponseGeneral<null>> {
    const resp = await ejecutaPeticion<null>({
        metodo: 'post',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/device/failures',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data,
    });
    return resp;
}
