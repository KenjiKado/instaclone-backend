import { Prisma } from "@prisma/client";

export const processHashtags = (description: string): Prisma.HashtagCreateOrConnectWithoutPhotosInput[] => {
	if (!description) {
		return null;
	}
	return description.match(/(?:^|\s)(#[A-zА-я\d-_]+)/g)?.map((data: string) => {
		const hashtag = data.replace(/\n|\s/i, '');
		return {
			where: {
				text: hashtag
			},
			create: {
				text: hashtag
			}
		}
	});
}