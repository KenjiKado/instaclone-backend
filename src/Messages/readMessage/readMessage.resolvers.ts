import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Mutation: {
		readMessage: withUserResolvers(async (_, { messageId }, { user }) => {
			const message = await client.message.findFirst({
				where: {
					id: messageId,
					userId: {
						not: user.id
					},
					dialog: {
						users: {
							some: {
								id: user.id
							}
						}
					}
				},
				select: {
					id: true
				}
			});

			if (!message) {
				return {
					ok: false,
					error: "Сообщение не найдено"
				}
			} else {
				await client.message.update({
					where: {
						id: messageId
					},
					data: {
						readed: true
					}
				});

				return {
					ok: true
				}
			}
		})
	}
}

export default resolvers;