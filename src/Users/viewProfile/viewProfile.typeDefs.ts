import { gql } from "apollo-server";

export default gql`
	type Query {
		viewProfile(username: String!): User
	}
`;