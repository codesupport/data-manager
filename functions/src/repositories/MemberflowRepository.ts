import {firestore} from "../services/Firebase";
import MemberflowObject from "../interfaces/MemberflowObject";

class MemberflowRepository {
	private readonly discordCollection = firestore.collection("discord");
	private readonly memberflowDocument = this.discordCollection.doc("memberflow");
	private readonly daysCollection = this.memberflowDocument.collection("days");

	/**
	 * Creates a new day entry within the discord/memberflow/days collection.
	 * @param {string} date | The date that the data relates to.
	 * @param {MemberflowObject} data | The data to save to Firestore.
	 * @returns {Promise<WriteResult>}
	 */
	async create(date: string, data: MemberflowObject) {
		const formattedDate = new Date(date).toISOString();
		const {joined, left, count} = data;

		return this.daysCollection.doc(formattedDate).set({
			joined,
			left,
			count
		});
	}
}

export default new MemberflowRepository();