import { AdvertisementComponent } from "@components/advertisement/AdvertisementComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/advertisement/$advertisement_id/")(
  {
    component: AdvertisementComponent,
  },
);
