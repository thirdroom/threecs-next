import { ThreeWorld } from "./ThreeWorld";
import { TimeComponent } from "./TimeComponent";

export function TimeSystem(world: ThreeWorld) {
  const now = performance.now();
  const delta = now - TimeComponent.last[world.eid];
  TimeComponent.delta[world.eid] = delta;
  TimeComponent.elapsed[world.eid] += delta;
  TimeComponent.last[world.eid] = now;
  return world;
}
