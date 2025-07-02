import { createFileRoute } from "@tanstack/react-router";
import { Subscription } from "@react/pages/subscription";

export const Route = createFileRoute("/(app)/subscription/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Subscription />;
}
