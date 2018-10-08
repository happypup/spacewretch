import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import PointerLockControls from '../three-imports/PointerLockControls';

@Component({
  selector: 'app-three-view',
  templateUrl: './three-view.component.html',
  styleUrls: ['./three-view.component.css']
})
export class ThreeViewComponent implements OnInit {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  pointerLockControls: PointerLockControls;

  constructor() { }

  ngOnInit() {
    this.container = document.getElementById('container');
    this.canvas = document.querySelector('canvas');
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
    this.camera.position.y = 5;
    this.camera.position.z = 10;
    this.scene = new THREE.Scene();
    this.pointerLockControls = new PointerLockControls(this.camera, this.canvas);

    this.resizeCanvasToDisplaySize(true);
    this.populateScene();

    this.canvas.addEventListener('click',
      (event) => { this.pointerLockControls.lock(); },
      false
    );

    this.animate();
  }

  populateScene() {

    // create a point light
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // create line
    const material2 = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    const geometry2 = new THREE.Geometry();
    geometry2.vertices.push(
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(1, 0, 1)
    );
    const line = new THREE.Line(geometry2, material2);
    this.scene.add(line);

    // create ground
    const plane = new THREE.GridHelper(100, 100);
    this.scene.add(plane);

    this.scene.add(this.pointerLockControls.getObject());
  }

  resizeCanvasToDisplaySize(force) {
    const canvas = this.renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (force || canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.resizeCanvasToDisplaySize(false);

    this.renderer.render(this.scene, this.camera);
  }
}
