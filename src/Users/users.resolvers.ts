import client from "../client";
import { IResolvers } from "../types/IResolvers";
import { IUser } from "../types/IUser";

const resolvers: IResolvers = {
	User: {
		totalFollowers: async ({ id }: IUser) => {
			return client.user.count({
				where: {
					following: { some: { id } }
				}
			});
		},

		totalFollowing: async ({ id }: IUser) => {
			return client.user.count({
				where: {
					followers: { some: { id } }
				}
			});
		},

		isMe: ({ id }: IUser, _, { user: { id: userId } }) => {
			return id === userId;
		},

		isSubscribed: async ({ id }: IUser, _, { user: { username } }) => {
			if (!username) {
				return false;
			}
			return client.user.count({
				where: {
					username,
					following: {
						some: { id }
					}
				}
			});

		},

		photos: ({ id }: IUser, { lastId }: { lastId: number }) => {
			return client.user.findUnique({
				where: {
					id
				}
			}).photos({
				skip: lastId ? 1 : 0,
				take: 10,
				...(lastId && {
					cursor: {
						id: lastId
					}
				})
			})
		}
	}
}

export default resolvers;