import { IComment } from "../../types/IComment";
import { IResolvers } from "../../types/IResolvers";

const resolvers: IResolvers = {
	Comment: {
		isMine: ({ userId }: IComment, _, { user }) => {
			return userId === user?.id
		}
	}
}

export default resolvers;