import { addEntity } from "bitecs";
import { Scene, Object3D, Camera, PerspectiveCamera, Group, Mesh } from "three";
import { addCameraComponent } from "./CameraComponent";
import { addGroupComponent } from "./GroupComponent";
import { ThreeWorld } from "./ThreeWorld";
import { addMeshComponent } from "./MeshComponent";
import { addObject3DComponent } from "./Object3DComponent";
import { addPerspectiveCameraComponent } from "./PerspectiveCameraComponent";
import { addSceneComponent } from "./SceneComponent";

export type Object3DEntity<T extends Object3D = Object3D> = T & { eid: number };

export function addObject3DEntity<T extends Object3D>(
  world: ThreeWorld,
  obj: T,
  parent?: Object3DEntity
): Object3DEntity {
  const eid = addEntity(world);

  if (parent) {
    parent.add(obj);
  }

  addObject3DComponent(world, eid, obj, parent);

  if ((obj as unknown as Scene).isScene) {
    addSceneComponent(world, eid);
  }

  if ((obj as unknown as Group).isGroup) {
    addGroupComponent(world, eid);
  }

  if ((obj as unknown as Camera).isCamera) {
    addCameraComponent(world, eid, obj as unknown as Camera);
  }

  if ((obj as unknown as PerspectiveCamera).isPerspectiveCamera) {
    addPerspectiveCameraComponent(world, eid, obj as unknown as PerspectiveCamera);
  }

  if ((obj as unknown as Mesh).isMesh) {
    addMeshComponent(world, eid);
  }

  for (let i = 0; i < obj.children.length; i++) {
    addObject3DEntity(world, obj.children[i]);
  }

  return obj as unknown as Object3DEntity;
}
