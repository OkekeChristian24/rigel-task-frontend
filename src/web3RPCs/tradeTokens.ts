import BigNumber from "bignumber.js";
import { awaitBlockConsensus } from "../helpers/awaitTxns";

export async function swapEthForERC20(tradeContractInstance: any, trader: string, ethAmt: number){
    
    try {
        console.log("Eth vlue: ", window.initWeb3.utils.toWei(ethAmt.toString(), "ether"));
        
        const data = await tradeContractInstance.methods.swapEthForERC20(trader).send({
            from: trader,
            value: window.initWeb3.utils.toWei(ethAmt.toString(), "ether")
        });
        const txHash = data.transactionHash;
        return await awaitBlockConsensus(window.initWeb3, txHash, 3, 750);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function swapERC20ForEth(tradeContractInstance: any, trader: string, tokenAmount: number){
    try {
        const tokenAmountBN = (new BigNumber(tokenAmount*10**18));
        
        const data = await tradeContractInstance.methods.swapERC20ForEth(trader, tokenAmountBN).send({
            from: trader
        });
        const txHash = data.transactionHash;
        return await awaitBlockConsensus(window.initWeb3, txHash, 3, 750);
    } catch (error) {
        console.log(error);
        return false;
    }   
}