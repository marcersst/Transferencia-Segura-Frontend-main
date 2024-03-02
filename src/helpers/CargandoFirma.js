import React from 'react'
import { useTranslation } from 'react-i18next';

import { loader } from '../componentes/assets'; 

export const CargandoFirma = () => {
  const {t}= useTranslation();
  return (
    <div className="fixed inset-1  bg-[rgba(0,0,0,0.8)] flex items-center justify-center flex-col animate__animated animate__fadeIn">
      <img src={loader} alt="loader" className="w-[200px] h-[200px]"/>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">{t("Firmando")} <br /> {t("Espere")}</p>
    </div>
  )
}

