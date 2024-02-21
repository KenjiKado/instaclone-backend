import { gql } from "apollo-server-express";

export default gql`
	type ViewFollowingResponse {
		ok: Boolean!
		error: String
		following: [User]
	}
	type Query {
		viewFollowing(username: String!, lastId: Int, size: Int!): ViewFollowingResponse!
	}
`;
