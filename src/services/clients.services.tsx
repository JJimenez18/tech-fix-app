import {clientsResponseGET, IClientesPOST, tiposDispositivosResponseGET} from '../models/clients';
import {ejecutaPeticion, IResponseGeneral} from './api.services';

export async function consultaClientes(token: string): Promise<IResponseGeneral<clientsResponseGET>> {
    const resp = await ejecutaPeticion<clientsResponseGET>({
        metodo: 'get',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/clients',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return resp;
}

export async function consultaTiposDispositivos(
    token: string
): Promise<IResponseGeneral<tiposDispositivosResponseGET>> {
    const resp = await ejecutaPeticion<tiposDispositivosResponseGET>({
        metodo: 'get',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/devices/types',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return resp;
}

export async function altaClientes(token: string, data: IClientesPOST): Promise<IResponseGeneral<clientsResponseGET>> {
    const resp = await ejecutaPeticion<clientsResponseGET>({
        metodo: 'post',
        url: 'http://localhost:8888/microservices/techfix-tracker/v1/clients',
        headers: {
			'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`,
        },
        data,
    });

    return resp;
}
