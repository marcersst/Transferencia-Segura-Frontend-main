import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContrato } from '../context/contextApp';
import { ingles, español } from "../componentes/assets"

export const Inicio = () => {


  const {setActivo, idioma}= useContrato();
  const {t}= useTranslation();

  const [key, setKey]=useState(0)// estado para forzar renderizado cuando se cambia el idioma
  

  useEffect(()=>{
    setActivo("Inicio");
    setKey(key+1);
  }, [idioma]);




  return (
    <div key={key} className=" bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 animate__animated animate__fadeIn m-2">
      <div className=" text-center">
        <h1 className="font-epilogue font-bold text-xl text-white rounded-full mb-4 p-4 bg-[#3a3a43] rounded-[10px]">
          {t("Transferencia_Segura_App?")}
        </h1>
      </div>
      <div className="flex flex-col   items-center p-[16px] bg-[#3a3a43] rounded-[10px] ">
        <div className="flex-grow">
          <p className='font  text-xl text-white mb-5'>
            {t("Explicacion")}
          </p>
        </div>
        <div className="">
          <video width="800" height="800" controls className="rounded-lg">
            <source src={idioma === 'es' ? español : ingles} type="video/mp4" />
            <p className="font-epilogue text-sm text-white mb-4">
              {t("Tu_navegador_no_admite_el_elemento_de_video")}
            </p>
          </video>
        </div>
      </div>
    </div>
  );
};