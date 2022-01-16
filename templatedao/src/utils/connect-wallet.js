const connectToWallet = (connectWallet) =>{
    return (
      <div className="landing">
        <h1>Welcome to TemplateDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
}

export default connectToWallet;