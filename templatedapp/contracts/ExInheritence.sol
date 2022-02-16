// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Owned {
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }
}


contract Destructible is Owned{
    function destroy() virtual public {
        if ( msg.sender == owner)
            selfdestruct( owner);            
    }
}

abstract contract Config {
    function lookup( uint id) virtual public returns( address);
}

abstract contract NamedReg {
    function register( bytes32 name) public virtual;
    function unregister( ) public virtual;
}

contract Named is Owned, Destructible{
    constructor( bytes32 name){
        Config config = Config(0xD5f9D8D94886E70b06E474c3fB14Fd43E2f23970);
        NamedReg( config.lookup(1)).register(name); 
    }

    function destroy() public virtual override {
        if( msg.sender == owner){
            Config config = Config(0xD5f9D8D94886E70b06E474c3fB14Fd43E2f23970);
            NamedReg( config.lookup(1)).unregister();
            super.destroy();
        }
    }

}

contract PriceFeed is Owned, Destructible, Named('Nikki'){
    uint info;

    function updateInfor(uint newInfo) external {
        if( msg.sender == owner)
            info = newInfo;
    }

    function get() public view returns( uint){
        return info;
    }

    function destroy() public override(Named,Destructible) {
        super.destroy();
    }
}

