export const supportedChainID: number = 3;

export const supportedChains: Object[] = [
    {
        chainId: '0x3',
        chainName: 'Ethereum Ropsten',
        rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: ['https://ropsten.etherscan.io']
    }
];