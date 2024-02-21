import { gql } from "apollo-server-express";

export default gql`
	type Query {
		viewPhotoLikes(id: Int!, lastId: Int): [User]
	}
`;