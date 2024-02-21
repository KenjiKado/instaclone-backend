import client from "../../../client";
import { withUserResolvers } from "../../../helpers/users.helper";
import { IResolvers } from "../../../types/IResolvers";

interface IParams {
	photoId: number;
	text: string;
}

const resolvers: IResolvers = {
	Mutation: {
		createComment: withUserResolvers(async (_, { photoId, text }, { user }) => {
			const photo = await client.photo.findUnique({
				where: {
					id: photoId
				},
				select: {
					id: true
				}
			});

			if (!photo) {
				return {
					ok: false,
					error: "фотография не найдена"
				}
			}

			const newComment = await client.comment.create({
				data: {
					text,
					photo: {
						connect: {
							id: photoId
						}
					},
					user: {
						connect: {
							id: user.id
						}
					}
				}
			});

			return {
				ok: true,
				id: newComment.id
			}
		})
	}
}

export default resolvers;