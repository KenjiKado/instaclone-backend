import client from "../../../client";
import { withUserResolvers } from "../../../helpers/users.helper";
import { IResolvers } from "../../../types/IResolvers";

const resolvers: IResolvers = {
	Mutation: {
		editComment: withUserResolvers(async (_, { commentId, text }, { user }) => {
			const comment = await client.comment.findUnique({
				where: {
					id: commentId
				},
				select: {
					userId: true
				}
			});

			if (!comment) {
				return {
					ok: false,
					error: "Комментарий не найден"
				}
			} else if (comment.userId !== user.id) {
				return {
					ok: false,
					error: "Нет доступа"
				}
			} else {
				await client.comment.update({
					where: {
						id: commentId
					},
					data: {
						text
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