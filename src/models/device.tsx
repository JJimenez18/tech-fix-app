export enum ETiposUsuario {
    ADMINISTRADOR = '1',
    TECNICO = '5',
}
export interface deviceResponseGET {
    devices: IConsultaDispositivosGET[];
    fallas: IConsultaFallasDispositivos[];
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
    idCliente: number;
    nombreCliente: string;
    descTipoDispositivo: string;
}
export interface IConsultaFallasDispositivos {
    idDispositivo: string;
    idTecnicoRegistra: string;
    descripcion: string;
    reparacionSugerida: string;
    fechaModificacion: string;
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

export interface IDetallaFalla {
    folio: string;
    idTecnicoRegistra: string;
    fallas: IDetalleAlta[];
}

export interface IDetalleAlta {
    descripcion: string;
    reparacionSugerida: string;
}
