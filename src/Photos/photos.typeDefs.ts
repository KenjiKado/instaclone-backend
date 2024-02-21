import { gql } from "apollo-server-express";

export default gql`
	type Like {
		id: Int!
		photo: Photo!
		user: User!
		createdAt: String!
		updatedAt: String!
	}

	type PhotoComments {
		list: [Comment]
		hasMore: Boolean!
	}
	
	type Photo {
		id: Int!
		author: User!
		url: String!
		description: String
		hashtags: [Hashtag]
		likes: Int!
		commentNumber: Int!
		isMine: Boolean!
		isLiked: Boolean!
		createdAt: String!
		updatedAt: String!
	}
`;