import sdk from "./1-initialize-sdk.js";

(async () => {
	try {
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const amount = 424242424242424242;

		await token.mint(amount);
		const totalSupply = await token.totalSupply();

		console.log("✅ There now is", totalSupply.displayValue, "$TOKYO in circulation");
	} catch (error) {
		console.error("Failed to print money", error);
	}
})();
