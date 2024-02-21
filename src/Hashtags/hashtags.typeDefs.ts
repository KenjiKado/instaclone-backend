import { gql } from "apollo-server-express";

export default gql`
	type Hashtag {
		id: Int!
		text: String!
		photos(lastId: Int): [Photo]!
		totalCount: Int!
		createdAt: String!
		updatedAt: String!
	}
`;