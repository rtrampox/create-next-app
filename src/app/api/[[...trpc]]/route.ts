import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

import { env } from "@/env/server";
import { appRouter } from "@/server/api";
import { createTRPCContext } from "@/server/api/trpc";

const createContext = async (req: NextRequest, resHeaders: Headers) => {
	return createTRPCContext({
		headers: req.headers,
		resHeaders,
	});
};

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: "/api",
		req,
		router: appRouter,
		createContext: ({ resHeaders }) => createContext(req, resHeaders),
		onError:
			env.NODE_ENV === "development"
				? ({ path, error }) => {
						console.error(`[TRPC] Error on ${path ?? "unknown path"} ${error.message}`);
				  }
				: undefined,
		responseMeta: ({ ctx }) => {
			if (ctx) {
				return { headers: ctx.resHeaders };
			}
			return {};
		},
	});
};

export { handler as GET, handler as POST };
