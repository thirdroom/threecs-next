import { addComponent, defineComponent, Types } from "bitecs";
import { Object3D } from "three";
import {
  defineEulerProperty,
  defineMatrixProperty,
  defineQuaternionProperty,
  defineVector3Property,
} from "./component-utils";
import { Object3DEntity } from "./Object3DEntity";
import { ThreeWorld } from "./ThreeWorld";

const { f32, ui8, ui32 } = Types;

const _Object3DComponent = defineComponent({
  id: ui32,
  parent: Types.eid,
  prevSibling: Types.eid,
  nextSibling: Types.eid,
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
  object3D: Object3D[];
};

Object.defineProperties(_Object3DComponent, {
  object3D: { value: [] },
});

export const Object3DComponent = _Object3DComponent as IObject3DComponent;

export function addObject3DComponent(
  world: ThreeWorld,
  eid: number,
  obj: Object3D,
  parent?: Object3DEntity
): number {
  addComponent(world, Object3DComponent, eid);

  Object3DComponent.id[eid] = obj.id;
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

  Object3DComponent.parent[eid] = parent?.eid || 0;

  const siblings = parent?.children as Object3DEntity[];
  const objIndex = parent?.children.indexOf(obj) || -1;

  if (siblings && objIndex !== -1) {
    const prevSibling = objIndex === 0 ? undefined : siblings[objIndex - 1];
    Object3DComponent.prevSibling[eid] = prevSibling?.eid || 0;

    if (prevSibling) {
      Object3DComponent.nextSibling[prevSibling.eid] = eid;
    }
  }

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

  // TODO: Redefine add/remove/removeFromParent/clear/attach methods

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
