import React, { useEffect, useState } from 'react';

import {CargandoFirma} from "./CargandoFirma"

import { useTranslation } from 'react-i18next'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useContrato } from '../context/contextApp';


export const VentanaEmergente = ({ visible, onClose, transaccion, esMisFirmas }) => {
  const { t } = useTranslation(); 
  const { contrato, signer, verificarConfirmacion } = useContrato();
  const [confirmacionEnProgreso, setConfirmacionEnProgreso] = useState(false);
  const [confirmacionExitosa, setConfirmacionExitosa] = useState(false);
  const [errorConfirmacion, setErrorConfirmacion] = useState(null);
  const userAddress = signer;

  // estado para verificar si la transaccion se firmo
  const [yaFirmado, setYaFirmado] = useState(false);



  useEffect(() => {
    if (visible) {
      setConfirmacionEnProgreso(false);
      setConfirmacionExitosa(false);
      setErrorConfirmacion(null);
    }
  }, [visible]);

  useEffect(() => {
    async function verificarFirma() {
      if (esMisFirmas && transaccion) {
        try {
          // aca  accedo al mapeo de mi contrato para verificar si mi transaccion esta confirmada, esto me devuelve true o false
          const contract = contrato.contract;

          const estaFirmada = await contract.confirmaciones(transaccion.id, userAddress);
        
          setYaFirmado(estaFirmada);
        } catch (error) {
          console.error('Error al verificar si ya firmaste la transacción:', error);
        }
      }
    }

    verificarFirma();
  }, [esMisFirmas, contrato, transaccion, userAddress]);

  const firmarTransaccion = async () => {
    setConfirmacionEnProgreso(true);
    try {
      const transactionResponse = await contrato.contract.confirmarTransaccion(transaccion.id);
      await transactionResponse.wait();
      setConfirmacionExitosa(true);
      //actualizamos el estado de la firma a true 

      setYaFirmado(true);
    } catch (error) {
      setErrorConfirmacion(error.message);
    } finally {
      setConfirmacionEnProgreso(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col animate__animated animate__fadeIn">
      <div className="bg-gray-800 text-white rounded-lg p-4 mx-auto max-w-[80%] relative"> 
        <button className="bg-red-500 text-white rounded-lg p-2 cursor-pointer absolute top-2 right-2" onClick={onClose}>
          {t('Cerrar')}
        </button>

        {confirmacionEnProgreso && <CargandoFirma />}


        <h2 className="text-xl mb-4">
          <span className="font-bold underline">{t('Detalles_de_la_Transferencia')}:</span>
        </h2>
        <div>
          <p>
            <span className="font-bold">{t('Destino')}:</span> {transaccion.destino}
          </p>

          <p>
            <span className="font-bold">{t('Valor_en_ETH')}</span> {transaccion.valor}
          </p>

          <p>
            <span className="font-bold">{t('Firmante_1')}:</span>{' '}
            {transaccion.firmante1 === userAddress ? (
              <span className="text-green-500">{transaccion.firmante1}</span>
              ) : (
                transaccion.firmante1
                )}
          </p>
          <p>
            <span className="font-bold">{t('Firmante_2')}:</span>{' '}
            {transaccion.firmante2 === userAddress ? (
              <span className="text-green-500">{transaccion.firmante2}</span>
            ) : (
              transaccion.firmante2
              )}
          </p>
          <p>
            <span className="font-bold">{t('Fecha')}</span> {transaccion.fecha}
          </p>
          <p>
            <span className="font-bold">{t('Ejecutada')}</span> {verificarConfirmacion(transaccion.id,signer)=== true ? "SI" : "NO"}
          </p>
        </div>

        {!confirmacionEnProgreso && !confirmacionExitosa && !errorConfirmacion && esMisFirmas && (
          <button
          className={`${
            yaFirmado ? 'bg-green-500' : 'bg-blue-500'
          } text-white rounded-lg p-2 cursor-pointer absolute bottom-2 right-2`}
          onClick={firmarTransaccion}
          disabled={yaFirmado}
          >
            {yaFirmado ? t('Ya_Firmado_por_ti') : t('Firmar_Transaccion')}
          </button>
        )}
   {confirmacionExitosa && (<>
        <p className={`mt-4  text-green-500 "  ${!confirmacionExitosa}`}>
        <FontAwesomeIcon icon={faCircleCheck} size="lg" style={{color: "#00ff40",}} />
         {t('Transaccion_confirmada_exito')}
        </p>
      </>
      )}
      
      {errorConfirmacion && (
        <p className={`mt-4 text-red-500`}>
          <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#ff0000",}} />
          {t('Error_confirmacion_transaccion')}
        </p>
      )}
      </div>
    </div>
  );
};
