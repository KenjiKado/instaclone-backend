import { gql } from "apollo-server-express";

export default gql`
	type Subscription {
		updateDialog(dialogId: Int): Message
	}
`;