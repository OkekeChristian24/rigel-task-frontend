import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { StateType } from "../../state/reducers/reducers";
import formatWallet from "../../helpers/formatWallet";
import '../../style/components/notification.css';

export default function Notification(){

  const state: StateType = useSelector((state: RootState) => state.allData);


    return(
        <div className="notification-container">
          {
            state.address !== ""
            &&
            <p>
              {(formatWallet(state.address))}

            </p>
          }
  
        </div>
    );
  }
  