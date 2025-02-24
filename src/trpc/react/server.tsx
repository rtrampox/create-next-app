import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TRPCQueryOptions } from "@trpc/tanstack-react-query";

import { getQueryClient } from "@/trpc/server";

export function HydrateClient({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	const dehydrated = dehydrate(queryClient);
	return <HydrationBoundary state={dehydrated}>{children}</HydrationBoundary>;
}

export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(options: T) {
	const queryClient = getQueryClient();

	if (options.queryKey[1]?.type === "infinite") {
		void (await queryClient.prefetchInfiniteQuery(options as any));
	} else {
		void (await queryClient.prefetchQuery(options));
	}
}
