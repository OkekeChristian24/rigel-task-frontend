import BigNumber from "bignumber.js";

export default async function getBalances(ERC20Instance: any, account: string){
    try {
        const tokenBalBN = await ERC20Instance.methods.balanceOf(account).call();
        const tokenBalance = window.initWeb3.utils.toBN(Number((parseFloat(tokenBalBN)/10**18).toFixed(3)));
        const ethBalBN = await window.initWeb3.eth.getBalance(account);
        const ethBalance = window.initWeb3.utils.fromWei(ethBalBN, "ether").toFixed(3);
        return {
            tokenBalance,
            ethBalance
        }
    } catch (error) {
        return {tokenBalance: 0, ethBalance: 0};
    }

}