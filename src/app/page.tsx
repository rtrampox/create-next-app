import { api } from "@/trpc/server";
import { HydrateClient, prefetch } from "@/trpc/react/server";

import { Greet } from "./greet";

export default async function Home() {
	await prefetch(
		api.hello.greet.queryOptions({
			text: "TRPC",
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
