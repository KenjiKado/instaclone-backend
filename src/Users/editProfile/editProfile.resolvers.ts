import bcrypt from "bcrypt";
import client from "../../client";
import { uploadNewFileFromStream } from "../../helpers/fileUpload";
import { withUserResolvers } from "../../helpers/users.helper";
import { IFileUpload } from "../../types/IFileUpload";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	bio?: string;
	avatar?: Promise<IFileUpload>,
	password?: string;
}

const editUser = async (_, {
	username,
	firstName,
	lastName,
	email,
	bio,
	avatar,
	password: newPassword
}: IParams, { user = null }) => {
	let hashedPassword: string;
	let avatarUrl: string;

	if (avatar) {
		const { filename, createReadStream } = await avatar;
		const readStream = createReadStream();
		avatarUrl = await uploadNewFileFromStream(`avatars/${filename}`, readStream);
	}

	if (newPassword) {
		hashedPassword = await bcrypt.hash(newPassword, 10);
	}
	const result = await client.user.update({
		where: {
			id: user.id
		},
		data: {
			username,
			firstName,
			lastName,
			email,
			bio,
			...(avatarUrl && { avatar: avatarUrl }),
			...(hashedPassword && { password: hashedPassword })
		}
	});

	if (result.id) {
		return {
			ok: true
		}
	} else {
		return {
			ok: false,
			error: "Не удалось обновить данные пользователя"
		}
	}
}

const resolvers: IResolvers = {
	Mutation: {
		editProfile: withUserResolvers(editUser)
	}
}

export default resolvers;