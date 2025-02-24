import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc";

export const helloRouter = createTRPCRouter({
	greet: baseProcedure.input(z.object({ text: z.string() })).query(async ({ input }) => {
		return {
			greeting: `hello ${input.text}`,
		};
	}),
});
