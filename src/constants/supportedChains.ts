export const supportedChainID: number = 97;

export const supportedChains: Object[] = [
    {
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        nativeCurrency: {
            name: 'Smart Chain Testnet',
            symbol: 'BNB',
            decimals: 18
        },
        blockExplorerUrls: ['https://testnet.bscscan.com']
    }
];