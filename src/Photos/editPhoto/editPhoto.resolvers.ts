import client from "../../client";
import { processHashtags } from "../../helpers/hashtags.helper";
import { withUserResolvers } from "../../helpers/users.helper";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	id: number;
	description: string;
}

const resolvers: IResolvers = {
	Mutation: {
		editPhoto: withUserResolvers(async (_, { id, description }: IParams, { user }) => {
			const photo = await client.photo.findFirst({
				where: {
					id,
					userId: user.id
				},
				include: {
					hashtags: {
						select: {
							text: true
						}
					}
				}
			});

			if (!photo) {
				return {
					ok: false,
					error: "Фотография не найдена"
				}
			}

			const changedPhoto = await client.photo.update({
				where: {
					id
				},
				data: {
					description,
					hashtags: {
						disconnect: photo.hashtags,
						connectOrCreate: processHashtags(description)
					}
				}
			});

			if (changedPhoto) {
				return {
					ok: true
				}
			} else {
				return {
					ok: false,
					error: "Ошибка при изменении фотографии"
				}
			}
		})
	}
}

export default resolvers;