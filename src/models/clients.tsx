export interface clientsResponseGET {
    clients: clientsGET[];
}

export interface clientsGET {
    idUsuario: number;
    nombreUsuario: string;
    nombre: string;
    telefono: string;
    fechaRegistro: string;
}

export interface tiposDispositivosResponseGET {
    devicesTypes: ITiposDispositivosGET[];
}

export interface ITiposDispositivosGET {
    idTipo: number;
    descripcion: string;
}

export interface IClientesPOST {
    nombre: string;
    telefono: string;
}
