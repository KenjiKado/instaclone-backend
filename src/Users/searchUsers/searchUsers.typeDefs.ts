import { gql } from "apollo-server-express";

export default gql`
	type Query {
		searchUsers(searchQuery: String!, lastId: Int): [User]
	}
`;