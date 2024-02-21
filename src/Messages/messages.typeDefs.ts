import { gql } from "apollo-server-express"

export default gql`
	type Message {
		id: Int!
		text: String!
		author: User!
		dialog: Dialog!
		readed: Boolean!
		createdAt: String!
		updatedAt: String!
	}

	type Dialog {
		id: Int!
		users: [User]!
		messages(lastMessageId: Int): [Message]!
		unreadMessages: Int!
		createdAt: String!
		updatedAt: String!
	}
`;