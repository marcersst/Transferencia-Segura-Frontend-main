import React from 'react'
import { useTranslation } from 'react-i18next';
import { useContrato } from '../context/contextApp';

export const SinTransferencias = () => {
  const { signer } = useContrato();
  const { t } = useTranslation();
  const sinConectar= signer===""

  return ( 
    <div className="h-screen flex flex-col items-center">
      <div style={{ backgroundColor: '#27272a', color: 'white', padding: '30px', borderRadius: '50px' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {signer ? t("Sin_Transferencias") : t("sinconectar")}
        </span>
      </div>
    </div>
  );
}
