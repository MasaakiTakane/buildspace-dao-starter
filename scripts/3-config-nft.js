import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
	try {
		const editionDrop = await sdk.getContract("0xa0480Aa19A9c6B4D89DC1F811b19cC3Eb47a7e1C", "edition-drop");
		await editionDrop.createBatch([
			{
				name: "Shark Meat",
				description: "This NFT will give you access to RecipeDAO!",
				image: readFileSync("scripts/assets/shark.png"),
			},
		]);
		console.log("✅ Successfully created a new NFT in the drop!");
	} catch (error) {
		console.error("failed to create the new NFT", error);
	}
})();
