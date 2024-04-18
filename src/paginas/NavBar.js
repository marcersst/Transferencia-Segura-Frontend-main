import { useTranslation } from 'react-i18next';
import { BotonPersonalizado } from '../helpers/BotonPersonalizado'
import { useContrato } from '../context/contextApp'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { navlinks } from '../componentes/constants';
import { menu } from '../componentes/assets';



export const NavBar = () => {


  const {signer, esInicio, conectarContrato, setActivo, contrato, activo } = useContrato();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [alternar, setalternar] = useState(false);

  let wallet = '';
  if (signer) {
    const walletAddress1 = signer;
    const caracteres1 = walletAddress1.substring(0, 6);
    const caracteres2 = walletAddress1.substring(walletAddress1.length - 4);
    wallet = `${caracteres1}...${caracteres2}`;
  }

  const buttonText = signer ? (!esInicio ? wallet : t('crear transferencia')) : t('conectar');
  const buttonStyle = signer ? 'bg-[#8c6dfd]' : 'bg-[#1dc071]';


  const mintearusdt=async ()=>{
    const contract = contrato.contract;
    contract.mintearUsdt();
  }

  return (
    <div className="md:flex-row w-full z-50 flex-col-reverse justify-between mb-[35px] gap-6">
  <div className="sm:flex hidden flex-row justify-end gap-4">

   {
    activo === "Crear Transferencias" ? (
    <BotonPersonalizado
      btnType="button"
      title={"Mint 100 USDT de prueba"}
      styles={buttonStyle}
      handleClick={mintearusdt}
    />
     ) : null
    }
 
    <BotonPersonalizado
      btnType="button"
      title={buttonText}
      styles={buttonStyle}
      handleClick={conectarContrato}
    />
  </div>
  <div className="sm:hidden flex justify-between items-center relative">
    <img 
      src={menu}
      alt="menu"
      className="w-[34px] h-[34px] object-contain cursor-pointer"
      onClick={() => setalternar((prev) => !prev)}
    />
    <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!alternar ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
      <ul className="mb-4">
        {navlinks.map((link) => (
          <li
            key={link.name}
            className={`flex p-4 ${setActivo === link.name && 'bg-[#3a3a43]'}`}
            onClick={() => {
              setActivo(link.name);
              setalternar(false);
              navigate(link.link);
            }}
          >
            <img 
              src={link.imgUrl}
              alt={link.name}
              className={`w-[24px] h-[24px] object-contain ${setActivo === link.name ? 'grayscale-0' : 'grayscale'}`}
            />
            <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${setActivo === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
              {link.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex mx-4">
     <button 
       type="button"
       className={`rounded-full bg-green-500 text-white py-2 px-2 mx-auto`}
      onClick={() => { if (!signer) {conectarContrato();} else {navigate("/crearTransferencias");} }}
      >
        {signer ? 'crear transferencia' : 'conectar'}
      </button>
    </div>
  </div>
</div>

  )

  
};

