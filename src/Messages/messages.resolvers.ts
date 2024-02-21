import client from "../client";
import { IResolvers } from "../types/IResolvers";

const resolvers: IResolvers = {
	Dialog: {
		users: ({ id }) => {
			return client.dialog.findUnique({
				where: {
					id
				}
			}).users();
		},
		messages: ({ id }, { lastMessageId }) => {
			return client.message.findMany({
				where: {
					dialogId: id
				},
				take: 10,
				skip: lastMessageId ? 1 : 0,
				...(lastMessageId && {
					cursor: {
						id: lastMessageId
					}
				}),
				orderBy: {
					createdAt: "desc"
				}
			})
		},
		unreadMessages: ({ id }, _, { user }) => {
			if (!user) {
				return 0;
			}
			return client.message.count({
				where: {
					dialogId: id,
					readed: false,
					author: {
						id: {
							not: user.id
						}
					}
				}
			})
		}
	},
	Message: {
		author: ({ id }) => client.message.findUnique({
			where: {
				id
			}
		}).author()
	}
}

export default resolvers;