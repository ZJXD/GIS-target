<template>
  <div class="village info-content">
    <canvas id="villageCanvas" ref="villageCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'

export default {
  data(){
    return{
      engine:null,
      scene:null
    }
  },
  mounted(){
    this.engine = new BABYLON.Engine(this.$refs.villageCanvas,true,{preserverDrawingBuffer:true,stencli:true})
    this.createScene()
    this.engine.runRenderLoop(()=>{this.scene.render()})
  },
  beforeUnmount(){
    this.scene && this.scene.dispose()
  },
  methods:{
    createScene(){
      this.scene = new BABYLON.Scene(this.engine)
      const camera = new BABYLON.ArcRotateCamera('camera',-Math.PI/2,Math.PI/2.5,15,new BABYLON.Vector3(0,0,0))
      camera.attachControl(this.$refs.villageCanvas,true)

      new BABYLON.HemisphericLight('light',new BABYLON.Vector3(1,1,0))
      // ground
      this.buildGround()
      this.buildHouse()
    },

    buildGround(){
      const ground = BABYLON.MeshBuilder.CreateGround('ground',{width:16,height:16})
      const groundMat = new BABYLON.StandardMaterial('groundMat')
      groundMat.diffuseColor = new BABYLON.Color3(0.929,0.74,0.396)
      ground.material = groundMat
    },

    buildRoof(){
      const roof = BABYLON.MeshBuilder.CreateCylinder('roof',{diameter:1.3,height:1.2,tessellation:3})
      roof.scaling.x = 0.75
      roof.rotation.z = Math.PI/2
      roof.position.y = 1.22
      const roofMat = new BABYLON.StandardMaterial('rootMat')
      roofMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/roof.jpg')
      roof.material = roofMat
      return roof
    },

    buildBox(width){
      const boxMat = new BABYLON.StandardMaterial('boxMat')
      // 简单贴图
      // boxMat.diffuseTexture = new BABYLON.Texture('https://www.babylonjs-playground.com/textures/floor.png')
      // 长贴图，用四维向量贴到不同面
      if(width === 1){
        boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/cubehouse.png')
      }else{
        boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/semihouse.png')
      }
      // 面对应的向量
      const faceUV = []
      if(width === 1){
        faceUV[0] = new BABYLON.Vector4(0.5,0.0,0.75,1.0) // back
        faceUV[1] = new BABYLON.Vector4(0,0,0.25,1.0) // front
        faceUV[2] = new BABYLON.Vector4(0.25,0,0.5,1.0) // right
        faceUV[3] = new BABYLON.Vector4(0.75,0,1,1) // left
      }else{
        faceUV[0] = new BABYLON.Vector4(0.6,0.0,1,1.0) // back
        faceUV[1] = new BABYLON.Vector4(0,0,0.4,1.0) // front
        faceUV[2] = new BABYLON.Vector4(0.4,0,0.6,1.0) // right
        faceUV[3] = new BABYLON.Vector4(0.4,0,0.6,1) // left
      }

      const box = BABYLON.MeshBuilder.CreateBox('box',{width,faceUV,wrap:true})
      box.position.y = 0.5
      box.material = boxMat
      return box
    },

    buildHouse(){
      const box1 = this.buildBox(1)
      const roof1 = this.buildRoof()
      // 合并 mesh
      const detached_house = BABYLON.Mesh.MergeMeshes([box1,roof1],true,false,null,false,true)
      detached_house.rotation.y = -Math.PI/16
      detached_house.position.x = -6.8
      detached_house.position.z = 2.5

      const box3 = this.buildBox(2)
      const roof3 = this.buildRoof()
      roof3.scaling.y = 2
      const semi_house = BABYLON.Mesh.MergeMeshes([box3,roof3],true,false,null,false,true)
      semi_house.rotation.y = -Math.PI/16
      semi_house.position.x = -4.5
      semi_house.position.z = 3

      const places = []; //each entry is an array [house type, rotation, x, z]
      // places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
      // places.push([2, -Math.PI / 16, -4.5, 3 ]);
      places.push([2, -Math.PI / 16, -1.5, 4 ]);
      places.push([2, -Math.PI / 3, 1.5, 6 ]);
      places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
      places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
      places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
      places.push([1, 5 * Math.PI / 4, 0, -1 ]);
      places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
      places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
      places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
      places.push([2, Math.PI / 1.9, 4.75, -1 ]);
      places.push([1, Math.PI / 1.95, 4.5, -3 ]);
      places.push([2, Math.PI / 1.9, 4.75, -5 ]);
      places.push([1, Math.PI / 1.9, 4.75, -7 ]);
      places.push([2, -Math.PI / 3, 5.25, 2 ]);
      places.push([1, -Math.PI / 3, 6, 4 ]);
    
      const houses = []
      for (let i = 0; i < places.length; i++) {
        if(places[i][0] === 1){
          houses[i] = detached_house.createInstance('house-'+i)
        }else{
          houses[i] = semi_house.createInstance('house-'+i)
        }
        houses[i].rotation.y = places[i][1]
        houses[i].position.x = places[i][2]
        houses[i].position.z = places[i][3]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
