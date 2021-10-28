import { addComponent, defineComponent } from "bitecs";
import { ThreeWorld } from "./ThreeWorld";

export const GroupComponent = defineComponent({});

export function addGroupComponent(world: ThreeWorld, eid: number) {
  addComponent(world, GroupComponent, eid);
}
