import {
  createWorld,
  pipe,
  addEntity,
  defineComponent,
  addComponent,
  IWorld,
  Component,
  defineQuery,
} from "bitecs";
import {
  Scene,
  PerspectiveCamera,
  Camera,
  WebGLRenderer,
} from "three";
import { addObject3DEntity, Object3DComponent } from "./Object3DComponent";

interface Time {
  last: number;
  delta: number;
  elapsed: number;
}

type MapComponent<T> = Component & {
  get: (eid: number) => T | undefined;
  set: (eid: number, value: T | undefined) => void;
};

function defineMapComponent<T>(): MapComponent<T> {
  const component = defineComponent({}) as MapComponent<T>;
  const store: Map<number, T | undefined> = new Map();
  component.get = (eid: number) => store.get(eid);
  component.set = (eid: number, value: T | undefined) => {
    store.set(eid, value);
  };
  return component;
}

const RendererComponent = defineMapComponent<WebGLRenderer>();
const TimeComponent = defineMapComponent<Time>();

type WorldOptions = {
  scene?: Scene;
  camera?: Camera;
  renderer?: WebGLRenderer;
  time?: Time;
};

type World = IWorld & { eid: number; scene: number; camera: number };

function createThreeWorld(opts: WorldOptions = {}): World {
  const world = createWorld() as World;
  world.eid = addEntity(world);
  addComponent(world, RendererComponent, world.eid);
  RendererComponent.set(world.eid, opts.renderer || new WebGLRenderer());
  addComponent(world, TimeComponent, world.eid);
  TimeComponent.set(
    world.eid,
    opts.time || {
      last: 0,
      delta: 0,
      elapsed: 0,
    }
  );
  world.scene = addObject3DEntity(world, opts.scene || new Scene());
  world.camera = addObject3DEntity(
    world,
    opts.camera || new PerspectiveCamera()
  );
  return world;
}

function TimeSystem(world: World) {
  const now = performance.now();
  world.time.delta = now - world.time.last;
  world.time.elapsed += world.time.delta;
  world.time.last = now;
  return world;
}

function RenderSystem(world: World) {
  const renderer = RendererComponent.get(world.eid)!;
  const scene = Object3DComponent.object3D[world.scene]!;
  const camera = Object3DComponent.object3D[world.camera]!;
  renderer.render(scene, camera as Camera);
  return world;
}

const movementQuery = defineQuery([Object3DComponent]);

function MovementSystem(world: World) {
  const { delta, elapsed } = TimeComponent.get(world.eid)!;
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
const renderer = new WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  const camera = Object3DComponent.object3D[world.camera]! as PerspectiveCamera;
  const renderer = RendererComponent.get(world.eid)!;

  if (camera.isPerspectiveCamera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const camera = new PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const world = createThreeWorld({ renderer, camera });

const pipeline = pipe(TimeSystem, MovementSystem, RenderSystem);

renderer.setAnimationLoop(() => {
  pipeline(world);
});
