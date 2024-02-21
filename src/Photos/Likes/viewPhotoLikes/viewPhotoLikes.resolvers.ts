import client from "../../../client";
import { IResolvers } from "../../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewPhotoLikes: async (_, { id, lastId }: { id: number, lastId: number }) => {
			const likes = await client.like.findMany({
				where: {
					photoId: id
				},
				select: {
					user: {
						select: {
							id: true,
							username: true,
							firstName: true,
							lastName: true,
							avatar: true
						}
					}
				},
				skip: lastId ? 1 : 0,
				take: 10,
				...(lastId && {
					cursor: {
						photoId_userId: {
							photoId: id,
							userId: lastId
						}
					}
				})
			});

			return likes.map((like) => like.user)
		}
	}
}

export default resolvers;