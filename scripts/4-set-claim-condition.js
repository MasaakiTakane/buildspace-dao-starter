import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

(async () => {
	try {
		const editionDrop = await sdk.getContract("0xa0480Aa19A9c6B4D89DC1F811b19cC3Eb47a7e1C", "edition-drop");
		const claimConditions = [{
			startTime: new Date(),
			maxClaimable: 50_000,
			price: 0,
			maxClaimablePerWallet: 1,
			waitInSeconds: MaxUint256,
		}]

		await editionDrop.claimConditions.set("0", claimConditions);
		console.log("✅ Sucessfully set claim condition!");
	} catch (error) {
		console.error("Failed to set claim condition", error);
	}
})();
