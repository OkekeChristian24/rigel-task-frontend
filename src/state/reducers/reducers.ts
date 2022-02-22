import { ActionType } from "../actionTypes/index";
import { Action, TokenDetails } from "../actions";

export interface StateType {
    provider: any,
    address: string,
    chainID: number,
    ethBalance: number,
    tokenBalance: number,
    from: TokenDetails,
    to: TokenDetails
}

export const initialState: StateType = {
    provider: "",
    address: "",
    chainID: 0,
    ethBalance: 0,
    tokenBalance: 0,
    from: {
        name: "ETH",
        balance: 0,
        value: 0,
        isETH: true,
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png"
    },
    to: {
        name: "tCHRIS",
        balance: 0,
        value: 0,
        isETH: false,
        logo: "data:image/png;base64,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"
    }
};

function reducer(state: StateType = initialState, action: Action): StateType{
    switch (action.type){
        case ActionType.CONNECT:
            return {
                ...state,
                provider: action.payload.provider,
                address: action.payload.address,
                chainID: action.payload.chainID
            };

        case ActionType.DISCONNECT:
            return initialState;

        case ActionType.UPDATESWAP:
            return {
                ...state,
                ethBalance: action.payload.ethBalance,
                tokenBalance: action.payload.tokenBalance
            };

        case ActionType.BALANCE:
            return {
                ...state,
                ethBalance: action.payload.ethBalance,
                tokenBalance: action.payload.tokenBalance
            };
        case ActionType.SWITCH:
            return {
                ...state,
                from: action.payload.from,
                to: action.payload.to
            };
        case ActionType.VALUE_CHANGE:
            return {
                ...state,
                from: {
                    ...state.from,
                    value: action.payload.from,
                },
                to: {
                    ...state.to,
                    value: action.payload.to
                }
            };
        default:
            return state;
    }
}

export default reducer
