import AssistantWorkingHoursTab from "@components/instruction/tabs/AssistantWorkingHoursTab";
import { WellcomeTab } from "@components/instruction/tabs/WellcomeTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";
export const Instruction = () => {
  return (
    <div className="w-full min-w-[360px] flex-1">
      <div className="flex w-full flex-row gap-6">
        <Tabs defaultValue="wellcome">
          <TabsList>
            <TabsTrigger value="wellcome">پیغام خوشامدگویی</TabsTrigger>

            <TabsTrigger value="assistantWorkingHours">
              ساعت کار دستیار
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wellcome">
            <WellcomeTab />
          </TabsContent>
          <TabsContent value="assistantWorkingHours">
            <AssistantWorkingHoursTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
