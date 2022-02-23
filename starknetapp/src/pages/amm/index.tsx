import type {NextPage} from 'next'

import {ConnectWallet} from '~/components/ConnectWallet'
import { TransactionList } from '~/components/TransactionList'
import {InitPool} from '~/components/amm/InitPool'
import { MintTokens} from '~/components/amm/MintTokens'
import { Swap } from '~/components/amm/Swap'

import {useAMMContract} from '~/hooks/amm'
import { useStarknet, useStarknetCall } from '@starknet-react/core'


const AMMHome: NextPage = () =>{
    const {contract: ammContract} = useAMMContract()    
    const {account} = useStarknet()

    const {data:token_a_balance} = useStarknetCall(
        {
            contract:ammContract, 
            method:'get_pool_token_balance',
            args:{token_type:'1'}
        })

    const {data:token_b_balance} = useStarknetCall(
        {
            contract:ammContract, 
            method:'get_pool_token_balance',
            args:{token_type:'2'}
        })

    const {data:acct_token_a_balance} = useStarknetCall(
        {
            contract:ammContract,
            method:'get_account_token_balance', 
            args:{ 'account_id':account, 'token_type':'1'}
        } )

    const {data:acct_token_b_balance} = useStarknetCall(
        {
            contract:ammContract,
            method:'get_account_token_balance', 
            args:{ 'account_id':account, 'token_type':'2'}
        } )    

    const parseIntFromHex = ( param: string ):number => {
        return parseInt(param, 16)
    }   

    return(
        <div>            
            <h2>Wallet</h2>
            <ConnectWallet />
            <h2>AMM Contract</h2>
            <p>Address: {ammContract?.connectedTo}</p>

            <h2>Pool Token Balance</h2>
            <p>Token A: {parseIntFromHex(String(token_a_balance?.balance))}</p>    
            <p>Token B: {parseIntFromHex(String(token_b_balance?.balance))}</p>   

            <h2>Account Token Balance</h2>
            <p>Token A: {parseIntFromHex(String(acct_token_a_balance?.balance))}</p>     
            <p>Token B: {parseIntFromHex(String(acct_token_b_balance?.balance))}</p>   


            <InitPool />
            <MintTokens />
            <Swap />

            <h2>Recent Transactions</h2>
            <TransactionList />        
        </div>
    );
}

export default AMMHome