import client from "../../client";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewProfile: (_, { username }: { username: string }) => {
			return client.user.findUnique({
				where: {
					username
				},
				include: {
					followers: true,
					following: true
				}
			})
		}
	}
}

export default resolvers;