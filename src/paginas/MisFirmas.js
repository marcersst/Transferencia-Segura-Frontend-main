import React, { useEffect } from 'react';
import { useContrato } from '../context/contextApp';

export const MisFirmas = () => {
    const { obtenerTransaccion, verificarConfirmacion } = useContrato();

    useEffect(() => {
        const obtenerInfoTransaccion = async () => {
            const idTransaccion = 5; // ID de la transacción que deseas obtener
            const transaccion = await obtenerTransaccion(idTransaccion);
            console.log('Transacción:', transaccion);
            const confirmacion = await verificarConfirmacion(5,"0xe71949ec34538d7db0059291db7f987225b4103e");
            console.log('Confirmación:', confirmacion);
        };

        obtenerInfoTransaccion();
    }, [obtenerTransaccion, verificarConfirmacion]);

    return (
        <div>
            {}
        </div>
    );
}

