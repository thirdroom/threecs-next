import { addComponent, defineComponent } from "bitecs";
import { ThreeWorld } from "./ThreeWorld";

export const SceneComponent = defineComponent({});

export function addSceneComponent(world: ThreeWorld, eid: number) {
  addComponent(world, SceneComponent, eid);
}
