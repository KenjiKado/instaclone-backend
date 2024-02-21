import client from "../client";
import { IHashtag } from "../types/IHashtag";
import { IResolvers } from "../types/IResolvers";

interface IParams {
	lastId: number;
}

const resolvers: IResolvers = {
	Hashtag: {
		totalCount: ({ id }: IHashtag) => {
			return client.photo.count({
				where: {
					hashtags: {
						some: {
							id
						}
					}
				}
			});
		},
		photos: ({ id }: IHashtag, { lastId }: IParams) => {
			return client.hashtag.findUnique({
				where: {
					id
				}
			}).photos({
				skip: lastId ? 1 : 0,
				take: 5,
				...(lastId && { cursor: { id: lastId } })
			});
		}
	}
}

export default resolvers;