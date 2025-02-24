"use client";

import { useTRPC } from "@/trpc/react/client";
import { useQuery } from "@tanstack/react-query";

export function Greet() {
	const trpc = useTRPC();

	const { data, error } = useQuery(trpc.hello.greet.queryOptions({ text: "TRPC" }));

	return <div>{data ? data.greeting : JSON.stringify(error)}</div>;
}
