import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TRPCQueryOptions } from "@trpc/tanstack-react-query";

import { getQueryClient } from "@/trpc/server";

/**
 * Wrapper for react-query's HydrationBoundary
 */
export function HydrateClient({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	const dehydrated = dehydrate(queryClient);
	return <HydrationBoundary state={dehydrated}>{children}</HydrationBoundary>;
}

/**
 * Prefetches queries on the server-side using react-query's prefetch functions. This function will return a promise that resolves when all prefetches are done.
 *
 * Use HydrateClient to hydrate the client with the prefetched data.
 * @param options - The query options to prefetch
 *
 * @example
 * ```tsx
 * import { trpc } from "@/trpc/server";
 * import { HydrateClient, prefetch } from "@/trpc/react/server";
 *
 * import { Greet } from "./greet";
 *
 * export default async function Home() {
 * 	await prefetch(
 * 		trpc.hello.greet.queryOptions({
 * 			text: "from TRPC",
 * 		})
 * 	);
 *
 * 	return (
 * 		<HydrateClient>
 * 			<main>
 * 				<Greet />
 * 			</main>
 * 		</HydrateClient>
 *	);
 * ```
 */
export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(...options: T[]) {
	const queryClient = getQueryClient();
	const promises: Promise<void>[] = [];

	for (const option of options) {
		if (option.queryKey[1]?.type === "infinite") {
			promises.push(queryClient.prefetchInfiniteQuery(option as any));
		} else {
			promises.push(queryClient.prefetchQuery(option));
		}
	}

	const results = await Promise.allSettled(promises);
	results.forEach((result) => {
		if (result.status === "rejected") {
			console.error("A promise failed in prefetch:", result.reason);
		}
	});
}
