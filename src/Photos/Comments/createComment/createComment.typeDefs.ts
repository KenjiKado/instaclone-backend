import { gql } from "apollo-server-express";

export default gql`
	type CreateCommentMutationResponse {
		ok: Boolean!
		error: String
		id: Int!
	}
	type Mutation {
		createComment(photoId: Int!, text: String!): CreateCommentMutationResponse!
	}
`;