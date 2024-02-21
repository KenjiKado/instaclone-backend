import { gql } from "apollo-server-express";

export default gql`
	type Query {
		comments(photoId: Int!, lastCommentId: Int): [Comment]
	}
`;