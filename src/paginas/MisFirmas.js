import React, { useEffect, useState } from 'react';

import { useContrato } from '../context/contextApp';
import axios from "axios";
import { Cargando } from '../helpers/Cargando';
import { SinTransferencias } from '../helpers/SinTransferencias';
import { CajaTransferencia } from '../helpers/CajaTransferencia';
import { creation } from '../componentes/assets';
import { VentanaEmergente } from '../helpers/VentanaEmergente';

export const MisFirmas = () => {
  const { signer } = useContrato();
  const [misFirmas, setmisFirmas] = useState([]);

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
          
          const firmante = await signer;
          const firmanteLowerCase = firmante.toLowerCase();
  
          const respuesta = await axios.get(`https://backend-transferencia-segura-production.up.railway.app/api/transferencias/?firmantes=${firmanteLowerCase}`);
  
          if (respuesta.data && respuesta.data.transferencias) {
            setmisFirmas(respuesta.data.transferencias);
          }
          else {setmisFirmas([])}
          
          setEstaCargando(false)
        } catch (error) {
          console.error("Hubo un error al obtener datos desde la base de Mongo ", error);
          setEstaCargando(false)
        }
      }
      else{
        setmisFirmas([])
        setEstaCargando(false)}
    };

    ObtenerTransferencias();
  }, [signer]); 


  return (
    <>
    <div className="flex flex-wrap">
      {estaCargando ? (
        <Cargando/>
      ) 
      : 
      (
        <>
          {misFirmas.length === 0 ? (
            <SinTransferencias />
          ) 
          :
          (
            misFirmas.map((transaccion, index) => (
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
        esMisFirmas={true}
      />
    </div>
  </>
);
};
