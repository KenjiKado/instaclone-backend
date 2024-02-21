import client from "../client";
import { IPhoto } from "../types/IPhoto";
import { IResolvers } from "../types/IResolvers";

const resolvers: IResolvers = {
	Photo: {
		author: ({ userId }: IPhoto) => {
			return client.user.findUnique({
				where: {
					id: userId
				}
			});
		},
		isMine: ({ userId }: IPhoto, _, { user }) => {
			return userId === user?.id
		},
		isLiked: async ({ id }: IPhoto, _, { user }) => {
			if (!user?.id) {
				return false;
			}

			const like = await client.like.findUnique({
				where: {
					photoId_userId: {
						photoId: id,
						userId: user.id
					}
				}
			});

			return Boolean(like);
		},
		hashtags: ({ id }: IPhoto) => {
			return client.hashtag.findMany({
				where: {
					photos: {
						some: {
							id
						}
					}
				}
			});
		},
		likes: ({ id }: IPhoto) => {
			return client.like.count({
				where: {
					photoId: id
				}
			})
		},
		commentNumber: ({ id }: IPhoto) => {
			return client.comment.count({
				where: {
					photoId: id
				}
			})
		},
	}
}

export default resolvers;