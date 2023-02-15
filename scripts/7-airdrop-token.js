import sdk from "./1-initialize-sdk.js";

(async () => {
	try {
		const editionDrop = await sdk.getContract("0xa0480Aa19A9c6B4D89DC1F811b19cC3Eb47a7e1C", "edition-drop");
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

		if (walletAddresses.length === 0) {
			console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",);
			process.exit(0);
		}

		const airdropTargets = walletAddresses.map((address) => {
			const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) +1000);
			console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

			const airdropTarget = {
				toAddress: address,
				amount: randomAmount,
			};

			return airdropTarget;
		});

		console.log("🌈 Starting airdrop...");
		await token.transferBatch(airdropTargets);
		console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
	} catch (err) {
		console.error("Failed to airdrop tokens", err);
	}
})();
