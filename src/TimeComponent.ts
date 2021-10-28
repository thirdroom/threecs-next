import { addComponent, defineComponent, Types } from "bitecs";
import { ThreeWorld } from "./ThreeWorld";

const { f32 } = Types;

export const TimeComponent = defineComponent({
  last: f32,
  delta: f32,
  elapsed: f32,
});

export function addTimeComponent(world: ThreeWorld, eid: number) {
  addComponent(world, TimeComponent, eid);
}
