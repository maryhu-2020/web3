import React, {useState, FormEvent,ChangeEvent} from "react";
import { useStarknet,useStarknetInvoke } from "@starknet-react/core";
import { useAMMContract } from "~/hooks/amm";
import {useForm} from "~/hooks/form"

export function InitPool(){
    const {account} = useStarknet()
    const {contract:ammContract} = useAMMContract()
    const {invoke} = useStarknetInvoke({ contract:ammContract, method:'init_pool'})
    
    const initialState ={  
        NKI:0,
        NDL:0
    }

    async function initPool() {        
        invoke({args:{ 'token_a':values.NKI,'token_b':values.NDL}})
    }

    const { onChange,onSubmit,values} = useForm(initPool, initialState)

    if (!account){
        return null
    }

    return(        
        <form onSubmit={onSubmit}>
            <h1>Initialize Pool</h1>
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