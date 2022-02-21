export default function formatWallet(acct){
    const dots = "...";
    const firstFour = acct.substring(0, 4);
    const lastFour = acct.substring(38,42);
    const displayAcct = " " + firstFour + dots + lastFour;
    return displayAcct;
}

