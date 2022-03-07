%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import (
    get_caller_address,
    get_contract_address
    )
from starkware.cairo.common.uint256 import (
    Uint256,
    uint256_add
    )

from contracts.token.ERC721.ERC721_base import (
    ERC721_initializer,
    ERC721_mint
    )

from contracts.token.ERC721.ERC721_Metadata_base import(
    ERC721_Metadata_initializer,
    ERC721_Metadata_setBaseTokenURI,
    ERC721_Metadata_tokenURI
    )

from contracts.utils.Ownable_base import (
    Ownable_initializer,
    Ownable_only_owner
    )


@storage_var
func next_token_id_storage() ->( next_token_id_storage: Uint256 ):
end

#
# constructor
#
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    _name: felt,
    _symbol: felt,
    _owner:  felt,
    _base_token_uri_len: felt,
    _base_token_uri: felt*,
    _token_url_prefix: felt
    ):
    ERC721_initializer(_name, _symbol)
    ERC721_Metadata_initializer()
    Ownable_initializer(_owner)
    ERC721_Metadata_setBaseTokenURI(_base_token_uri_len, _base_token_uri, _token_url_prefix)
    let one_as_unit = Uint256(1,0)
    next_token_id_storage.write(one_as_unit)
    return()
end

@view
func tokenURI{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    token_id:Uint256) -> (token_uri_len: felt, token_uri: felt* ):
    let(_token_uri_len, _token_uri) = ERC721_Metadata_tokenURI(token_id)
    return( token_uri_len = _token_uri_len, token_uri = _token_uri)
end

@external
func mint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr }(
    _to:felt, 
    token_id: Uint256):
    Ownable_only_owner()
    ERC721_mint(_to, token_id)
    return()
end

@external
func claim{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(_to: felt):
    let token_id: Uint256 = next_token_id_storage.read()    
    let _next_token_id:Uint256 = uint256_add( token_id, Uint256(1,0))
    next_token_id_storage.write(_next_token_id)
    ERC721_mint(_to, token_id)
    return()
end