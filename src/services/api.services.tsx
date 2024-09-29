/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosRequestConfig} from 'axios';
export interface IResponseGeneral<T> {
    statusCode: number;
    data: T;
    message: string;
}

export async function ejecutaPeticion<T>(
	data: {
        metodo: string,
		url: string,
		data?: any,
        headers?: any,
	}
): Promise<IResponseGeneral<T>> {
    try {
        const peticion: AxiosRequestConfig = {
			data: JSON.stringify(data.data || {}),
			url: data.url,
            method: data.metodo,
            headers: data.headers || {}
		};
        const respuesta = await axios.request(peticion);
        return {
            statusCode: 200,
            data: respuesta.data.resultado,
            message: 'ok',
        };
    } catch (error: any) {
        console.log(error.response)
        return {
            statusCode: error.status || 500,
            message: error.response?.data?.detalles?.toString() || error.message,
            data: [] as T,
        };
    }
}
