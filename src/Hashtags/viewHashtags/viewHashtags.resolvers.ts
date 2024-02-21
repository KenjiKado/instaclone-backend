import client from "../../client";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	hashtag: string;
}

const resolvers: IResolvers = {
	Query: {
		viewHashtag: (_, { hashtag }: IParams) => {
			return client.hashtag.findUnique({
				where: {
					text: hashtag
				}
			})
		}
	}
}

export default resolvers;