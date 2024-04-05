import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useContrato } from '../context/contextApp';

export const  CajaTransferencia=({ transferencias, onClick, img })=> {
   
  const {signer,contrato}= useContrato();  
  const { t } = useTranslation(); 
  const direccionRecortada =
    transferencias.destinatario.slice(0, 4) + '...' + transferencias.destinatario.slice(-4);

  const [ejecutada, setEjecutada]= useState(null)

    useEffect(() => {
      async function verificarEjecucion() {
        if (transferencias) {
          try {
            // aca  accedo al mapeo de mi contrato para verificar si mi transferencias esta confirmada, esto me devuelve true o false
            const contract = contrato.contract;
            const transaccion = await contract.transacciones(transferencias.id);
            setEjecutada(transaccion.ejecutada);
          } catch (error) {
            console.error('Error al verificar si ya firmaste la transacción:', error);
          }
        }
      }
  
      verificarEjecucion();
    }, [ contrato, transferencias]);
    


  return (
    <div
      className="bg-purple-100 rounded p-3 shadow-lg mx-2 my-2 cursor-pointer transition-transform hover:bg-purple-300 animate__animated animate__fadeInDown"
      style={{ width: '180px' }} 
      onClick={() => onClick(transferencias)}
    >
      {img}
      <div className="flex justify-center items-center"></div>
      <h3 className="text-xl font-semibold">{direccionRecortada}</h3>
      <p className="text-gray-600">{t('Valor_en_ETH')} {transferencias.valor}</p>
      <p className="text-gray-600">{t('Fecha')} {transferencias.fecha}</p>

      <p>
        {t('Ejecutada')} {' '}
        {ejecutada ? (
          <FontAwesomeIcon icon={faCircleCheck} size="xl" style={{ color: '#043503' }} />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: '#fb0404' }} />
        )}
      </p>
    </div>
  );
}

