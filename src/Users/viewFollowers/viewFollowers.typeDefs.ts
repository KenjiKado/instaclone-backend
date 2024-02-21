import { gql } from "apollo-server-express";

export default gql`
	type ViewFollowersResponse {
		ok: Boolean!
		error: String
		followers: [User]
		totalCount: Int
		totalPages: Int
	}
	type Query {
		viewFollowers(username: String!, page: Int!, size: Int!): ViewFollowersResponse!
	}
`;