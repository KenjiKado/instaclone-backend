import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Mutation: {
		followUser: withUserResolvers(async (_, { username }: { username: string }, { user }) => {
			const isUser = await client.user.findUnique({
				where: {
					username
				},
				select: {
					id: true
				}
			});
			if (isUser) {
				await client.user.update({
					where: {
						id: user.id
					},
					data: {
						following: {
							connect: {
								username
							}
						}
					}
				})
				return {
					ok: true
				}
			} else {
				return {
					ok: false,
					error: "Пользователь не найден"
				}
			}
		})
	}
}

export default resolvers;