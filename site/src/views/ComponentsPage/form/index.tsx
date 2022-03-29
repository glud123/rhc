import React from "react";
import Panel from "@/components/Panel";
import { LiveDemo, Subscriptions } from "@/demo/form";

const Form = () => {
  return (
    <Panel>
      <Subscriptions />
      <LiveDemo />
    </Panel>
  );
};

export default Form;
