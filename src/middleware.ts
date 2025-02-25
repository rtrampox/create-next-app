import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const headers = new Headers(request.headers);
	headers.set("x-current-href", request.nextUrl.href);

	return NextResponse.next({ headers });
}

export const config = {
	matcher: [
		// match all routes except static files and APIs
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
