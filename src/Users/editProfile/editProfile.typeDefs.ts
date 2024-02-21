import { gql } from "apollo-server";

export default gql`
	type Mutation {
		editProfile(
			username: String
			firstName: String
			lastName: String
			email: String
			bio: String
			password: String
			avatar: Upload
		): MutationResponse!
	}
`;
