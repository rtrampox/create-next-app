import "server-only";

import { headers } from "next/headers";

export async function getCurrentPath(): Promise<URL> {
	const h = await headers();
	return new URL(h.get("x-current-href") as string);
}
