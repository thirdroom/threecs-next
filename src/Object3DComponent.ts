import { addEntity, defineComponent, IWorld, Types } from "bitecs";
import { Object3D } from "three";
import {
  defineEulerProperty,
  defineMatrixProperty,
  defineQuaternionProperty,
  defineVector3Property,
} from "./component-utils";

type World = IWorld & { eid: number; scene: number; camera: number };

const { f32, ui8, ui32 } = Types;

const _Object3DComponent = defineComponent({
  id: ui32,
  parent: Types.eid,
  up: [f32, 3],
  position: [f32, 3],
  rotation: [f32, 4],
  quaternion: [f32, 4],
  scale: [f32, 3],
  modelViewMatrix: [f32, 16],
  normalMatrix: [f32, 9],
  matrix: [f32, 16],
  matrixWorld: [f32, 16],
  matrixAutoUpdate: ui8,
  matrixWorldNeedsUpdate: ui8,
  layers: ui32,
  visible: ui8,
  castShadow: ui8,
  receiveShadow: ui8,
  frustumCulled: ui8,
  renderOrder: f32,
});

type IObject3DComponent = typeof _Object3DComponent & {
  uuid: string[];
  name: string[];
  children: number[][];
  animations: any[];
  userData: any[];
  object3DChildren: Object3D[][];
  object3D: Object3D[];
};

Object.defineProperties(_Object3DComponent, {
  uuid: { value: [] },
  name: { value: [] },
  children: { value: [] },
  animations: { value: [] },
  userData: { value: [] },
  object3DChildren: { value: [] },
  object3D: { value: [] },
});

export const Object3DComponent = _Object3DComponent as IObject3DComponent;

type Object3DEntity = Object3D & { eid: number };

export function addObject3DEntity(
  world: World,
  obj: Object3D,
  parentEid: number = 0
): number {
  const eid = addEntity(world);

  Object3DComponent.id[eid] = obj.id;
  Object3DComponent.parent[eid] = parentEid;
  Object3DComponent.matrixAutoUpdate[eid] = obj.matrixAutoUpdate ? 1 : 0;
  Object3DComponent.matrixWorldNeedsUpdate[eid] = obj.matrixWorldNeedsUpdate
    ? 1
    : 0;
  Object3DComponent.layers[eid] = obj.layers.mask;
  Object3DComponent.visible[eid] = obj.visible ? 1 : 0;
  Object3DComponent.castShadow[eid] = obj.castShadow ? 1 : 0;
  Object3DComponent.receiveShadow[eid] = obj.receiveShadow ? 1 : 0;
  Object3DComponent.frustumCulled[eid] = obj.frustumCulled ? 1 : 0;
  Object3DComponent.renderOrder[eid] = obj.renderOrder;

  Object3DComponent.uuid[eid] = obj.uuid;
  Object3DComponent.name[eid] = obj.name;
  Object3DComponent.children[eid] = obj.children.map((child) =>
    addObject3DEntity(world, child, eid)
  );
  Object3DComponent.animations[eid] = obj.animations;
  Object3DComponent.userData[eid] = obj.userData;
  Object3DComponent.object3D[eid] = obj;

  Object.defineProperties(obj, {
    eid: { value: eid },
    object3DComponent: { value: Object3DComponent },
    id: {
      get() {
        return this.object3DComponent.id[this.eid];
      },
      set(value: string) {
        this.object3DComponent.id[this.eid] = value;
      },
    },
    uuid: {
      get() {
        return this.object3DComponent.uuid[this.eid];
      },
      set(value: string) {
        this.object3DComponent.uuid[this.eid] = value;
      },
    },
    name: {
      get() {
        return this.object3DComponent.name[this.eid];
      },
      set(value: string) {
        this.object3DComponent.name[this.eid] = value;
      },
    },
    parent: {
      get() {
        const parentEid = this.object3DComponent.parent[this.eid];
        return this.object3DComponent.object3D[parentEid];
      },
      set(object: Object3DEntity) {
        this.object3DComponent.parent[this.eid] = object.eid;
      },
    },
    matrixAutoUpdate: {
      get() {
        return !!this.object3DComponent.matrixAutoUpdate[this.eid];
      },
      set(v) {
        this.object3DComponent.matrixAutoUpdate[this.eid] = v ? 1 : 0;
      },
    },
    matrixWorldNeedsUpdate: {
      get() {
        return !!this.object3DComponent.matrixWorldNeedsUpdate[this.eid];
      },
      set(v) {
        this.object3DComponent.matrixWorldNeedsUpdate[this.eid] = v ? 1 : 0;
      },
    },
    visible: {
      get() {
        return !!this.object3DComponent.visible[this.eid];
      },
      set(v) {
        this.object3DComponent.visible[this.eid] = v ? 1 : 0;
      },
    },
    castShadow: {
      get() {
        return !!this.object3DComponent.castShadow[this.eid];
      },
      set(v) {
        this.object3DComponent.castShadow[this.eid] = v ? 1 : 0;
      },
    },
    receiveShadow: {
      get() {
        return !!this.object3DComponent.receiveShadow[this.eid];
      },
      set(v) {
        this.object3DComponent.receiveShadow[this.eid] = v ? 1 : 0;
      },
    },
    frustumCulled: {
      get() {
        return !!this.object3DComponent.frustumCulled[this.eid];
      },
      set(v) {
        this.object3DComponent.frustumCulled[this.eid] = v ? 1 : 0;
      },
    },
    renderOrder: {
      get() {
        return this.object3DComponent.renderOrder[this.eid];
      },
      set(value: string) {
        this.object3DComponent.renderOrder[this.eid] = value;
      },
    },
  });

  Object.defineProperties(obj.layers, {
    eid: { value: eid },
    store: { value: Object3DComponent.layers },
    mask: {
      get() {
        return this.store[eid];
      },
      set(value: number) {
        this.store[eid] = value;
      },
    },
  });

  // TODO write an array observer that works with:
  // - Set existing property
  // - Set new property
  // - Delete property
  // - push / splice etc.
  // Mutations should update the Object3DComponent.children array in addition to it's own array
  // Helper methods in bitECS should be used to keep this array up to date
  obj.children = new Proxy<Object3D[]>(obj.children, {});

  defineVector3Property(obj.up, Object3DComponent.up[eid]);
  defineVector3Property(obj.position, Object3DComponent.position[eid]);
  defineEulerProperty(obj.rotation, Object3DComponent.rotation[eid]);
  defineQuaternionProperty(obj.quaternion, Object3DComponent.quaternion[eid]);
  defineVector3Property(obj.scale, Object3DComponent.scale[eid]);
  defineMatrixProperty(
    obj.modelViewMatrix,
    Object3DComponent.modelViewMatrix[eid]
  );
  defineMatrixProperty(obj.normalMatrix, Object3DComponent.normalMatrix[eid]);
  defineMatrixProperty(obj.matrix, Object3DComponent.matrix[eid]);
  defineMatrixProperty(obj.matrixWorld, Object3DComponent.matrixWorld[eid]);

  return eid;
}
