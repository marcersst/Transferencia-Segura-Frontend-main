import React, { useEffect, useState } from 'react';
import { useContrato } from '../context/contextApp';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Formulario } from '../helpers/Formulario';
import { BotonPersonalizado } from '../helpers/BotonPersonalizado';
import { CargandoFirma } from '../helpers/CargandoFirma';


export const CrearTransferencias = () => {
  const { contrato, setActivo, signer, contratousdt, conectarContratoUSDT } = useContrato();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const [cargando1, setCargando1] = useState(false);
  const [moneda, setMoneda] = useState('BNB');
  const [destino, setDestino] = useState('');
  const [firmante1, setFirmante1] = useState('');
  const [firmante2, setFirmante2] = useState('');
  const [valor, setValor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [transaccionExitosa, setTransaccionExitosa] = useState(null);

  const verenTransacciones = () => {
    navigate('/miscreaciones');
    setActivo('Mis Transferencias');
  };

  const crearTransferencia = async (e) => {
    e.preventDefault();

    try {
      if (!signer) {
        console.error(t('No_estas_conectado_a_MetaMask'));
        return;
      }

      const contract = contrato.contract;
      const destinoAddress = ethers.utils.getAddress(destino);
      const firmante1Address = ethers.utils.getAddress(firmante1);
      const firmante2Address = ethers.utils.getAddress(firmante2);
      const addressCreador = signer;

      setCargando1(true);

      let transaccionRespuesta;

      if (moneda === 'BNB') {
        transaccionRespuesta = await contract.crearTransferenciaBnb(
          destinoAddress,
          firmante1Address,
          firmante2Address,
          { value: ethers.utils.parseEther(valor) }
        );
      } else if (moneda === 'USDT') {

        const valorEnWei = ethers.utils.parseUnits(valor, 6);

        const tx = await contratousdt.usdt.approve("0x5924A5Aa0B825754b83692ed894CfA35d494626D", valorEnWei);
        await tx.wait();




        transaccionRespuesta = await contract.crearTransferenciaUsdt(
          destinoAddress,
          firmante1Address,
          firmante2Address,
          valorEnWei
        );
      } else {
        throw new Error('Moneda no válida');
      }

      await transaccionRespuesta.wait();

      setCargando1(false);

      setDestino('');
      setFirmante1('');
      setFirmante2('');
      setValor('');
      setDescripcion('');

      const transaccionesCount = await contract.contadorTransferencias();
      const idTransaccion = transaccionesCount.toNumber();

      const response = await fetch(
        'https://backend-transferencia-segura-production.up.railway.app/api/transferencias/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idTransaccion - 1,
            valor,
            destinatario: destinoAddress.toLowerCase(),
            firmante1: firmante1Address.toLowerCase(),
            firmante2: firmante2Address.toLowerCase(),
            creador: addressCreador.toLowerCase(),
            ejecutada: false,
            fecha: new Date().toLocaleString(),
            descripcion: descripcion,
            moneda: moneda
          }),
        }
      );

      setTransaccionExitosa({
        valor,
        destino: destinoAddress,
        firmante1: firmante1Address,
        firmante2: firmante2Address,
      });

      if (!response.ok && transaccionExitosa) {
        throw new Error(
          'Error al enviar datos a la base de datos, la transferencia se creó pero hubo un problema con la base de datos. Por favor, contacta al soporte.'
        );
      }
    } catch (error) {
      console.error(t('Error_al_crear_la_transaccion'),error);
      setCargando1(false);
    }
  };

  const handleMonedaChange = (e) => {
    setMoneda(e.target.value);
  };



  useEffect(() => {
    conectarContratoUSDT()
  }, [])
  

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 animate__animated animate__fadeIn ">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[48px] text-white">
          {t('Crear_Transferencia_Segura')}
        </h1>
      </div>

      <form onSubmit={crearTransferencia} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div>
        <label htmlFor="moneda" className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
             {t('moneda')} 
        </label>
          <select
            id="moneda"
            name="moneda"
            value={moneda}
            onChange={handleMonedaChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="BNB">BNB</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <Formulario
            labelName={t('valor')}
            placeholder={t('Valor_Eth')}
            inputType="number"
            value={valor}
            handleChange={(e) => setValor(e.target.value)}
          />
          <Formulario
            labelName={t('Firmante_1')}
            placeholder={t('Ingrese_Direccion_Firmante_1')}
            inputType="text"
            value={firmante1}
            handleChange={(e) => setFirmante1(e.target.value)}
          />
          <Formulario
            labelName={t('Firmante_2')}
            placeholder={t('Ingrese_Direccion_Firmante_2')}
            inputType="text"
            value={firmante2}
            handleChange={(e) => setFirmante2(e.target.value)}
          />
          <Formulario
            labelName={t('Destino')}
            placeholder={t('Ingrese_Direccion_Destino')}
            inputType="text"
            value={destino}
            handleChange={(e) => setDestino(e.target.value)}
          />
          <Formulario
            labelName={t('Descripcion')}
            placeholder={t('Ingrese descripcion')}
            inputType="text"
            maxLength={50}
            value={descripcion}
            handleChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <BotonPersonalizado btnType="submit" title={t('Crear')} styles="bg-[#1dc071]" />
        </div>
      </form>

      {cargando1 && <CargandoFirma pagina="creando" />}

      {transaccionExitosa && (
        <div className="mt-4 p-4 bg-[#3a3a43] rounded-[20px] text-white animate__animated animate__slideInDown">
          <h1 style={{ fontSize: '24px', textDecoration: 'underline' }}>
            <strong>{t('Transferencia_creada_exitosamente')}</strong>
          </h1>
          <br />
          <p>
            <strong>{t('Valor')}:</strong> {transaccionExitosa.valor} ETH
          </p>
          <p>
            <strong>{t('validador_1')}:</strong> {transaccionExitosa.firmante1}
          </p>
          <p>
            <strong>{t('validador_2')}:</strong> {transaccionExitosa.firmante2}
          </p>
          <p>
            <strong>{t('Address_Destino')}:</strong> {transaccionExitosa.destino}
          </p>
        </div>
      )}

      {transaccionExitosa && (
        <div className="mt-4 animate__animated animate__slideInDown">
          <button
            onClick={verenTransacciones}
            className="bg-[#1dc071] text-white rounded-[10px] py-2 px-4 hover:bg-[#15a45e] cursor-pointer"
          >
            {t('Ver_Mis_Transferencias')}
          </button>
        </div>
      )}
    </div>
  );
};
