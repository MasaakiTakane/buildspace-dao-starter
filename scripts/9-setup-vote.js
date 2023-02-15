import sdk from "./1-initialize-sdk.js";

(async () => {
	try {
		const vote = await sdk.getContract("0xc050Cd5aC7c1BDaE942D334068dC5A494193e90d", "vote");
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		await token.roles.grant("minter", vote.getAddress());

		console.log(
			"Successfully gave vote contract permissions to act on token contract"
		);
	} catch (error) {
		console.error(
			"failed to grant vote contract permissions on token contract",
			error
		);
		process.exit(1);
	}

	try {
		const vote = await sdk.getContract("0xc050Cd5aC7c1BDaE942D334068dC5A494193e90d", "vote");
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const ownedTokenBalance = await token.balanceOf(
			process.env.WALLET_ADDRESS
		);

		const ownedAmount = ownedTokenBalance.displayValue;
		const percent90 = Number(ownedAmount) / 100 * 90;

		await token.transfer(
			vote.getAddress(),
			percent90
		);

		console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
	} catch (err) {
		console.log("failed to transfer tokens to vote contract", err);
	}
})();
