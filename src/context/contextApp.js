import React, { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import abi from "../helpers/abi.json";
import { useLocation, useNavigate } from 'react-router-dom';



const AppContext = createContext();


const ContratoProvider = ({ children }) => {
    
    //estado para almacenar el contrato
    const [contrato, setContrato] = useState(null);
    const [account, setAccount] = useState('Not connected');
    const [signer, setSigner] = useState('');

    const [activo, setActivo] = useState('Inicio');
    const [idioma, setIdioma] = useState('es');
    const location = useLocation();
    const esInicio = location.pathname === '/';
    const navigate = useNavigate();

    const obtenerEjecucion= async (id) => {
        try {
            const transaccion = await contrato.contract.transacciones(id);
            return transaccion
            
        } catch (error) {
            console.error('Error al obtener la transacción:', error);
            return null;
        }
    };

    const verificarConfirmacion = async (id, direccion) => {
        try {
            const confirmacion = await contrato.contract.confirmaciones(id, direccion);
            return confirmacion;
        } catch (error) {
            console.error('Error al verificar la confirmación:', error);
            return null;
        }
    };





   
    const conectarContrato = async () =>  {
        const  { ethereum } = window;

        if (ethereum) {
        const networkId = await ethereum.request({ method: 'eth_chainId' });
        const supportedNetwork = networkId==="0xaa36a7"

        if (!signer) {
            if (!supportedNetwork) {
            
            alert('Por favor, conéctese a una red SEPOLIA para utilizar la app.');
            } else {
            try {
                const contractAddres = '0xEFB9A1Fd020ff50831e51092e75D376DAe42981b';
                const contractABI = abi;

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const selectedAddress = accounts[0];
                setSigner(selectedAddress);

                ethereum.on('accountsChanged', (newAccounts) => {
                const newAddress = newAccounts[0];
                setSigner(newAddress);
                });

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddres, contractABI, signer);

                setContrato({ provider, signer, contract });

                console.log('Dirección conectada:', selectedAddress);

                const transaccion= await contrato.contract.transferencias()



            } catch (error) {
                console.error('Error al conectar a MetaMask:', error);
            }
            }
        } else {
            if (signer && activo !== 'crearTransferencias' && esInicio) {
            setActivo("Crear Transferencias");
            navigate('crearTransferencias');
            }
        }
        } else {
        console.error('MetaMask no está instalado o no se detecta.');
        }
    }

    return (
        <AppContext.Provider value={{ contrato, conectarContrato, setAccount, account, signer,setSigner, idioma, setIdioma, activo, setActivo, esInicio, obtenerEjecucion, verificarConfirmacion}}>
            {children}
        </AppContext.Provider>
    );
}

const useContrato = () => useContext(AppContext);

export { ContratoProvider, useContrato };
