import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewFeed: withUserResolvers(async (_, { lastId }, { user }) => {
			const list = await client.photo.findMany({
				where: {
					OR: [
						{
							author: {
								followers: {
									some: {
										id: user.id
									}
								}
							},
						},
						{
							userId: user.id
						}
					]
				},
				orderBy: {
					createdAt: "desc"
				},
				take: 5,
				skip: lastId ? 1 : 0,
				...(lastId && {
					cursor: {
						id: lastId
					}
				})
			});

			return list

		})
	}
}

export default resolvers;