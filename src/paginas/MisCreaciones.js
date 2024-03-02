import React, { useEffect, useState } from 'react';

import { useContrato } from '../context/contextApp';
import axios from "axios";
import { Cargando } from '../helpers/Cargando';
import { SinTransferencias } from '../helpers/SinTransferencias';
import { CajaTransferencia } from '../helpers/CajaTransferencia';
import { creation } from '../componentes/assets';
import { VentanaEmergente } from '../helpers/VentanaEmergente';

export const MisCreaciones = () => {
  const { signer } = useContrato();
  const [misCreaciones, setMisCreaciones] = useState([]);

  const [ventanaEmergenteVisible, setVentanaEmergenteVisible] = useState(false);
  const [transferenciaSeleccionada, setTransferenciaSeleccionada] = useState(null);

  const [estaCargando, setEstaCargando]=useState(true)

  const [contador, setContador]= useState(1)



  const abrirVentanaEmergente= (transferencia) =>{
    setTransferenciaSeleccionada(transferencia);
    setVentanaEmergenteVisible(true);
  }
  const cerrarVentanaEmergente= () =>{
    setTransferenciaSeleccionada(null);
    setVentanaEmergenteVisible(false);
  }



  useEffect(() => {
    const ObtenerTransferencias = async () => {
      if(signer){
        
        try {
          // Espera a que signer esté disponible
          
          const creador = await signer;
          // Convierte a minúsculas
          const creadorLowerCase = creador.toLowerCase();
  
          const respuesta = await axios.get(`https://backend-transferencia-segura-production.up.railway.app/api/transferencias/?creador=${creadorLowerCase}`);
  
          if (respuesta.data && respuesta.data.transferencias) {
            setMisCreaciones(respuesta.data.transferencias);
          }
          
          setEstaCargando(false)
          setContador(+1)
          console.log(respuesta.data); // Imprime la respuesta de la API
          console.log(contador)
        } catch (error) {
          console.error("Hubo un error al obtener datos desde la base de Mongo ", error);
          setEstaCargando(false)
        }
      }
      else{setEstaCargando(false)}
    };

    ObtenerTransferencias();
  }, [signer]); 
  // El estado se actualizará y este console.log reflejará el cambio
  console.log(misCreaciones);

  return (
    <>
    <div className="flex flex-wrap">
      {estaCargando ? (
        <Cargando/>
      ) : (
        <>
          {misCreaciones.length === 0 ? (
            <SinTransferencias />
          ) : (
            misCreaciones.map((transaccion, index) => (
              <div key={index} className="ml-1 mx-auto my-auto">
                <CajaTransferencia
                  img={<img className='w-24 mx-8' src={creation} alt="billetera" />}
                  transferencias={transaccion} // Asegúrate de pasar la prop correctamente
                  onClick={() => abrirVentanaEmergente(transaccion)}
                />
              </div>
            ))
            
          )}
        </>
      )}

      <VentanaEmergente
        visible={ventanaEmergenteVisible}
        onClose={cerrarVentanaEmergente}
        transaccion={transferenciaSeleccionada}
        esmisCreaciones={true}
      />
    </div>
  </>
);
};
