let THREE = require("three");

import OrbitControls from "./OrbitControls";
import OBJLoader from "./OBJLoader";
import store from '../redux/store';

class MapThree {
  constructor(options) {
    this.rootElement = options.rootElement;
    this.mapWidth = this.rootElement.clientWidth;
    this.mapHeight = this.rootElement.clientHeight;

    this.count = 0;
    this.scale = 3000;
    this.lines = [];

    // three
    this.initThree();

    // binding
    this.animate = this.animate.bind(this);
  }

  initThree() {
    // scene
    this.camera = new THREE.PerspectiveCamera( 45, this.mapWidth / this.mapHeight, 1, 10000 );
    this.camera.position.z = 2000;
    this.camera.updateProjectionMatrix();

    this.scene = new THREE.Scene();

    // dom renderers
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x75d0f6, 1.0);
    this.renderer.setSize(this.mapWidth, this.mapHeight);

    // helpers
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.linesProperties = {
      "FRMT-DALY": {
        position: [ -920, -900, 10],
        color: 0x4fb848,
      },
      "FRMT-RICH": {
        position: [ -920, -900, 10],
        color: 0xf9a11d,
      },
      "MLBR-DUBL": {
        position: [ -920, -900, 10],
        color: 0x2aabe2,
      },
      "MLBR-RICH": {
        position: [ -920, -900, 10],
        color: 0xe11a57,
      },
      "PITT-SFIA": {
        position: [ -920, -900, 10],
        color: 0xfdf057,
      },
    }

    this.addLand();
    this.addLines();
    // this.addLand();
  }

  addLand() {
    var loader = new OBJLoader();
    loader.load('assets/land.obj', (landGroup) => {
      
      this.landGroup = landGroup;
      const landMaterial = new THREE.MeshBasicMaterial({ color: 0xe8e8e8 });
      const scale = this.scale;

      this.landGroup.scale.set(scale, scale*2000, scale);
      this.landGroup.position.set(
        this.landGroup.position.x - scale/4 - 170,
        this.landGroup.position.y - scale/4 - 160, 
        0,
      );

      this.landGroup.rotation.x = Math.PI / 2;

      for (var i = 0; i < this.landGroup.children.length; i++) {
        var mesh = this.landGroup.children[i];
        mesh.material = landMaterial;
      }

      this.scene.add(this.landGroup);
    });
  }

  addLines() {
    var loader = new OBJLoader();
    (Object.keys(this.linesProperties)).forEach((line) => {
      loader.load( `assets/${line}.obj`, (lineObject) => {

        console.log(lineObject);

        const scale = this.scale;
        const lineProperties = this.linesProperties[line];

        this.lines.push(lineObject);

        // const lineMaterial = new THREE.MeshBasicMaterial({ color: lineProperties.color });

        const lineMaterial = new THREE.LineBasicMaterial( {
          color: lineProperties.color,
          linewidth: 3000,
        });

        // lineObject.scale.set(scale, scale, scale);
        
        lineObject.position.set(
          lineProperties.position[0], 
          lineProperties.position[1], 
          lineProperties.position[2]
        );

        lineObject.rotation.x = Math.PI / 2;

        for (let i = 0; i < lineObject.children.length; i++) {
          let mesh = lineObject.children[i];
          mesh.material = lineMaterial;
          mesh.scale.set(scale, scale, scale);
        }

        this.scene.add(lineObject);
      });
    });
  }

  animate() {
    window.requestAnimationFrame( this.animate );

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  load() {
    let rendererDom = this.renderer.domElement;
    this.rootElement.appendChild(rendererDom);
  }
}

export default MapThree;