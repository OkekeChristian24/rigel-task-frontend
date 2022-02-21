import BigNumber from "bignumber.js";
import { awaitBlockConsensus } from "../helpers/awaitTxns";

export async function swapEthForERC20(tradeContractInstance: any, trader: string, ethAmt: number){
    
    try {
        
        const data = await tradeContractInstance.methods.swapEthForERC20(trader).send({
            from: trader,
            value: window.initWeb3.utils.toWei(ethAmt)
        });
        const txHash = data.transactionHash;
        awaitBlockConsensus([window.initWeb3], txHash, 3, 750, (error: any, txnReceipt: Object) => {
            if(error){
                console.log(error);
                throw new Error("Error");
            }
            return 1
        });
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export async function swapERC20ForEth(tradeContractInstance: any, trader: string, tokenAmount: number){
    try {
        const tokenAmountBN = (new BigNumber(tokenAmount*10**18));
        
        const data = await tradeContractInstance.methods.swapERC20ForEth(trader, tokenAmountBN).send({
            from: trader
        });
        const txHash = data.transactionHash;
        awaitBlockConsensus([window.initWeb3], txHash, 3, 750, (error: any, txnReceipt: Object) => {
            if(error){
                console.log(error);
                throw new Error("Error");
            }
            return 1
        });
    } catch (error) {
        console.log(error);
        return 0;
    }   
}