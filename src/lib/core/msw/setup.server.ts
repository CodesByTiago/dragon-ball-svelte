import { afterAll, afterEach, beforeAll } from "vite-plus/test";
import { server } from "./server.js";

beforeAll(() => {
  server.listen({ onUnhandledFrame: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
