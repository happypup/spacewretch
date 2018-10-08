import * as THREE from 'three';

export class CanvasResize {

  constructor(
    public renderer: THREE.WebGLRenderer,
    public camera: THREE.PerspectiveCamera) {

  }

  updateFirstTime() {
    const canvas = this.renderer.domElement;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    // you must pass false here or three.js sadly fights the browser
    this.renderer.setSize(clientWidth, clientHeight, false);
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();

    // update any render target sizes here
  }

  updateInAnimate() {
    const canvas = this.renderer.domElement;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(clientWidth, clientHeight, false);
      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

}
