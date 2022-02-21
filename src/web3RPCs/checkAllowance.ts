import BigNumber from "bignumber.js";

export default async function checkAllowance(ERC20Instance: any, tradeContractAddress: string, tokenAmount: number, trader: string){
    try {
        const tokenAmountBN = (new BigNumber(tokenAmount*10**18));
        
        const allowance = new BigNumber(await ERC20Instance.methods.allowance(trader, tradeContractAddress).call());
        if((allowance.minus(tokenAmountBN)).toNumber() < 0){
            return false;
        }else{
            return true;
        }
    } catch (error) {
        return false;
    }

}