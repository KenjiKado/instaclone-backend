import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewDialogs: withUserResolvers(async (_, __, { user }) => {
			return client.dialog.findMany({
				where: {
					users: {
						some: {
							id: user.id
						}
					}
				}
			})
		})
	}
}

export default resolvers;