export interface deviceResponseGET {
    devices: IConsultaDispositivosGET[];
}

export interface IConsultaDispositivosGET {
    idDispositivo: number;
    nombreUsuario: string;
    idTipoDispositivo: number;
    serie: string;
    marca: string;
    modelo: string;
    descripcionVisual: string;
    descripcionFalla: string;
    fechaRegistro: string;
    idEstatusDispositivo: number;
}

export interface IAltaDispositivoI {
    idTipoDispositivo: number;
    serie: string;
    marca: string;
    modelo: string;
    descripcionVisual?: string;
    descripcionFalla: string;
    idCliente: number;
}
