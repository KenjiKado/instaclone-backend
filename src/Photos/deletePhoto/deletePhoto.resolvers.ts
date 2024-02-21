import client from "../../client";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Mutation: {
		deletePhoto: withUserResolvers(async (_, { photoId }, { user }) => {
			const photo = await client.photo.findUnique({
				where: {
					id: photoId
				},
				select: {
					userId: true,
					Comments: true,
					Likes: true
				}
			})
			if (!photo) {
				return {
					ok: false,
					error: "Фотография не найдена"
				}
			} else if (photo.userId !== user.id || photo.Likes.length) {
				return {
					ok: false,
					error: "Нет доступа"
				}
			} else {
				await client.photo.delete({
					where: {
						id: photoId
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