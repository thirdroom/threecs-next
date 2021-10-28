import { addComponent, defineComponent } from "bitecs";
import { WebGLRenderer } from "three";
import { ThreeWorld } from "./ThreeWorld";

const _WebGLRendererComponent = defineComponent({});

type IWebGLRendererComponent = typeof _WebGLRendererComponent & {
  renderer: WebGLRenderer[];
};

Object.defineProperties(_WebGLRendererComponent, {
  renderer: { value: [] },
});

export const WebGLRendererComponent = _WebGLRendererComponent as IWebGLRendererComponent;

export function addWebGLRendererComponent(world: ThreeWorld, eid: number, renderer: WebGLRenderer) {
  addComponent(world, WebGLRendererComponent, eid);
  WebGLRendererComponent.renderer[eid] = renderer;
}
