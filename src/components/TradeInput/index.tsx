import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ethToERC20Rate } from "../../constants/tradeRate";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";
import { StateType } from "../../state/reducers/reducers";
import '../../style/components/tradeinput.css';

export interface TradeInputProps{
    isFrom: boolean,
    isETH: boolean,
    fromValue: number;
    tokenName: string,
    tokenLogoLink: string,
    tokenBalance: number,
    getValue: Function,
    showValue: number
};
export default function TradeInput(props: TradeInputProps){

    const dispatch = useDispatch();
    const { handleValueChange: changeStateValue } = bindActionCreators(actionCreators, dispatch);

    const state: StateType = useSelector((state: RootState) => state.allData);

    function handleValueChange(e: any){
        if(!isNaN(e.target.value)){
            const eventValue = Number(e.target.value);
            const {
                ethToERC20Value,
                erc20ToEthValue 
            } = getExchangeValue(eventValue);
            if(props.isFrom){
                if(state.from.isETH){
                    changeStateValue({from: eventValue, to: ethToERC20Value});
                }else{
                    changeStateValue({from: eventValue, to: erc20ToEthValue});
                }
            }else{
                if(state.to.isETH){
                    changeStateValue({from: ethToERC20Value, to: eventValue});
                }else{
                    changeStateValue({from: erc20ToEthValue, to: eventValue});
                }
            }
        }

    }

    
    function getExchangeValue(value: number){
        const ethToERC20Value = value * ethToERC20Rate;
        const erc20ToEthValue = Number((parseFloat(value.toString()) / parseFloat(ethToERC20Rate.toString())).toFixed(3));

        return {
            ethToERC20Value,
            erc20ToEthValue
        };
    }

    return(
        <div className='Input-container'>
            <div className='Input-balance-container'>
                {
                    props.isFrom 
                    ?
                    <button className='Select-max-btn'>Select Max</button>
                    :
                    <div></div>
                }

                {
                    props.isFrom
                    ?
                    <button className='Input-balance input-btn'>
                        <svg 
                            width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7102 2.87599V2.30979C10.7102 1.44973 10.0105 0.75 9.1504 0.75H1.5165C0.680297 0.75 0 1.4303 0 2.2665V10.3224C0 11.2035 0.713156 11.9203 1.58974 11.9203H10.4441C11.3021 11.9203 12 11.2188 12 10.3566V10.2901C12 10.0312 11.7901 9.82137 11.5312 9.82137C11.2724 9.82137 11.0625 10.0312 11.0625 10.2901V10.3566C11.0625 10.7019 10.7851 10.9828 10.4441 10.9828H1.58974C1.23009 10.9828 0.9375 10.6866 0.9375 10.3224V3.67643C1.1149 3.75002 1.30915 3.79062 1.5127 3.79062H10.4441C10.7851 3.79062 11.0625 4.07156 11.0625 4.41687V5.39768H9.75173C8.9201 5.39768 8.24351 6.07427 8.24351 6.90591C8.24351 7.73754 8.92008 8.41413 9.75173 8.41413H11.5312C11.7901 8.41413 12 8.20427 12 7.94538V4.41687C12 3.64575 11.4418 3.00319 10.7102 2.87599ZM1.5165 2.85312C1.35703 2.85312 1.21242 2.78831 1.10761 2.68369C1.10735 2.68343 1.10712 2.6832 1.10686 2.68294C1.10644 2.68252 1.10602 2.68207 1.10559 2.68165C1.00177 2.57616 0.9375 2.4307 0.9375 2.2703V2.2665C0.9375 1.94723 1.19723 1.6875 1.5165 1.6875H9.1504C9.49355 1.6875 9.77269 1.96666 9.77269 2.30979V2.85309H1.5165V2.85312ZM9.18103 6.90591C9.18103 6.59121 9.43706 6.33518 9.75176 6.33518H11.0625V7.47663H9.75173C9.43704 7.47663 9.18103 7.2206 9.18103 6.90591Z" fill="#A7B6BD">
                            </path>
                        </svg>
                        <div className='Token-balance'>{props.tokenBalance !== 0 ? props.tokenBalance : "0"}</div>                    
                    </button>
                    :
                    <div className='Input-balance'>
                        <svg 
                            width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7102 2.87599V2.30979C10.7102 1.44973 10.0105 0.75 9.1504 0.75H1.5165C0.680297 0.75 0 1.4303 0 2.2665V10.3224C0 11.2035 0.713156 11.9203 1.58974 11.9203H10.4441C11.3021 11.9203 12 11.2188 12 10.3566V10.2901C12 10.0312 11.7901 9.82137 11.5312 9.82137C11.2724 9.82137 11.0625 10.0312 11.0625 10.2901V10.3566C11.0625 10.7019 10.7851 10.9828 10.4441 10.9828H1.58974C1.23009 10.9828 0.9375 10.6866 0.9375 10.3224V3.67643C1.1149 3.75002 1.30915 3.79062 1.5127 3.79062H10.4441C10.7851 3.79062 11.0625 4.07156 11.0625 4.41687V5.39768H9.75173C8.9201 5.39768 8.24351 6.07427 8.24351 6.90591C8.24351 7.73754 8.92008 8.41413 9.75173 8.41413H11.5312C11.7901 8.41413 12 8.20427 12 7.94538V4.41687C12 3.64575 11.4418 3.00319 10.7102 2.87599ZM1.5165 2.85312C1.35703 2.85312 1.21242 2.78831 1.10761 2.68369C1.10735 2.68343 1.10712 2.6832 1.10686 2.68294C1.10644 2.68252 1.10602 2.68207 1.10559 2.68165C1.00177 2.57616 0.9375 2.4307 0.9375 2.2703V2.2665C0.9375 1.94723 1.19723 1.6875 1.5165 1.6875H9.1504C9.49355 1.6875 9.77269 1.96666 9.77269 2.30979V2.85309H1.5165V2.85312ZM9.18103 6.90591C9.18103 6.59121 9.43706 6.33518 9.75176 6.33518H11.0625V7.47663H9.75173C9.43704 7.47663 9.18103 7.2206 9.18103 6.90591Z" fill="#A7B6BD">
                            </path>
                        </svg>
                        <div className='Token-balance'>{props.tokenBalance !== 0 ? props.tokenBalance : "0"}</div>
                    </div>
                }
            </div>
            <div className='Input-amount'>
                <input 
                    inputMode="decimal" 
                    title="Token Amount" 
                    autoComplete="off" 
                    autoCorrect="off" 
                    type="text" 
                    pattern="^[0-9]*[.,]?[0-9]*$" 
                    placeholder="0.0" 
                    spellCheck="false" 
                    value={props.showValue}
                    onChange={handleValueChange} 
                />

                <button className='Select-token-btn'>
                    <span className='Select-token'>
                        <img className='Select-token-img' src={props.tokenLogoLink} alt='' />
                        <span className='Select-token-name'>{props.tokenName}</span>
                        {/* <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                            <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE">
                            </path>
                        </svg> */}
                    </span>
                </button>
            </div>
        </div>
        
    );
}