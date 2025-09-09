import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    meta: undefined as { title?: string } | undefined,
  },
});

// isto é necessário para o TypeScript reconhecer o tipo estendido
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
