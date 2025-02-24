import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { headers } from "next/headers";

import { makeQueryClient } from "./query-client";
import { createTRPCContext } from "../server/trpc/trpc";
import { appRouter } from "../server/trpc";

export const getQueryClient = cache(makeQueryClient);

const createContext = cache(async () => {
	const heads = new Headers(await headers());
	heads.set("x-trpc-source", "rsc");

	return createTRPCContext({
		headers: heads,
	});
});

const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
});

const caller = appRouter.createCaller(createContext);

export { trpc as api, caller };
