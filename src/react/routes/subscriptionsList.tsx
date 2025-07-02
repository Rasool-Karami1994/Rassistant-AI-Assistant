import SubscriptionListComponent from "@components/subscription/SubscriptionListComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subscriptionsList")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SubscriptionListComponent />;
}
