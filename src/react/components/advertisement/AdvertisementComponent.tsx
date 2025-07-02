import { AdditionalItems } from "@components/advertisement/tabs/AdditionalItemsTab";
import { InformationTab } from "@components/advertisement/tabs/InformationTab";
import InstructionsTab from "@components/advertisement/tabs/InstructionsTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";

export function AdvertisementComponent() {
  return (
    <div className="flex w-full flex-row gap-6">
      <Tabs defaultValue="information">
        <TabsList>
          <TabsTrigger value="information">اطلاعات</TabsTrigger>
          <TabsTrigger value="additionalItems">موارد تکمیلی</TabsTrigger>
          <TabsTrigger value="instructions">دستورالعمل</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <InformationTab />
        </TabsContent>
        <TabsContent value="additionalItems">
          <AdditionalItems />
        </TabsContent>
        <TabsContent value="instructions">
          <InstructionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
