import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		currentUser: withUserResolvers((_, __, { user: { id } }) => {
			return client.user.findUnique({
				where: {
					id
				}
			})
		})
	}
}

export default resolvers;