import React, { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import abi from "../helpers/abi.json";
import abiusdt from "../helpers/abiusdt.json";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const AppContext = createContext();

const ContratoProvider = ({ children }) => {
    
    const [contrato, setContrato] = useState(null);
    const [contratousdt, setContratoUsdt] = useState(null);
    const [account, setAccount] = useState('Not connected');
    const [signer, setSigner] = useState('');
    const [activo, setActivo] = useState('Inicio');
    const [idioma, setIdioma] = useState('es');
    const location = useLocation();
    const esInicio = location.pathname === '/';
    const navigate = useNavigate();


    const conectarContrato = async () =>  {
        const { ethereum } = window;

        if (ethereum) {
            const networkId = await ethereum.request({ method: 'eth_chainId' });
            const supportedNetwork = networkId === "0xaa36a7";

            if (!signer) {
                if (!supportedNetwork) {
                    Swal.fire("Por favor conectate a la red Sepolia!");
                } else {
                    try {
                        const contractAddres = '0x5924A5Aa0B825754b83692ed894CfA35d494626D';
                        const contractABI = abi;

                        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                        const selectedAddress = accounts[0];
                        setSigner(selectedAddress);
                        if (ethereum) {
                            ethereum.on('accountsChanged', (newAccounts) => {
                                const newAddress = newAccounts[0];
                                setSigner(newAddress);
                            });
                        }

                        const provider = new ethers.providers.Web3Provider(ethereum);
                        const signer = provider.getSigner();
                        const contract = new ethers.Contract(contractAddres, contractABI, signer);

                        setContrato({ provider, signer, contract });
                    } catch (error) {
                    }
                }
            } else {
                if (signer && activo  !== 'crearTransferencias' && esInicio) {
                    setActivo("Crear Transferencias");
                    navigate('crearTransferencias');
                }
            }
        } else {
        }
    };

    const conectarContratoUSDT = async () => {
        const { ethereum } = window;

        if (ethereum) {
            try {
                const contractAddres = '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0';
                const contractABI = abiusdt;

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const selectedAddress = accounts[0];
                setSigner(selectedAddress);

                if (ethereum) {
                    ethereum.on('accountsChanged', (newAccounts) => {
                        const newAddress = newAccounts[0];
                        setSigner(newAddress);
                    });
                }

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const usdt = new ethers.Contract(contractAddres, contractABI, signer);

                setContratoUsdt({ provider, signer, usdt });

            } catch (error) {
            }
        } else {
            console.error('MetaMask no está instalado o no se detecta.');
        }
    };

    return (
        <AppContext.Provider value={{contrato, contratousdt, conectarContrato, setAccount, account, signer, setSigner, idioma, setIdioma, activo, setActivo, esInicio,conectarContratoUSDT }}>
            {children}
        </AppContext.Provider>
    );
};

const useContrato = () => useContext(AppContext);

export { ContratoProvider, useContrato };
