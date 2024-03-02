import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContrato } from '../context/contextApp';
import { useTranslation } from 'react-i18next';
import { navlinks } from '../componentes/constants';
import { Icono } from '../helpers/Icono';
import i18n from '../componentes/idioma/i18n';




export const SideBar = () => {

  const navigate = useNavigate();
  const { activo, setActivo, idioma, setIdioma } = useContrato();
  const {  i18n } = useTranslation();

  const cambiarIdioma = ()=>{
     if(idioma=== "es"){
      setIdioma("en")
       i18n.changeLanguage('en');
      }else if (idioma ==="en"){
        setIdioma("es");
        i18n.changeLanguage("es"); 
      }
    };

    return (
      <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
          <div className="flex flex-col justify-center items-center gap-4">
            {navlinks.map((link) => (
              <Icono
                key={link.name}
                {...link}
                activo={activo}
                handleClick={() => {
                  if (!link.disabled) {
                    setActivo(link.name);
                    navigate(link.link);
                  }
                }}
              />
            ))}
          </div>
  
          <div className="relative inline-block">
            <button className="px-2 py-1 bg-gray-700 text-white rounded-full" id="language-button" onClick={cambiarIdioma}>
              {idioma === 'es' ? 'Español' : 'English'} 
            </button>
          </div>
        </div>
      </div>
    );
  };  

