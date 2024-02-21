import client from "../../../client";
import { withUserResolvers } from "../../../helpers/users.helper";
import { IResolvers } from "../../../types/IResolvers";

const resolvers: IResolvers = {
	Mutation: {
		toggleLike: withUserResolvers(async (_, { id }: { id: number }, { user }) => {
			const photo = await client.photo.findUnique({
				where: {
					id
				}
			});

			if (!photo) {
				return {
					ok: false,
					error: "Фотография не найдена"
				}
			}

			const like = await client.like.findUnique({
				where: {
					photoId_userId: {
						photoId: id,
						userId: user.id
					}
				}
			});

			if (like) {
				await client.like.delete({
					where: {
						photoId_userId: {
							photoId: id,
							userId: user.id
						}
					}
				})
			} else {
				await client.like.create({
					data: {
						user: {
							connect: {
								id: user.id
							}
						},
						photo: {
							connect: { id }
						}
					}
				})
			}
			return {
				ok: true
			}

		})
	}
}

export default resolvers;