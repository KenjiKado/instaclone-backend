import { gql } from "apollo-server";

export default gql`
	type User {
		id: Int!
		username: String!
		firstName: String!
		lastName: String
		email: String!
		avatar: String
		createdAt: String!
		updatedAt: String!
		following: [User]
		followers: [User]
		totalFollowers: Int!
		totalFollowing: Int!
		isMe: Boolean!
		isSubscribed: Boolean!
		photos: [Photo]
	}
`;