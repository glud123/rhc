import React from "react";
import Group from "@/components/Group";
import Card from "@/components/Card";
import Inside from "./Inside";
import Outside from "./Outside";

const Subscriptions = () => {
  return (
    <Group>
      <Card title="Outside">
        <Outside />
      </Card>
      <Card title="Inside">
        <Inside />
      </Card>
    </Group>
  );
};

export default Subscriptions;
