import { gql } from "apollo-server-express";

export default gql`
	type Mutation {
		editComment(commentId: Int!, text: String!): MutationResponse!
	}
`;