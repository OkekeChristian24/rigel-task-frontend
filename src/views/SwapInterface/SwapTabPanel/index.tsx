import { useEffect, useState } from "react";
import RoundButton from "../../../components/RoundButton";
import Button from "../../../components/Button";
import TradeInput from "../../../components/TradeInput";
import '../../../style/swap.css';
import useConnectWallet from "../../../hooks/useConnectWallet";
import useInitContract from "../../../hooks/useInitContract";
import TradeABI from "../../../constants/ABIs/tradeContract.json";
import ERC20ABI from "../../../constants/ABIs/erc20.json";
import {tradeContractAddress, tradeTokenContractAddress} from "../../../constants/contractAddresses";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { StateType } from "../../../state/reducers/reducers";
import { RootState } from "../../../state/reducers";
import checkAllowance from "../../../web3RPCs/checkAllowance";
import approveToken from "../../../web3RPCs/approveToken";
import getBalances from "../../../web3RPCs/getBalances";
import { swapEthForERC20, swapERC20ForEth } from "../../../web3RPCs/tradeTokens";
import { ethToERC20Rate } from "../../../constants/tradeRate"; 


export default function SwapTabPanel(){

    const dispatch = useDispatch();
    const { switchTokens, updateSwap } = bindActionCreators(actionCreators, dispatch);

    const state: StateType = useSelector((state: RootState) => state.allData);


    // Component states
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
    const [isApproved, setIsApproved] = useState(false);
    const [approveIsLoading, setApproveIsLoading] = useState(false);
    const [swapIsLoading, setSwapIsLoading] = useState(false);
    const [allowanceIsLoading, setAllowanceIsLoading] = useState(false);
    
    // Custom hooks
    const {isLoading, web3, account, chainID, getInjectedWallet } = useConnectWallet();
    const { contractInstance: ERC20Contract, createContractInstance: setERC20Contract } = useInitContract({abi: ERC20ABI.abi, address: tradeTokenContractAddress});
    const { contractInstance: tradeContract, createContractInstance: setTradeContract } = useInitContract({abi: TradeABI.abi, address: tradeContractAddress});
    
    
    async function ConnectWalletHandler(){
        await getInjectedWallet();
        await getUserBalances();
    }
    
    function getFromValue(value: string){
        setFromValue(value);
    }

    function getToValue(value: string){
        setToValue(value);
    }

    

    
    function switchTradeTokens(){
        switchTokens(state.to, state.from);
        
    }

    async function checkTokenAllowance(){
        if(!isNaN(Number(fromValue)) && state.address !== ""){
            console.log("In checkAllowance: ", state.from.value);
            const ERC20ContractInstance = setERC20Contract(ERC20ABI.abi, tradeTokenContractAddress);
            const result = await checkAllowance(ERC20ContractInstance, tradeContractAddress, Number(fromValue), state.address);
            setIsApproved(result);
        }
    }

    async function approve(){
        setApproveIsLoading(true);
        try {
            if(!isNaN(Number(fromValue)) && state.address !== ""){
                const ERC20ContractInstance = await setERC20Contract(ERC20ABI.abi, tradeTokenContractAddress);
                const result = await approveToken(ERC20ContractInstance, tradeContractAddress, Number(fromValue), state.address);
                console.log("Approval result: ", result);
                if(result){
                    setIsApproved(result);
                    
                }else{
                    throw new Error("Approval failed");
                }
            }
        } catch (error) {
            console.log(error);
        }finally{
            setApproveIsLoading(false);
        }
    }

    async function tradeEthForToken(){
        try {
            
            if(!isNaN(Number(fromValue)) && state.address !== ""){
                const tradeContractInstance = await setTradeContract(TradeABI.abi, tradeContractAddress);
                const result = await swapEthForERC20(tradeContractInstance, state.address, Number(state.from.value));
                return result;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function tradeTokenForEth(){
        try {
            
            if(!isNaN(Number(fromValue)) && state.address !== ""){
                const tradeContractInstance = await setTradeContract(TradeABI.abi, tradeContractAddress);
                const result = await swapERC20ForEth(tradeContractInstance, state.address, Number(fromValue));
                return result;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getUserBalances(){
        try {
            if(state.address !== ""){
                const ERC20ContractInstance = await setERC20Contract(ERC20ABI.abi, tradeTokenContractAddress);
                const { tokenBalance , ethBalance} = await getBalances(ERC20ContractInstance, state.address);
                
                updateSwap(ethBalance, tokenBalance);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function swapToken(){
        setSwapIsLoading(true);
        try {
            
            if(state.from.isETH){
                await tradeEthForToken();
            }else{
                await tradeTokenForEth();
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSwapIsLoading(false);
            await getUserBalances();
        }
    }

    
    
    

    useEffect(() => {
        (async function(){
            if(state.from.isETH){
                await checkTokenAllowance();
                await getUserBalances();
            }
        })();
    }, [state.address, state.from]);

   
    return(
        <div>
            <div className="From-to">From:</div>
            <div className="Swap-input">
                <TradeInput
                    getValue={getFromValue} 
                    isFrom={true}
                    isETH={state.from.isETH}
                    fromValue={0}
                    tokenName={state.from.name}
                    tokenLogoLink={state.from.logo}
                    tokenBalance={state.from.isETH ? state.ethBalance : state.tokenBalance}
                    showValue={state.from.value}
                />
            </div>
            <div className='Token-swap-icon-container'>
                <div className="Token-swap-icon">
                    <button style={{backgroundColor: "transparent", border: "none"}} onClick={switchTradeTokens} className="Token-swap-icon-rotate">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.14 6.13978L9.34997 3.35978C9.14997 3.16978 8.83997 3.16978 8.63997 3.35978L5.84997 6.13978C5.52997 6.44978 5.75997 6.98978 6.19997 6.98978L7.99997 6.98978L7.99997 12.9998C7.99997 13.5498 8.44997 13.9998 8.99997 13.9998C9.54997 13.9998 9.99997 13.5498 9.99997 12.9998L9.99997 6.98978L11.79 6.98978C12.24 6.98978 12.46 6.44978 12.14 6.13978ZM15.35 20.6498L18.14 17.8698C18.46 17.5598 18.23 17.0198 17.79 17.0198L16 17.0198L16 10.9998C16 10.4498 15.55 9.99979 15 9.99979C14.45 9.99979 14 10.4498 14 10.9998L14 17.0098L12.21 17.0098C11.76 17.0098 11.54 17.5498 11.86 17.8598L14.65 20.6398C14.84 20.8398 15.16 20.8398 15.35 20.6498Z" fill="currentColor">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="From-to">To:</div>
            <div className="Swap-input">
                <TradeInput
                    getValue={getToValue}
                    isFrom={false}
                    isETH={state.from.isETH}
                    fromValue={Number(fromValue)}
                    tokenName={state.to.name}
                    tokenLogoLink={state.to.logo}
                    tokenBalance={state.to.isETH ? state.ethBalance : state.tokenBalance}
                    showValue={state.to.value}
                />
            </div>
            
            <div className="Swap-gas-container">
                <div className="Swap-gas Swap-gas-left active-gas">
                    <RoundButton className="active" icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99998 1.3335C4.31998 1.3335 1.33331 4.32016 1.33331 8.00016C1.33331 11.6802 4.31998 14.6668 7.99998 14.6668C11.68 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.68 1.3335 7.99998 1.3335ZM8.58665 11.8402V12.0802C8.58665 12.4002 8.32665 12.6668 7.99998 12.6668C7.67998 12.6668 7.41331 12.4068 7.41331 12.0802V11.8002C6.99331 11.7002 6.12665 11.3935 5.61998 10.4002C5.46665 10.1068 5.61331 9.74016 5.91998 9.6135L5.96665 9.5935C6.23998 9.48016 6.54665 9.5935 6.68665 9.8535C6.89998 10.2602 7.31998 10.7668 8.09998 10.7668C8.71998 10.7668 9.41998 10.4468 9.41998 9.6935C9.41998 9.0535 8.95331 8.72016 7.89998 8.34016C7.16665 8.08016 5.66665 7.6535 5.66665 6.1335C5.66665 6.06683 5.67331 4.5335 7.41331 4.16016V3.92016C7.41331 3.5935 7.67998 3.3335 7.99998 3.3335C8.31998 3.3335 8.58665 3.5935 8.58665 3.92016V4.16683C9.29998 4.2935 9.75331 4.6735 10.0266 5.0335C10.2533 5.32683 10.1333 5.7535 9.78665 5.90016C9.54665 6.00016 9.26665 5.92016 9.10665 5.7135C8.91998 5.46016 8.58665 5.20016 8.03998 5.20016C7.57331 5.20016 6.83331 5.44683 6.83331 6.12683C6.83331 6.76016 7.40665 7.00016 8.59331 7.3935C10.1933 7.94683 10.6 8.76016 10.6 9.6935C10.6 11.4468 8.93331 11.7802 8.58665 11.8402Z" fill="currentColor"></path></svg>} label='Maximum Return' />
                </div>
                <div className="Swap-gas Swap-gas-right notactive-gas">
                    <RoundButton className="notactive" icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.18 4.82L13.1867 4.81333L11.06 2.68667C10.8667 2.49333 10.5467 2.49333 10.3534 2.68667C10.16 2.88 10.16 3.2 10.3534 3.39333L11.4067 4.44667C10.7067 4.71333 10.2334 5.42667 10.3534 6.25333C10.46 6.98667 11.0867 7.58 11.82 7.66C12.1334 7.69333 12.4067 7.64 12.6667 7.52667V12.3333C12.6667 12.7 12.3667 13 12 13C11.6334 13 11.3334 12.7 11.3334 12.3333V9.33333C11.3334 8.6 10.7334 8 10 8H9.33335V3.33333C9.33335 2.6 8.73335 2 8.00002 2H4.00002C3.26669 2 2.66669 2.6 2.66669 3.33333V13.3333C2.66669 13.7 2.96669 14 3.33335 14H8.66669C9.03335 14 9.33335 13.7 9.33335 13.3333V9H10.3334V12.24C10.3334 13.1133 10.96 13.9067 11.8267 13.9933C12.8267 14.0933 13.6667 13.3133 13.6667 12.3333V6C13.6667 5.54 13.48 5.12 13.18 4.82ZM8.00002 6.66667H4.00002V4C4.00002 3.63333 4.30002 3.33333 4.66669 3.33333H7.33335C7.70002 3.33333 8.00002 3.63333 8.00002 4V6.66667ZM12 6.66667C11.6334 6.66667 11.3334 6.36667 11.3334 6C11.3334 5.63333 11.6334 5.33333 12 5.33333C12.3667 5.33333 12.6667 5.63333 12.6667 6C12.6667 6.36667 12.3667 6.66667 12 6.66667Z" fill="currentColor"></path></svg></svg>} label='Lowest Gas' />
                </div>
            </div>
            <div>
                {
                    state.address === ""
                    ?
                    <Button disabled={isLoading} onClick={ConnectWalletHandler} className="Connect-wallet" label={account !== "" ? account : (isLoading ? "Connecting..." : "Connect Wallet")} />
                    :
                    (
                        state.from.name === "ETH"
                        ?
                        <Button disabled={swapIsLoading} onClick={swapToken} className="Connect-wallet" label={swapIsLoading ? "Swapping... Please wait" : "Swap"} />
                        :
                        (
                            isApproved
                            ?
                            <Button disabled={swapIsLoading} onClick={swapToken} className="Connect-wallet" label={swapIsLoading ? "Swapping... Please wait" : "Swap"} />
                            :
                            <Button disabled={approveIsLoading} onClick={approve} className="Connect-wallet" label={approveIsLoading ? `Approving ${state.from.name}` : "Approve"} />

                        )
                    )
                }
            </div>
            
        </div>
    );
}