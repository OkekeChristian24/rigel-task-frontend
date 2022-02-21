import { Dispatch } from "redux"
import { ActionType } from "../actionTypes";
import { Action, TokenDetails } from "../actions";


export function connectWallet(provider: any, address: string, chainID: number){
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CONNECT,
            payload: {
                provider,
                address,
                chainID
            }
        })
    }
}

export function disconnectWallet(){
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DISCONNECT
        })
    }
}

export function updateSwap(ethBalance: number, tokenBalance: number){
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATESWAP,
            payload: {
                ethBalance,
                tokenBalance
            }
        })
    }
}

export function getBalance(ethBalance: number, tokenBalance: number){
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BALANCE,
            payload: {
                ethBalance,
                tokenBalance
            }
        })
    }
}

export function switchTokens(from: TokenDetails, to: TokenDetails){
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SWITCH,
            payload: {
                from,
                to
            }
        })
    }
}
