import {useContract} from '@starknet-react/core'
import { Abi } from 'starknet'
import AMMAbi from '../abi/amm.json'

export function useAMMContract(){
    return useContract({
        abi: AMMAbi as Abi[],
        address: '0x04336d6bd82293962d8607e9574dc4410fd564db05d80c9bf4716892067a167e',
    });
}



