import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { headers } from "next/headers";

import { makeQueryClient } from "./query-client";
import { createTRPCContext } from "../server/api/trpc";
import { appRouter } from "../server/api";

export const getQueryClient = cache(makeQueryClient);

const createContext = cache(async () => {
	const heads = new Headers(await headers());
	heads.set("x-trpc-source", "rsc");

	const resHeaders = new Headers();

	return createTRPCContext({
		headers: heads,
		resHeaders,
	});
});

const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
});

const caller = appRouter.createCaller(createContext);

export {
	/**
	 * TRPC server-side options proxy that you can with react-query prefetching.
	 */
	trpc,
	/**
	 * TRPC server-side caller that you can use to call your endpoints.
	 */
	caller as api,
};
