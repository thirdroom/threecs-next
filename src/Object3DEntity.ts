import { addEntity } from "bitecs";
import { Scene, Object3D, Camera, PerspectiveCamera, Group, Mesh } from "three";
import { addCameraComponent } from "./CameraComponent";
import { addGroupComponent } from "./GroupComponent";
import { ThreeWorld } from "./ThreeWorld";
import { addMeshComponent } from "./MeshComponent";
import { addObject3DComponent } from "./Object3DComponent";
import { addPerspectiveCameraComponent } from "./PerspectiveCameraComponent";
import { addSceneComponent } from "./SceneComponent";

export type Object3DEntity = Object3D & { eid: number };

export function addObject3DEntity(world: ThreeWorld, obj: Object3D, parent?: Object3D): number {
  const eid = addEntity(world);

  if (parent) {
    parent.add(obj);
  }

  addObject3DComponent(world, eid, obj);
  
  if ((obj as Scene).isScene) {
    addSceneComponent(world, eid);
  }

  if ((obj as Group).isGroup) {
    addGroupComponent(world, eid);
  }

  if ((obj as Camera).isCamera) {
    addCameraComponent(world, eid, obj as Camera);
  }

  if ((obj as PerspectiveCamera).isPerspectiveCamera) {
    addPerspectiveCameraComponent(world, eid, obj as PerspectiveCamera);
  }

  if ((obj as Mesh).isMesh) {
    addMeshComponent(world, eid);
  }

  for (let i = 0; i < obj.children.length; i++) {
    addObject3DEntity(world, obj.children[i]);
  }

  return eid;
}

