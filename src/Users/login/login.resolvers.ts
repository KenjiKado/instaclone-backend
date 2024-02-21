import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { IResolvers } from "../../types/IResolvers";

interface IParams {
	username: string;
	password: string;
}
const resolvers: IResolvers = {

	Mutation: {
		login: async (_, { username, password }: IParams) => {
			const user = await client.user.findUnique({
				where: {
					username
				}
			});

			if (!user) {
				return {
					ok: false,
					error: "Пользователь не найден"
				}
			}

			const isPasswordMatches = await bcrypt.compare(password, user.password);

			if (isPasswordMatches) {
				const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
				return {
					ok: true,
					token
				}
			} else {
				return {
					ok: false,
					error: "Неверный пароль. Проверьте правильность введенного пароля"
				}
			}
		}
	}
}

export default resolvers;