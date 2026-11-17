import { setupServer } from "msw/node";
import { handlers } from "../src/lib/core/msw/handlers.ts";

const server = setupServer(...handlers);
server.listen({ onUnhandledFrame: "error" });
