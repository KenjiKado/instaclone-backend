import client from "../../client";
import { NEW_MESSAGE } from "../../constants/triggers";
import { withUserResolvers } from "../../helpers/users.helper";
import pubsub from "../../pubsub";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	message: string;
	dialogId?: number;
	userId?: number;
}

const resolvers: IResolvers = {
	Mutation: {
		sendMessage: withUserResolvers(async (_, { message, dialogId, userId }: IParams, { user }) => {
			let dialog = null;
			if (userId) {
				const interlocutor = await client.user.findUnique({
					where: {
						id: userId
					},
					select: {
						id: true
					}
				});

				if (!interlocutor) {
					return {
						ok: false,
						error: "Пользователь не найден"
					}
				}

				dialog = await client.dialog.findFirst({
					where: {
						users: {
							some: {
								id: userId
							}
						}
					}
				});

				if (!dialog) {
					dialog = await client.dialog.create({
						data: {
							users: {
								connect: [
									{
										id: userId
									},
									{
										id: user.id
									}
								]
							}
						}
					});
				}
			} else if (dialogId) {
				dialog = await client.dialog.findUnique({
					where: {
						id: dialogId
					},
					select: {
						id: true
					}
				});
			}

			if (!dialog) {
				return {
					ok: false,
					error: "Чат не найден"
				}
			}
			const createdMessage = await client.message.create({
				data: {
					text: message,
					author: {
						connect: {
							id: user.id
						}
					},
					dialog: {
						connect: {
							id: dialog.id
						}
					}
				}
			});

			pubsub.publish(NEW_MESSAGE, {
				updateDialog: createdMessage
			})


			return {
				ok: true
			}

		})
	}
}

export default resolvers;