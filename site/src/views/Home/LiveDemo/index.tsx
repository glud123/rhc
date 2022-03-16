import React from "react";
import Card from "@/components/Card";
import Group from "@/components/Group";
import Example from "./Example";
import Watch from "./Watch";
import Errors from "./Errors";
import Submit from "./Submit";

const LiveDemo = () => {
  return (
    <Group>
      <Card title="Example">
        <Example />
      </Card>
      <Card title="Watch">
        <Watch />
      </Card>
      <Card title="Errors">
        <Errors />
      </Card>
      <Card title="Submit">
        <Submit />
      </Card>
    </Group>
  );
};

export default LiveDemo;
