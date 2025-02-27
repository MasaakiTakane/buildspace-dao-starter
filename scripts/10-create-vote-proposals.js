import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
	try {
		const vote = await sdk.getContract("0xc050Cd5aC7c1BDaE942D334068dC5A494193e90d", "vote");
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const amount = 420_000;
		const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
		const executions = [
			{
				toAddress: token.getAddress(),
				nativeTokenValue: 0,
				transactionData: token.encoder.encode(
					"mintTo", [
						vote.getAddress(),
						ethers.utils.parseUnits(amount.toString(), 18),
				]
				),
			}
		];

		await vote.propose(description, executions);

		console.log("✅ Successfully created proposal to mint tokens");
	} catch (error) {
		console.error("failed to create first proposal", error);
		process.exit(1);
	}

	try {
		const vote = await sdk.getContract("0xc050Cd5aC7c1BDaE942D334068dC5A494193e90d", "vote");
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const amount = 6_900;
		const description = "Should the DAO transfer " + amount + " tokens from the treasury to " + process.env.WALLET_ADDRESS + " for being awesome?";
		const executions = [
			{
				nativeTokenValue: 0,
				transactionData: token.encoder.encode(
					"transfer",
					[
						process.env.WALLET_ADDRESS,
						ethers.utils.parseUnits(amount.toString(), 18),
					]
				),
				toAddress: token.getAddress(),
			},
		];

		await vote.propose(description, executions);

		console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
	} catch (error) {
		console.error("failed to create second proposal", error);
	}
})();
