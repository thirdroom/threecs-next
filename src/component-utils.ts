import { Vector3, Euler, Quaternion, Matrix3, Matrix4 } from "three";

export function defineVector3Property(object: Vector3, arr: Float32Array) {
  arr[0] = object.x;
  arr[1] = object.y;
  arr[2] = object.z;

  Object.defineProperties(object, {
    _elements: { value: arr },
    x: {
      get() {
        return this._elements[0];
      },
      set(value: number) {
        this._elements[0] = value;
      },
    },
    y: {
      get() {
        return this._elements[1];
      },
      set(value: number) {
        this._elements[1] = value;
      },
    },
    z: {
      get() {
        return this._elements[2];
      },
      set(value: number) {
        this._elements[2] = value;
      },
    },
  });
}

enum RotationOrder {
  XYZ,
  YXZ,
  ZXY,
  ZYX,
  YZX,
  XZY
}

export function defineEulerProperty(object: Euler, arr: Float32Array) {
  arr[0] = object.x;
  arr[1] = object.y;
  arr[2] = object.z;
  arr[3] = RotationOrder[object.order as keyof typeof RotationOrder];

  Object.defineProperties(object, {
    _elements: { value: arr },
    _x: {
      get() {
        return this._elements[0];
      },
      set(value: number) {
        this._elements[0] = value;
      },
    },
    _y: {
      get() {
        return this._elements[1];
      },
      set(value: number) {
        this._elements[1] = value;
      },
    },
    _z: {
      get() {
        return this._elements[2];
      },
      set(value: number) {
        this._elements[2] = value;
      },
    },
    _order: {
      get() {
        return RotationOrder[this._elements[3]];
      },
      set(value: keyof typeof RotationOrder) {
        this._elements[3] = RotationOrder[value];
      },
    },
  });
}

export function defineQuaternionProperty(object: Quaternion, arr: Float32Array) {
  arr[0] = object.x;
  arr[1] = object.y;
  arr[2] = object.z;
  arr[3] = object.w;

  Object.defineProperties(object, {
    _elements: { value: arr },
    _x: {
      get() {
        return this._elements[0];
      },
      set(value: number) {
        this._elements[0] = value;
      },
    },
    _y: {
      get() {
        return this._elements[1];
      },
      set(value: number) {
        this._elements[1] = value;
      },
    },
    _z: {
      get() {
        return this._elements[2];
      },
      set(value: number) {
        this._elements[2] = value;
      },
    },
    _w: {
      get() {
        return this._elements[3];
      },
      set(value: number) {
        this._elements[3] = value;
      },
    },
  });
}

export function defineMatrixProperty(object: Matrix3 | Matrix4, arr: Float32Array) {
  arr.set(object.elements);

  Object.defineProperties(object, {
    elements: { value: arr },
  });
}
