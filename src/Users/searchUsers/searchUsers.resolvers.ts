import client from "../../client"
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	searchQuery: string;
	lastId: number;
}
const resolvers: IResolvers = {
	Query: {
		searchUsers: async (_, { searchQuery, lastId }: IParams) => {
			const users = await client.user.findMany({
				where: {
					username: {
						startsWith: searchQuery.toLowerCase(),
						mode: 'insensitive'
					}
				},
				skip: lastId ? 1 : 0,
				take: 5,
				...(lastId && { cursor: { id: lastId } })
			});

			return users;
		}
	}
}

export default resolvers;