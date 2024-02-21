import client from "../../client";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Query: {
		viewPhoto: (_, { id }) => {
			return client.photo.findUnique({
				where: {
					id
				}
			})
		}
	}
}

export default resolvers;