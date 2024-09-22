import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";


export const config = {
    matcher: ["/dashboard",'/edit', '/editor', '/settings', '/test-generation'],
};

export default withMiddlewareAuthRequired();