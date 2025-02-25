import { trpc } from "@/trpc/server";
import { HydrateClient, prefetch } from "@/trpc/react/server";

import { Greet } from "./greet";

export default async function Home() {
	await prefetch(
		trpc.hello.greet.queryOptions({
			text: "from TRPC",
		})
	);

	return (
		<HydrateClient>
			<main>
				<Greet />
			</main>
		</HydrateClient>
	);
}
