import addChain from "./addChain";

export default async function switchChain(provider: any, chainID: string){
    try {
        const result = await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainID }],
        });

        if(result === null){
            // Network successful
            return 1;
        }else{
            // Not successful
            return -2;
        }

    } catch (error) {
        console.log(error);
        if(error.code ===  4902 || -32603){
            // Supported chain/network not found in user's Metamask wallet
            // Needs to be added
            const addResult = await addChain(provider);
            return addResult;
        }
        if(error.code === 4001){
            // User rejected request
            return -1
        }
        // Switch error
        return -2;
    }
}

/**
 1 - successful
 0 - needs addChain
 -1 - user rejected
 -2 - switch error
 */