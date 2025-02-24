import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	},

	experimental__runtimeEnv: process.env,
});
