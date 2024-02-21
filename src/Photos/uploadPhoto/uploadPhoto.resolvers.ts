import { Prisma } from "@prisma/client";
import client from "../../client";
import { uploadNewFileFromStream } from "../../helpers/fileUpload";
import { processHashtags } from "../../helpers/hashtags.helper";
import { withUserResolvers } from "../../helpers/users.helper";
import { IFileUpload } from "../../types/IFileUpload";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	file: Promise<IFileUpload>;
	description?: string;
}

const resolvers: IResolvers = {
	Mutation: {
		uploadPhoto: withUserResolvers(async (_, { file, description }: IParams, { user: { id } }) => {
			const hashtags: Prisma.HashtagCreateOrConnectWithoutPhotosInput[] = processHashtags(description);

			const { filename, createReadStream } = await file;
			const readStream = createReadStream();
			const url = await uploadNewFileFromStream(`photos/${filename}`, readStream);

			return client.photo.create({
				data: {
					url,
					description,
					author: {
						connect: {
							id
						}
					},
					...(hashtags?.length && {
						hashtags: {
							connectOrCreate: hashtags
						}
					})
				}
			});
		})
	}
}

export default resolvers;