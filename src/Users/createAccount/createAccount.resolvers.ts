import bcrypt from "bcrypt";
import client from "../../client";
import { IResolvers } from "../../types/IResolvers";


interface IParams {
	username: string,
	firstName: string,
	lastName?: string,
	email: string,
	password: string
}

const resolvers: IResolvers = {
	Mutation: {
		createAccount: async (_, {
			username,
			firstName,
			lastName,
			email,
			password
		}: IParams) => {
			try {
				const isUserExists = await client.user.findFirst({
					where: {
						OR: [
							{
								username
							},
							{
								email
							}
						]
					}
				});

				if (isUserExists) {
					throw new Error("Пользователь с указанными данными уже существует");
				}

				const hashPassword = await bcrypt.hash(password, 10);

				await client.user.create({
					data: {
						username,
						firstName,
						lastName,
						email,
						password: hashPassword
					}
				});

				return {
					ok: true
				}

			} catch (error) {
				return {
					ok: false,
					error
				}
			}
		},
	}
}

export default resolvers;