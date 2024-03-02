import { useTranslation } from 'react-i18next';
import { BotonPersonalizado } from '../helpers/BotonPersonalizado'
import { useContrato } from '../context/contextApp'



export const NavBar = () => {

  const {signer, esInicio, conectarContrato}= useContrato()
  const { t } = useTranslation();

  const walletAddress1 = signer;
  const caracteres1 = walletAddress1.substring(0, 6);
  const caracteres2 = walletAddress1.substring(walletAddress1.length - 4);
  const wallet = `${caracteres1}...${caracteres2}`;


  const buttonText = signer ? (!esInicio ? wallet : t('crear transferencia')) : t('conectar');
  const buttonStyle = signer ? 'bg-[#8c6dfd]' : 'bg-[#1dc071]';


  return (
    <div className="md:flex-row w-full z-50 flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <BotonPersonalizado
          btnType="button"
          title={buttonText}
          styles={buttonStyle}
          handeClick={conectarContrato}
        />
      </div>

    </div>
  );
};
