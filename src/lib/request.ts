import "server-only";

import { headers } from "next/headers";

export async function getCurrentPath() {
	const h = await headers();
	return h.get("x-current-path") as string;
}
