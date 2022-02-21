import { supportedChains } from "../constants/supportedChains";

export default async function addChain(provider: any){
    try {
        
        const result = await provider.request({
            method: 'wallet_addEthereumChain',
            params: [supportedChains[0]]
        });

        if(result === null){
            // Network added to user's Metamask wallet
            return 1;
        }else{
            // Network add error
            return -2;
        }

    } catch (error) {
        console.log(error);
        if(error.code === 4001){
            // User rejected request
            return -1
        }

        // Network add error
        return -2;
    }

}
