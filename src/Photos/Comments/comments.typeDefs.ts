import { gql } from "apollo-server-express";

export default gql`
	type Comment {
		id: Int!
		user: User!
		photo: Photo!
		text: String!
		createdAt: String!
		updatedAt: String!
		isMine: Boolean!
	}
`;