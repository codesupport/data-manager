import * as functions from "firebase-functions";

function isAuthorised(token: string): Boolean {
	return functions.config().auth.token === token;
}

export default isAuthorised;