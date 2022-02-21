import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { supportedChainID } from '../constants/supportedChains';
import switchChain from '../helpers/switchChain';
import { CustomError } from '../helpers/customError';

declare global {
    interface Window {
        web3: any;
        initWeb3: any;
    }
}

export default function useConnectWallet(){
    const dispatch = useDispatch();
    const { connectWallet } = bindActionCreators(actionCreators, dispatch);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [account, setAddress] = useState<string>("");
    const [detectedweb3, setDetectedWeb3] = useState<any>("");
    const [provider, setProvider] = useState<any>("");
    const [walletChainID, setWalletChainID] = useState<number>(0);
    const [isWeb3Installed, setIsWeb3Installed] = useState<boolean>(false);
    
    
    async function getInjectedWallet(){
        try {
            setIsLoading(true);
            const web3: Web3 = new Web3(provider);
            
            window.initWeb3 = web3;
            if(provider === window.ethereum){
                const netID: number = await window.initWeb3.eth.net.getId();
                if(netID !== supportedChainID){
                    // Switch to supported chain
                    const result = await switchChain(
                        provider, 
                        window.initWeb3.utils.numberToHex(String(supportedChainID))
                    );
                    if(result === 1){
                        const accounts = await provider.request({ method: 'eth_requestAccounts' });
                        const chainId = await window.initWeb3.eth.getChainId();
                        const chainID = window.initWeb3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
                        setAddress(accounts[0]);
                        setDetectedWeb3(web3);
                        setWalletChainID(chainID);
                        connectWallet(web3, accounts[0], chainID);
            
                    }else if(result === -1){
                        throw new CustomError('Request Rejected');
                    }else{
                        throw new CustomError('Network Switch Error');
                    }
                }else{
                    const accounts = await provider.request({ method: 'eth_requestAccounts' });
                    const chainId = await window.initWeb3.eth.getChainId();
                    const chainID = window.initWeb3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
                    setAddress(accounts[0]);
                    setDetectedWeb3(web3);
                    setWalletChainID(chainID);
                    connectWallet(web3, accounts[0], chainID);
                }
            }else if(provider === window.web3){
                window.initWeb3 = new Web3(window.web3.currentProvider);
                const accounts = await web3.eth.getAccounts();
                const chainId = await window.initWeb3.eth.getChainId();
                const chainID = window.initWeb3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
                setAddress(accounts[0]);
                setDetectedWeb3(web3);
                setWalletChainID(chainID);
                connectWallet(web3, accounts[0], chainID);
            }
            
            setIsLoading(false);                
        } catch (error) {
            console.log(error);
            setIsLoading(false);                
        }

    }

    useEffect(() => {
       (async function(){
           const detectedEthProvider: any = await detectEthereumProvider();
           if(detectedEthProvider != null){
               setProvider(detectedEthProvider);
               setIsWeb3Installed(true);
           }
       })();

    }, []);

    return {
        isLoading,
        isWeb3Installed,
        web3: detectedweb3,
        account,
        chainID: walletChainID,
        getInjectedWallet
    };
}