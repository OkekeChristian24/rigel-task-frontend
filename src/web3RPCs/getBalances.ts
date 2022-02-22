
export default async function getBalances(ERC20Instance: any, account: string){
    try {
        const tokenBalBN = await ERC20Instance.methods.balanceOf(account).call();
        const tokenBalance = (window.initWeb3.utils.toBN(tokenBalBN/10**18)).toNumber();
        const ethBalBN = await window.initWeb3.eth.getBalance(account);
        const ethBalance = Number(window.initWeb3.utils.fromWei(ethBalBN, "ether"));
        return {
            tokenBalance,
            ethBalance
        }
    } catch (error) {
        console.log(error);
        return {tokenBalance: 0, ethBalance: 0};
    }

}