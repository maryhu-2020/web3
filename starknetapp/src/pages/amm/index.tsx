import type {NextPage} from 'next'

import {ConnectWallet} from '~/components/ConnectWallet'
import { TransactionList } from '~/components/TransactionList'
import {InitPool} from '~/components/amm/InitPool'

import {useAMMContract} from '~/hooks/amm'
import { useStarknetCall } from '@starknet-react/core'


const AMMHome: NextPage = () =>{
    const {contract: ammContract} = useAMMContract()    
    const account_id = ammContract?.connectedTo

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
            args:{ 'account_id':'0x04336d6bd82293962d8607e9574dc4410fd564db05d80c9bf4716892067a167e', 'token_type':'1'}
        } )
    const {data:acct_token_b_balance} = useStarknetCall(
        {
            contract:ammContract,
            method:'get_account_token_balance', 
            args:{ 'account_id':'0x04336d6bd82293962d8607e9574dc4410fd564db05d80c9bf4716892067a167e', 'token_type':'2'}
        } )    

    return(
        <div>            
            <h2>Wallet</h2>
            <ConnectWallet />
            <h2>AMM Contract</h2>
            <p>Address: {ammContract?.connectedTo}</p>

            <h2>Pool Token Balance</h2>
            <p>Token A: {token_a_balance?.balance}</p>    
            <p>Token B: {token_b_balance?.balance}</p>   

            <h2>Account Token Balance</h2>
            <p>Token A: {acct_token_a_balance?.balance}</p>     
            <p>Token B: {acct_token_b_balance?.balance}</p>   


            <InitPool />

            <h2>Recent Transactions</h2>
            <TransactionList />        
        </div>
    );
}

export default AMMHome