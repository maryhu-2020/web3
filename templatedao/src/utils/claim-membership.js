
let isClaiming = false;

const claimMembership = (address, drop, setHasClaimedNFT) => {
    if (!address) {
        return;
    }

    isClaiming = true;    
    drop
    .claim("0", 1)
    .then(() => {      
      setHasClaimedNFT(true);      
      console.log(`Successfully Minted!`);
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {      
      isClaiming = false;
    });
};

const mintMembershipNFT = (address, drop, setHasClaimedNFT) => {
    return (
        <div className="mint-nft">
            <h1>Welcome to become a proud member of TemplateDAO</h1>
            <button
                disabled={isClaiming}
                onClick={() => claimMembership(address, drop, setHasClaimedNFT)}
            >
            {isClaiming ? "Minting..." : "Click to claim your membership"}
            </button>
        </div>
    );
}

export default mintMembershipNFT;