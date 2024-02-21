import client from "../../client";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	username: string;
	lastId: number;
	size: number;
}
const resolvers: IResolvers = {
	Query: {
		viewFollowing: async (_, { username, lastId, size }) => {
			const isUser = await client.user.findUnique({
				where: {
					username
				},
				select: { id: true }
			});

			if (isUser) {
				const following = await client.user.findUnique({
					where: {
						username
					}
				}).following({
					skip: lastId ? 1 : 0,
					take: size,
					...(lastId && { cursor: { id: lastId } })
				});

				return {
					ok: true,
					following
				}
			} else {
				return {
					ok: false,
					error: "Пользователь не найден"
				}
			}
		}
	}
}

export default resolvers;