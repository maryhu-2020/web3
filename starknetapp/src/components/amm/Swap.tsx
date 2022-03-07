import { useForm } from "~/hooks/form"
import { useStarknet, useStarknetInvoke } from "@starknet-react/core" 
import { useAMMContract } from "~/hooks/amm"
import {useState} from 'react'

export function Swap(){
    const {account} = useStarknet()
    const {contract:ammContract} = useAMMContract()
    const {data, loading, error,invoke} = useStarknetInvoke({"contract": ammContract, "method":"swap"})
    const[tokenTo, setTokenTo] = useState({
        "token_to": 2,
        "amt_to":0
    })

    const initialState = {
        "token_from" : "1",
        "amt_from" : 0
    }

    function swap_invoke(){
        invoke({ args:{ 
            "account_id": account,
            "token_from": values.token_from,
            "amount_from": values.amt_from
         }})

         console.log('error: '+ error+', data: '+ data)
    }

    const {onChange, onSubmit,values} = useForm(swap_invoke, initialState)

    if( !account)
        return null


    return(
        <form onSubmit={onSubmit}>
            <h1>Swap</h1>
            <label>Tokem From:
                <input 
                    type="text" 
                    name="token_from" 
                    id="token_from"
                    placeholder="1"
                    onChange={onChange}
                />
            </label>
            <label>Amount From:
                <input 
                    type="number" 
                    name="amt_from" 
                    id="amt_from"
                    placeholder="0"
                    onChange={onChange}
                />
            </label>           
            <input type="submit" />
        </form>
    )
}