import { gql } from "apollo-server-express";

export default gql`
	type Mutation {
		sendMessage(message: String!, dialogId: Int, userId: Int): MutationResponse!
	}
`;