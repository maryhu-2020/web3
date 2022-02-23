import { useForm } from "~/hooks/form"
import { useStarknet, useStarknetInvoke } from "@starknet-react/core"
import {useAMMContract} from "~/hooks/amm"

export function MintTokens(){
    const {account} = useStarknet() 
    const {contract:ammContract} = useAMMContract()
    const {invoke} = useStarknetInvoke({contract:ammContract, method:'add_demo_token'})


    function addTokenToAccount(){
        invoke({args:{
            'account_id': account,
            'token_a_amount': values.NKI,
            'token_b_amount': values.NDL
        }})
    }

    const initoalState = {
        NKI:0,
        NDL:0
    }

    const {onChange, onSubmit, values} = useForm(addTokenToAccount ,initoalState)

    if( !account){
        return null;
    }

    return(        
        <form onSubmit={onSubmit}>
            <h1>Mint Tokens For Connected Account</h1>
            <label>Number of NKI:
                <input 
                    type="number" 
                    name="NKI" 
                    id="NKI"
                    placeholder="0"
                    onChange={onChange}
                />
            </label>
            <label>Number of NDL:
                <input 
                    type="number" 
                    name="NDL" 
                    id="NDL"
                    placeholder="0"
                    onChange={onChange}
                />
                </label>
                <input type="submit" />
            </form>
    )

}