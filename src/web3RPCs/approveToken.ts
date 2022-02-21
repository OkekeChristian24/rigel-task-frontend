import BigNumber from "bignumber.js";
import { awaitBlockConsensus } from "../helpers/awaitTxns";

export default async function approveToken(ERC20Instance: any, tradeContractAddress: string, tokenAmount: number, trader: string){
    try {
        const tokenAmountBN = (new BigNumber(tokenAmount*10**18));
        
        const data = await ERC20Instance.methods.approve(tradeContractAddress, tokenAmountBN).send({
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
        return 0;
    }

}