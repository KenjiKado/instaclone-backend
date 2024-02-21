import { gql } from "apollo-server";

export default gql`
	type Mutation {
		createAccount(
			username: String!
			firstName: String!
			lastName: String
			email: String!
			password: String!
		): MutationResponse!
	}
`;