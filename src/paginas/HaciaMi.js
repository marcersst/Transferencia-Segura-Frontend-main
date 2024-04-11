import React, { useEffect, useState } from 'react';

import { useContrato } from '../context/contextApp';
import axios from "axios";
import { Cargando } from '../helpers/Cargando';
import { SinTransferencias } from '../helpers/SinTransferencias';
import { CajaTransferencia } from '../helpers/CajaTransferencia';
import { creation } from '../componentes/assets';
import { VentanaEmergente } from '../helpers/VentanaEmergente';

export const HaciaMi = () => {
  const { signer } = useContrato();
  const [haciaMi, sethaciaMi] = useState([]);

  const [ventanaEmergenteVisible, setVentanaEmergenteVisible] = useState(false);
  const [transferenciaSeleccionada, setTransferenciaSeleccionada] = useState(null);

  const [estaCargando, setEstaCargando]=useState(true)




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
          
          const destinatario = await signer;
          const destinatarioLowerCase = destinatario.toLowerCase();
          console.log(destinatarioLowerCase)
  
          const respuesta = await axios.get(`http://transferenciasegura.sa-east-1.elasticbeanstalk.com/api/transferencias/?destino=${destinatarioLowerCase}`);
  
          if (respuesta.data && respuesta.data.transferencias) {
            sethaciaMi(respuesta.data.transferencias);
          }
          
          setEstaCargando(false)
        } catch (error) {
          console.error("Hubo un error al obtener datos desde la base de Mongo ", error);
          setEstaCargando(false)
        }
      }
      else{setEstaCargando(false)}
    };

    ObtenerTransferencias();
  }, [signer]); 

  return (
    <>
    <div className="flex flex-wrap justify-start">
      {estaCargando ? (
        <Cargando/>
      ) : (
        <>
          {haciaMi.length === 0 ? (
            <SinTransferencias />
          ) : (
            haciaMi.map((transaccion, index) => (
              <div key={index} className="mx-2 my-2">
                <CajaTransferencia
                  img={<img className='w-24 mx-8' src={creation} alt="billetera" />}
                  transferencias={transaccion} 
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
      />
    </div>
  </>
);
};
