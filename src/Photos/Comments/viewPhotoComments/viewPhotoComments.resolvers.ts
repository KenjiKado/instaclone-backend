import client from "../../../client";
import { IResolvers } from "../../../types/IResolvers";

interface IParams {
	photoId: number;
	lastCommentId?: number;
}

const resolvers: IResolvers = {
	Query: {
		comments: async (_, { photoId, lastCommentId }: IParams) => {
			const comments = await client.comment.findMany({
				where: {
					photoId
				},
				orderBy: {
					createdAt: "desc"
				},
				include: {
					photo: true,
					user: true
				},
				take: 10,
				skip: lastCommentId ? 1 : 0,
				...(lastCommentId &&
				{
					cursor: {
						id: lastCommentId
					}
				})
			});

			return comments.reverse()
		}
	}
}

export default resolvers;