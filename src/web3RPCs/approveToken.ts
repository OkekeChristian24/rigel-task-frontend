import BigNumber from "bignumber.js";
import { awaitBlockConsensus } from "../helpers/awaitTxns";

export default async function approveToken(ERC20Instance: any, tradeContractAddress: string, tokenAmount: number, trader: string){
    try {
        const tokenAmountBN = (new BigNumber(tokenAmount*10**18));
        
        const data = await ERC20Instance.methods.approve(tradeContractAddress, tokenAmountBN).send({
            from: trader
        });
        const txHash = data.transactionHash;

        return await awaitBlockConsensus(window.initWeb3, txHash, 3, 750);
        
    } catch (error) {
        return false;
    }

}