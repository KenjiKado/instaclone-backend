import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewDialog: withUserResolvers(async (_, { dialogId }, { user }) => {
			return client.dialog.findFirst({
				where: {
					id: dialogId,
					users: {
						some: {
							id: user.id
						}
					}
				}
			});

		})
	}
}

export default resolvers;