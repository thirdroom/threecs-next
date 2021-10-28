import { addComponent, defineComponent } from "bitecs";
import { ThreeWorld } from "./ThreeWorld";

export const MeshComponent = defineComponent({});

export function addMeshComponent(world: ThreeWorld, eid: number) {
  addComponent(world, MeshComponent, eid);
}
