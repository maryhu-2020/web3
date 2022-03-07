import type { NextPage} from "next";
import { useAMMContract } from "~/hooks/amm";

const NFTHome: NextPage = () => {
    const {contract:ammContract} = useAMMContract() 




    return (
        <div>
            <h1>NFT Home</h1>
        </div>

    );
}

export default NFTHome