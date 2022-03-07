%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import (
    Uint256, 
    uint256_add 
    )

from starkware.starknet.common.syscalls import (
    get_caller_address,
    get_contract_address
    )

from contracts.token.ERC721.ERC721_base import (
    ERC721_name, 
    ERC721_symbol,
    ERC721_initializer,
    ERC721_mint,
    ERC721_burn,
    ERC721_balanceOf, 
    ERC721_ownerOf
    )

from contracts.token.ERC20.IERC20 import IERC20 


struct Animal:
    member sex  : felt
    member legs : felt
    member wings: felt
end

#
# storage
#
@storage_var
func breeders(account: felt) -> (is_approved: felt): 
end

@storage_var
func animals(token_id: Uint256) -> (animal: Animal):
end

@storage_var
func token_id() -> (token_id: Uint256):
end

@storage_var
func animal_owners(account:felt, index:felt) -> (token_id:Uint256):
end

@storage_var
func dummy_token_address_storage() -> ( dummy_token_address: felt ):
end

#
# Constructor
#
@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        name:felt, 
        symbol:felt,  
        _sex: felt,
        _legs: felt,
        _wings: felt,
        _to:felt,
        _dummy_token_address: felt 
        ):
    ERC721_initializer(name, symbol)

    let animal = Animal(sex=_sex, legs=_legs, wings=_wings)
    let init_token_id: Uint256 = Uint256(1, 0)    
    token_id.write(init_token_id)
    animals.write(init_token_id,animal)
    
    ERC721_mint(_to, init_token_id)
    animal_owners.write(_to,0,init_token_id)  

    dummy_token_address_storage.write(_dummy_token_address)
    return()
end

#
# Getters
#
@view
func ownerOf{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        token_id : Uint256) -> (owner : felt):
    let (owner : felt) = ERC721_ownerOf(token_id)
    return (owner)
end


@view
func balanceOf{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        account:felt) -> (balance: Uint256):
    let (balance: Uint256) = ERC721_balanceOf(account)
    return (balance)
end


@view
func is_breeder{syscall_ptr: felt*,pedersen_ptr: HashBuiltin*,range_check_ptr}(
    account : felt) -> (is_approved : felt):
    let(is_approved) = breeders.read(account)
    return (is_approved)
end

@view
func get_animal_characteristics{syscall_ptr: felt*,pedersen_ptr: HashBuiltin*,range_check_ptr}(
    token_id : Uint256) -> (sex : felt, legs : felt, wings : felt):
    let( animal) = animals.read(token_id)
    return( animal.sex, animal.legs, animal.wings)
end

@view
func token_of_owner_by_index{syscall_ptr: felt*,pedersen_ptr: HashBuiltin*,range_check_ptr}(
    account : felt, index : felt) -> (token_id : Uint256):
    let(token_id) = animal_owners.read(account,index)
    return (token_id)
end

@view
func registration_price() -> (price : Uint256):
    let price = Uint256(100,0)
    return (price)
end
#
# Externals
#

@external
func register_me_as_breeder{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*,range_check_ptr}(
    ) -> (is_added : felt):
    let(caller) = get_caller_address()
    breeders.write( caller, 1)

    let (dummy_token_address:felt) = dummy_token_address_storage.read()
    let (contract_address) = get_contract_address()
    let (amount:Uint256) = registration_price()
    IERC20.transferFrom(contract_address = dummy_token_address, sender=caller,recipient=contract_address,amount=amount)
    
    return (1)
end


@external
func declare_animal{syscall_ptr: felt*,pedersen_ptr: HashBuiltin*,range_check_ptr}(
    _sex : felt, 
    _legs : felt, 
    _wings : felt) -> (token_id : Uint256):    
    alloc_locals

    let(caller) = get_caller_address()   
    let( is_breeder_) = is_breeder( caller)
    assert is_breeder_ = 1

    let animal = Animal(sex=_sex, legs=_legs, wings=_wings)
    
    let (current_token_id:Uint256) = token_id.read()
    let (next_token_id:Uint256,_) =  uint256_add(current_token_id, Uint256(1,0))
    token_id.write(next_token_id)

    animals.write(next_token_id,animal)
     
    let(balance: Uint256) = ERC721_balanceOf(caller)    
    animal_owners.write(caller,balance.low,next_token_id)            

    ERC721_mint(caller, next_token_id)
    return (next_token_id)
end



@external
func declare_dead_animal{syscall_ptr: felt*,pedersen_ptr: HashBuiltin*,range_check_ptr}(
    token_id : Uint256):

    ERC721_burn(token_id)

    let animal = Animal(sex=0,legs=0,wings=0)
    animals.write(token_id, animal)
    return()
end