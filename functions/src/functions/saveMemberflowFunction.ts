import * as functions from "firebase-functions";
import MemberflowRepository from "../repositories/MemberflowRepository";
import isAuthorised from "../helpers/isAuthorised";

export default functions.https.onRequest(async (req, res) => {
	const {token} = req.query;

	try {
		if (token && isAuthorised(token)) {
			const {date, joined, left, count} = req.body;

			if ([date, joined, left, count].indexOf(undefined) > -1) {
				throw new Error("You did not supply a date, joined, left or count value.");
			}

			const formattedDate = new Date(date).toISOString();

			await MemberflowRepository.create(formattedDate, {
				joined,
				left,
				count
			});

			return res.status(200).send("Successfully written to database.");
		}

		console.info("Unauthorised access attempt.");

		return res.status(401).send("Invalid authentication token.");
	} catch (error) {
		console.error(error);

		return res.status(500).send(error.message);
	}
});