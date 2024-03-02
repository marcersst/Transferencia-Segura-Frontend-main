import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useContrato } from '../context/contextApp';

export const  CajaTransferencia=({ transferencias, onClick, img })=> {
   
  const {signer, verificarConfirmacion}= useContrato();  
  const { t } = useTranslation(); 
  const direccionRecortada =
    transferencias.destinatario.slice(0, 4) + '...' + transferencias.destinatario.slice(-4);



  return (
    <div
      className="bg-purple-100 rounded p-3 shadow-lg mx-2 my-1 inline-block cursor-pointer transition-transform hover:scale-105 hover:bg-purple-300 animate__animated animate__fadeInDown"
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
        {verificarConfirmacion(transferencias.id,signer)=== true ? (
          <FontAwesomeIcon icon={faCircleCheck} size="xl" style={{ color: '#043503' }} />
        ) : (
          <FontAwesomeIcon icon={faCircleXmark} size="xl" style={{ color: '#fb0404' }} />
        )}
      </p>
    </div>
  );
}

