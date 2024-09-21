/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosRequestConfig} from 'axios';
interface IResponseGeneral<T> {
    statusCode: number;
    data: T;
    message: string;
}
export async function ejecutaPeticion<T>(
	data: {
		url: string,
		data?: any,
	}
): Promise<IResponseGeneral<T>> {
    try {
        const peticion: AxiosRequestConfig = {
			data: JSON.stringify(data.data || {}),
			url: data.url,
		};
        const respuesta = await axios.request(peticion);
        return {
            statusCode: 200,
            data: respuesta.data,
            message: 'ok',
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            message: error.message,
            data: [] as T,
        };
    }
}
