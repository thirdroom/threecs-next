import { addComponent, defineComponent, Types } from "bitecs";
import { Camera } from "three";
import { defineMatrixProperty } from "./component-utils";
import { ThreeWorld } from "./ThreeWorld";

const { f32 } = Types;

export const CameraComponent = defineComponent({
  matrixWorldInverse: [f32, 16],
  projectionMatrix: [f32, 16],
  projectionMatrixInverse: [f32, 16],
});

export function addCameraComponent(world: ThreeWorld, eid: number, obj: Camera) {
  addComponent(world, CameraComponent, eid);
  defineMatrixProperty(
    obj.matrixWorldInverse,
    CameraComponent.matrixWorldInverse[eid]
  );
  defineMatrixProperty(
    obj.projectionMatrix,
    CameraComponent.projectionMatrix[eid]
  );
  defineMatrixProperty(
    obj.projectionMatrixInverse,
    CameraComponent.projectionMatrixInverse[eid]
  );
}
