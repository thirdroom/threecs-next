import { addComponent, defineComponent, Types } from "bitecs";
import { PerspectiveCamera } from "three";
import { ThreeWorld } from "./ThreeWorld";

const { f32 } = Types;

export const PerspectiveCameraComponent = defineComponent({
  fov: f32,
  zoom: f32,
  near: f32,
  far: f32,
  focus: f32,
  aspect: f32,
  filmGauge: f32,
  filmOffset: f32,
});

export function addPerspectiveCameraComponent(world: ThreeWorld, eid: number, obj: PerspectiveCamera) {
  addComponent(world, PerspectiveCameraComponent, eid);

  PerspectiveCameraComponent.fov[eid] = obj.fov;
  PerspectiveCameraComponent.zoom[eid] = obj.zoom;
  PerspectiveCameraComponent.near[eid] = obj.near;
  PerspectiveCameraComponent.far[eid] = obj.far;
  PerspectiveCameraComponent.focus[eid] = obj.focus;
  PerspectiveCameraComponent.aspect[eid] = obj.aspect;
  PerspectiveCameraComponent.filmGauge[eid] = obj.filmGauge;
  PerspectiveCameraComponent.filmOffset[eid] = obj.filmOffset;
  
  Object.defineProperties(obj, {
    perspectiveCameraComponent: { value: PerspectiveCameraComponent },
    fov: {
      get() {
        return this.perspectiveCameraComponent.fov[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.fov[this.eid] = value;
      },
    },
    zoom: {
      get() {
        return this.perspectiveCameraComponent.zoom[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.zoom[this.eid] = value;
      },
    },
    near: {
      get() {
        return this.perspectiveCameraComponent.near[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.near[this.eid] = value;
      },
    },
    far: {
      get() {
        return this.perspectiveCameraComponent.far[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.far[this.eid] = value;
      },
    },
    focus: {
      get() {
        return this.perspectiveCameraComponent.focus[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.focus[this.eid] = value;
      },
    },
    aspect: {
      get() {
        return this.perspectiveCameraComponent.aspect[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.aspect[this.eid] = value;
      },
    },
    filmGauge: {
      get() {
        return this.perspectiveCameraComponent.filmGauge[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.filmGauge[this.eid] = value;
      },
    },
    filmOffset: {
      get() {
        return this.perspectiveCameraComponent.filmOffset[this.eid];
      },
      set(value: string) {
        this.perspectiveCameraComponent.filmOffset[this.eid] = value;
      },
    },
  });
}
