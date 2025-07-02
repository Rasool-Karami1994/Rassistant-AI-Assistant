import { NotFoundError } from "@react/components/index";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const isDevelopment = process.env.NODE_ENV !== "production";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {isDevelopment && <TanStackRouterDevtools />}
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  ),
  notFoundComponent({ data }) {
    return <NotFoundError data={data} />;
  },
});
