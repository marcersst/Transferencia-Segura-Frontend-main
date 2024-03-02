import { Destino, Firma, Smart } from '../componentes/assets';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BotonImagen } from '../helpers/BotonImagen';

export const MisTransferencias = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className='animate__animated animate__bounceIn'>
      <Link to="/miscreaciones">
        <BotonImagen
          imagenSrc={Smart}
          imagenAlt="Imagen 2"
          titulo={t('Transeferencias_Creadas')}
        />
      </Link>

      <Link to="/misfirmas">
        <BotonImagen
          imagenSrc={Firma}
          imagenAlt="Imagen 1"
          titulo={t('Tus_Firmas')} 
        />
      </Link>
      
      <Link to="/haciami">
        <BotonImagen
          imagenSrc={Destino}
          imagenAlt="Imagen 2"
          titulo={t('Transeferencias_hacia_mi')} 
        />
      </Link>
    </div>
  );
}
