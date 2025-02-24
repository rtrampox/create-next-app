import type { Config } from "drizzle-kit";

import { env } from "@/env/server";

export default {
	schema: "./src/server/db/schemas/*",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
} satisfies Config;
