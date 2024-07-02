const alertaPrioridad = {
    "": 0,
    " ": 0,
    "Normal": 1,
    "Advertencia": 2,
    "Peligro": 3
};



export const ordenarPorFecha = (mensajes) => {
    return mensajes.sort((a, b) => {
        return new Date(a.fecha) - new Date(b.fecha);
    });
};

export const ordenarPorRemitenteNombre = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.remitenteNombre.toLowerCase() < b.remitenteNombre.toLowerCase()) {
            return -1;
        }
        if (a.remitenteNombre.toLowerCase() > b.remitenteNombre.toLowerCase()) {
            return 1;
        }
        return 0;
    });
};

export const ordenarPorDestinatarioNombre = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.destinatarionombre.toLowerCase() < b.destinatarionombre.toLowerCase()) {
            return -1;
        }
        if (a.destinatarionombre.toLowerCase() > b.destinatarionombre.toLowerCase()) {
            return 1;
        }
        return 0;
    });
};
export const ordenarPorSesion = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.sesion.toLowerCase() < b.sesion.toLowerCase()) {
            return -1;
        }
        if (a.sesion.toLowerCase() > b.sesion.toLowerCase()) {
            return 1;
        }
        return 0;
    });
};

export const ordenarPorAsignatura = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.asignatura.toLowerCase() < b.asignatura.toLowerCase()) {
            return -1;
        }
        if (a.asignatura.toLowerCase() > b.asignatura.toLowerCase()) {
            return 1;
        }
        return 0;
    });
};

export const ordenarPorVistosPrimero = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (a.visto && !b.visto) {
            return -1;
        }
        if (!a.visto && b.visto) {
            return 1;
        }
        return 0;
    });
};

export const ordenarPorPendientesPrimero = (mensajes) => {
    return mensajes.sort((a, b) => {
        if (!a.visto && b.visto) {
            return -1;
        }
        if (a.visto && !b.visto) {
            return 1;
        }
        return 0;
    });
};

export const ordenarPorMayorPeligrosidad = (mensajes) => {
    return mensajes.sort((a, b) => {
        return alertaPrioridad[b.alerta] - alertaPrioridad[a.alerta];
    });
};

export const ordenarPorMenorPeligrosidad = (mensajes) => {
    return mensajes.sort((a, b) => {
        return alertaPrioridad[a.alerta] - alertaPrioridad[b.alerta];
    });
};

