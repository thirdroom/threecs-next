import { defineQuery } from "bitecs";
import { PerspectiveCamera } from "three";
import { Object3DComponent } from "./Object3DComponent";
import { PerspectiveCameraComponent } from "./PerspectiveCameraComponent";
import { ThreeWorld } from "./ThreeWorld";
import { WebGLRendererComponent } from "./WebGLRendererComponent";

const rendererQuery = defineQuery([WebGLRendererComponent]);
const perspectiveCameraQuery = defineQuery([PerspectiveCameraComponent])

export function createResizeSystem() {
  let needsResize = true;

  const onResize = () => {
    needsResize = true;
  };

  window.addEventListener("resize", onResize);

  function ResizeSystem(world: ThreeWorld) {
    const cameras = perspectiveCameraQuery(world);
    const renderers = rendererQuery(world);

    cameras.forEach((eid) => {
      const camera = Object3DComponent.object3D[eid] as PerspectiveCamera;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    renderers.forEach((eid) => {
      const renderer = WebGLRendererComponent.renderer[eid];
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return world;
  }

  ResizeSystem.dispose = () => {
    window.removeEventListener("resize", onResize);
  };
  
  return ResizeSystem;
}