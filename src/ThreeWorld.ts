import { createWorld, addEntity, IWorld } from "bitecs";
import { Scene, PerspectiveCamera, Camera, WebGLRenderer } from "three";
import { addObject3DEntity } from "./Object3DEntity";
import { addWebGLRendererComponent } from "./WebGLRendererComponent";
import { addTimeComponent } from "./TimeComponent";

type WorldOptions = {
  canvas?: HTMLCanvasElement;
  scene?: Scene;
  camera?: Camera;
  renderer?: WebGLRenderer;
};

export type ThreeWorld = IWorld & { eid: number, renderer: WebGLRenderer };

export function createThreeWorld(opts: WorldOptions = {}): ThreeWorld {
  const world = createWorld() as ThreeWorld;
  world.eid = addEntity(world);

  addTimeComponent(world, world.eid);

  const renderer =
    opts.renderer ||
    new WebGLRenderer({ canvas: opts.canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  addWebGLRendererComponent(world, world.eid, renderer);
  world.renderer = renderer;

  const scene = addObject3DEntity(world, opts.scene || new Scene());

  addObject3DEntity(world, opts.camera || new PerspectiveCamera(), scene);

  return world;
}
