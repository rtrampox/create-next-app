import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { ZodError } from "zod";

import { db } from "@/server/db";

export const createTRPCContext = cache(async (opts: { headers: Headers; resHeaders: Headers }) => {
	const resHeaders = new Headers(opts.resHeaders);

	return {
		db,
		...opts,
		resHeaders,
	};
});

const t = initTRPC.context<typeof createTRPCContext>().create({
	// transformer: superjson,
	errorFormatter: ({ shape, error }) => ({
		...shape,
		data: {
			...shape.data,
			zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
		},
	}),
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now();
	if (t._config.isDev) {
		const waitMs = Math.floor(Math.random() * 400) + 100;
		await new Promise((resolve) => setTimeout(resolve, waitMs));
	}

	const result = await next();

	const end = Date.now();
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

	return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);
