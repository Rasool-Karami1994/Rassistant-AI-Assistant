import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@react/pages/homepage";

export const Route = createFileRoute("/(app)/_homepage/")({
  component: HomePage,
});
