import { useSelector } from 'react-redux';
import { RootState } from '../../../state/reducers';
import { StateType } from '../../../state/reducers/reducers';
import '../../../style/info.css';
import formatWallet from '../../../helpers/formatWallet';

export default function InfoTabPanel(){
    const state: StateType = useSelector((state: RootState) => state.allData);

    
    return(
        <div className="Info-container">
            <h4>Info Panel</h4>
            {
                state.address !== ""
                ?
                <div>
                    <div>Account: {formatWallet(state.address)}</div>
                    <div>Chain ID: {state.chainID}</div>

                    <div>
                        <div>Eth Balance: {state.ethBalance}</div>
                        <div>Token Balance: {state.tokenBalance}</div>
                    </div>
                </div>
                :
                <div>
                    <p>No Account Connected</p>
                </div>
            }
        </div>
    );
}