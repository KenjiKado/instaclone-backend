import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema, { resolvers, typeDefs } from './schema';
import { getUser } from "./helpers/users.helper";
import { graphqlUploadExpress } from "graphql-upload";

const startServer = async () => {
	const app = express();
	const httpServer = createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/graphql',
	});

	const subscriptionServer = useServer({
		schema,
		context: async ({ connectionParams }) => {
			const { token } = connectionParams;
			if (!token) {
				return {
					user: null
				}
			}
			const currentUser = await getUser(token as string);
			return {
				user: currentUser
			}
		}
	}, wsServer);

	const server = new ApolloServer({
		typeDefs, resolvers,
		context: async ({ req }) => {
			if (req) {
				const user = await getUser(req.headers.token as string);
				return {
					user
				}
			}
		},
		csrfPrevention: true,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await subscriptionServer.dispose();
						},
					};
				},
			},
		],

	});

	app.use(graphqlUploadExpress());

	await server.start();

	server.applyMiddleware({ app });

	const PORT = 4000;

	return httpServer.listen(PORT, () => {
		console.log(
			`Server is running on http://localhost:${PORT}${server.graphqlPath}`,
		);
	});
}

startServer();