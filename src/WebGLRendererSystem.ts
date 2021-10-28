import { Camera } from "three";
import { Object3DComponent } from "./Object3DComponent";
import { WebGLRendererComponent } from "./WebGLRendererComponent";
import { ThreeWorld } from "./ThreeWorld";

export function WebGLRendererSystem(world: ThreeWorld) {
  const renderer = WebGLRendererComponent.renderer[world.eid];
  const scene = Object3DComponent.object3D[world.scene]!;
  const camera = Object3DComponent.object3D[world.camera]!;
  renderer.render(scene, camera as Camera);
  return world;
}
