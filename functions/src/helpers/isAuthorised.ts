import * as functions from "firebase-functions";

/**
 * Checks whether or not the request was authorised.
 * @param {string} token | The token supplied in the request.
 * @returns {Boolean}
 */
function isAuthorised(token: string): Boolean {
	return functions.config().auth.token === token;
}

export default isAuthorised;