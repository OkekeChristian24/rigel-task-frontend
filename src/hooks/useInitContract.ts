import { useState, useEffect } from 'react';

interface initContractProps{
    abi: any[],
    address: string
}
export default function useInitContract(props: initContractProps){
  const [contractInstance, setContractInstance] = useState(null);

  async function createContractInstance(abi: any[], address: string){
      if(window.initWeb3 != null){
        const instance = new window.initWeb3.eth.Contract(abi, address);
        setContractInstance(instance);
        return instance;
      }else{
          return null;
      }
  }
  useEffect(() => {
      (async function(){
          const {abi, address} = props;
          await createContractInstance(abi, address);
      })();
  }, []);

  return {
    contractInstance,
    createContractInstance
  }
}