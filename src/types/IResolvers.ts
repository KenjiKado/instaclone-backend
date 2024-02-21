import { PrismaClient, User } from "@prisma/client";

export type IPrismaTypes = 'Mutation' | 'Query';

export type IContext = {
	user?: User
}

export type IResolver = (root: any, args: { [key: string]: any }, context: IContext, info: any) => any;

export type ISubscription = { subscribe: IResolver };

export type IResolvers = {
	[key: string]: {
		[key: string]: IResolver | ISubscription
	};
};