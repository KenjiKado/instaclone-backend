import client from "../../client"
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	username: string;
	page: number;
	size: number;
}

const resolvers: IResolvers = {
	Query: {
		viewFollowers: async (_, { username, page, size }: IParams) => {
			const isUser = await client.user.findUnique({
				where: {
					username
				},
				select: { id: true }
			});

			if (isUser) {
				const followers = await client.user.findUnique({
					where: {
						username
					}
				}).followers({
					skip: (page - 1) * size,
					take: size
				});

				const totalCount = await client.user.count({
					where: {
						following: {
							some: { username }
						}
					}
				})

				return {
					ok: true,
					followers,
					totalCount,
					totalPages: Math.ceil(totalCount / size)
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