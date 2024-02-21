import { gql } from "apollo-server-express";

export default gql`
	type Query {
		viewDialog(dialogId: Int!): Dialog
	}
`;