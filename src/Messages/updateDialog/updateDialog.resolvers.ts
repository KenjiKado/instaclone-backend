import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants/triggers";
import pubsub from "../../pubsub";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Subscription: {
		updateDialog: {
			subscribe: async (root, args, context, info) => {
				const { dialogId } = args;
				const { user } = context;

				if (!user) {
					throw new Error("Войдите в аккаунт")
				}

				const dialog = await client.dialog.findFirst({
					where: {
						id: dialogId,
						users: {
							some: {
								id: user.id
							}
						}
					},
					select: { id: true }
				});

				if (!dialog) {
					throw new Error("Нет доступа к диалогу")
				}

				const filterSubscription = withFilter(
					() => {
						return pubsub.asyncIterator(NEW_MESSAGE)
					},
					({ updateDialog }, { dialogId }) => {
						return updateDialog.dialogId === dialogId
					}
				);

				return filterSubscription(root, args, context, info);
			}
		},

	}
}

export default resolvers;