
export function awaitBlockConsensus(web3, txHash, blockCount, timeout){
  return new Promise((resolve, reject) => {
    awaiting([web3], txHash, blockCount, timeout, (error, txnReceipt) => {
      if(error){
          console.log(error);
          reject(false);
      }
      resolve(true);
  });

  });
}




export function awaiting(web3s, txhash, blockCount, timeout, callback) {
     
    var txWeb3 = web3s[0];
    var startBlock = Number.MAX_SAFE_INTEGER;
    var interval;
    var stateEnum = { start: 1, mined: 2, awaited: 3, confirmed: 4, unconfirmed: 5 };
    var savedTxInfo;
    var attempts = 0;
  
    var pollState = stateEnum.start;
  
    var poll = function() {
      if (pollState === stateEnum.start) {
        txWeb3.eth.getTransaction(txhash, function(e, txInfo) {
          if (e || txInfo == null) {
            return; // XXX silently drop errors
          }
          if (txInfo.blockHash != null) {
            startBlock = txInfo.blockNumber;
            savedTxInfo = txInfo;
            console.log("mined");
            pollState = stateEnum.mined;
          }
        });
      }
      else if (pollState == stateEnum.mined) {
          txWeb3.eth.getBlockNumber(function (e, blockNum) {
            if (e) {
              return; // XXX silently drop errors
            }
            console.log("blockNum: ", blockNum);
            if (blockNum >= (blockCount + startBlock)) {
              pollState = stateEnum.awaited;
            }
          });
      }
      else if (pollState == stateEnum.awaited) {
          txWeb3.eth.getTransactionReceipt(txhash, function(e, receipt) {
            if (e || receipt == null) {
              return; // XXX silently drop errors.  TBD callback error?
            }
            // confirm we didn't run out of gas
            // XXX this is where we should be checking a plurality of nodes.  TBD
            clearInterval(interval);
            if (receipt.gasUsed >= savedTxInfo.gas) {
              pollState = stateEnum.unconfirmed;
              callback(new Error("Out Of Gas, Not Confirmed!"), null);
            } else {
              pollState = stateEnum.confirmed;
              callback(null, receipt);
            }
        });
      } else {
        throw(new Error("We Should Never Get Here, Illegal State: " + pollState));
      }
  
      // note assuming poll interval is 1 second
      attempts++;
      if (attempts > timeout) {
        clearInterval(interval);
        pollState = stateEnum.unconfirmed;
        callback(new Error("Timed Out, Not Confirmed"), null);
      }
    };
  
    interval = setInterval(poll, 1000);
    poll();
  };