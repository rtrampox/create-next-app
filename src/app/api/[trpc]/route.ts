import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

import { env } from "@/env/server";
import { appRouter } from "@/server/trpc";
import { createTRPCContext } from "@/server/trpc/trpc";

const createContext = async (req: NextRequest) => {
	return createTRPCContext({
		headers: req.headers,
	});
};

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: "/api",
		req,
		router: appRouter,
		createContext: () => createContext(req),
		onError: env.NODE_ENV === "development" ? ({}) => {} : undefined,
	});
};

export { handler as GET, handler as POST };
