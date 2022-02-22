import { ActionType } from './../actionTypes/index';

interface WalletDetail {
    provider: any,
    address: string,
    chainID: number
}

interface UserBalances {
    ethBalance: number,
    tokenBalance: number
}

export interface TokenValues {
    from: number,
    to: number
}

export interface TokenDetails {
    name: string,
    balance: number,
    value: number,
    isETH: boolean,
    logo?: any
}

interface TokensToSwap {
    from: TokenDetails,
    to: TokenDetails
}

interface ConnectAction {
    type: ActionType.CONNECT,
    payload: WalletDetail
}

interface DisconnectAction {
    type: ActionType.DISCONNECT,
}

interface UpdateSwapAction {
    type: ActionType.UPDATESWAP,
    payload: UserBalances
}

interface BalanceAction {
    type: ActionType.BALANCE,
    payload: UserBalances
}

interface SwitchAction {
    type: ActionType.SWITCH,
    payload: TokensToSwap
}

interface UpdateValueAction {
    type: ActionType.VALUE_CHANGE,
    payload: TokenValues
}


export type Action = ConnectAction | DisconnectAction | UpdateSwapAction | BalanceAction | SwitchAction | UpdateValueAction;