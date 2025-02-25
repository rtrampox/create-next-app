import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react/client";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: React.PropsWithChildren) {
	return (
		<TRPCReactProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<NuqsAdapter>
					{children}
					<Toaster richColors theme="system" closeButton />
				</NuqsAdapter>
			</ThemeProvider>
		</TRPCReactProvider>
	);
}
