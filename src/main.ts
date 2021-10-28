import { pipe, defineQuery } from "bitecs";
import { createThreeWorld, ThreeWorld } from "./ThreeWorld";
import { Object3DComponent } from "./Object3DComponent";
import { TimeComponent } from "./TimeComponent";
import { WebGLRendererSystem } from "./WebGLRendererSystem";
import { TimeSystem } from "./TimeSystem";
import { createResizeSystem } from "./ResizeSystem";

const movementQuery = defineQuery([Object3DComponent]);

function MovementSystem(world: ThreeWorld) {
  const delta = TimeComponent.delta[world.eid]!;
  const elapsed = TimeComponent.elapsed[world.eid]!;
  const ents = movementQuery(world);
  for (let i = 0; i < ents.length; i++) {
    const e = ents[i];
    const obj3d = world.objects.get(e);

    Object3DComponent.rotation[e][0] += 0.0001 * delta;
    Object3DComponent.rotation[e][1] += 0.003 * delta;
    Object3DComponent.rotation[e][2] += 0.0005 * delta;
    obj3d!.rotation._onChangeCallback();

    Object3DComponent.position[e][0] += (Math.sin(elapsed / 1000) / 30) * delta;
    Object3DComponent.position[e][1] += (Math.cos(elapsed / 1000) / 30) * delta;
    Object3DComponent.position[e][2] += (Math.cos(elapsed / 1000) / 30) * delta;
  }
  return world;
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const world = createThreeWorld({ canvas });

const pipeline = pipe(
  TimeSystem,
  MovementSystem,
  createResizeSystem(),
  WebGLRendererSystem
);

world.renderer.setAnimationLoop(() => {
  pipeline(world);
});
