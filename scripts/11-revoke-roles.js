import sdk from "./1-initialize-sdk.js";

(async () => {
	try {
		const token = await sdk.getContract("0x8D2A99EE32a1AF771b93b2bF5757f967f8F96947", "token");
		const allRoles = await token.roles.getAll();

		console.log("👀 Roles that exist right now:", allRoles);

		await token.roles.setAll({ admin: [], minter: [] });
		console.log(
			"🎉 Roles after revoking ourselves",
			await token.roles.getAll()
		);
		console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

	} catch (error) {
		console.error("Failed to revoke ourselves from the DAO treasury", error);
	}
})();
