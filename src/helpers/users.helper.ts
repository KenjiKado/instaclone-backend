import {verify} from "jsonwebtoken";
import client from "../client";
import { IInfo } from "../types/IInfo";
import { IContext, IResolver } from "../types/IResolvers";

interface JwtPayload {
	id: number
}

export const getUser = async (token: string) => {
	try {
		if (!token) {
			return null;
		}
		const { id } = await verify(token, process.env.SECRET_KEY) as JwtPayload;
		return client.user.findUnique({
			where: {
				id
			}
		})
	} catch (e) {
		return null;
	}
}

export const withUserResolvers = (resolver: IResolver) => (root: any, args: { [key: string]: any; }, context: IContext, info: IInfo) => {
	if (!context.user?.id) {
		if (info.operation.operation === 'query') {
			return null
		} else {
			return {
				ok: false,
				error: "Пожалуйста войдите в аккаунт"
			}
		}
	} else {
		return resolver(root, args, context, info)
	}
};

