import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const helloRouter = createTRPCRouter({
	greet: publicProcedure.input(z.object({ text: z.string() })).query(async ({ input }) => {
		return {
			greeting: `hello ${input.text}`,
		};
	}),
});
