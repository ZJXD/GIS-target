<template>
  <div class="village">
    <canvas id="villageCanvas" ref="villageCanvas"></canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'

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
  methods:{
    createScene(){
      this.scene = new BABYLON.Scene(this.engine)
      const camera = new BABYLON.ArcRotateCamera('camera',-Math.PI/2,Math.PI/2.5,10,new BABYLON.Vector3(0,0,0))
      camera.attachControl(this.$refs.villageCanvas,true)

      new BABYLON.HemisphericLight('light',new BABYLON.Vector3(1,1,0))
      // ground
      this.buildGround()

      const box1 = this.buildBox()
      box1.position = new BABYLON.Vector3(2,0.5,0)
      const roof1 = this.buildRoof()
      roof1.position = new BABYLON.Vector3(2,1.22,0)
      // 合并 mesh
      BABYLON.Mesh.MergeMeshes([box1,roof1],true,false,null,false,true)
      
      const box2 = this.buildBox()
      box2.position = new BABYLON.Vector3(-1,0.5,0)
      const roof2 = this.buildRoof()
      roof2.position = new BABYLON.Vector3(-1,1.22,0)

      const box3 = this.buildBigBox()
      box3.position = new BABYLON.Vector3(-1,0.5,2)
      const roof3 = this.buildRoof()
      roof3.position = new BABYLON.Vector3(-1,1.22,2)
      roof3.scaling.y = 2
    },

    buildGround(){
      const ground = BABYLON.MeshBuilder.CreateGround('ground',{width:10,height:10})
      const groundMat = new BABYLON.StandardMaterial('groundMat')
      groundMat.diffuseColor = new BABYLON.Color3(0.929,0.74,0.396)
      ground.material = groundMat
    },

    buildRoof(){
      const roof = BABYLON.MeshBuilder.CreateCylinder('roof',{diameter:1.3,height:1.2,tessellation:3})
      roof.scaling.x = 0.75
      roof.rotation.z = Math.PI/2
      const roofMat = new BABYLON.StandardMaterial('rootMat')
      roofMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/roof.jpg')
      roof.material = roofMat
      return roof
    },

    buildBox(){
      const boxMat = new BABYLON.StandardMaterial('boxMat')
      // 简单贴图
      // boxMat.diffuseTexture = new BABYLON.Texture('https://www.babylonjs-playground.com/textures/floor.png')
      // 长贴图，用四维向量贴到不同面
      boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/cubehouse.png')
      // 面对应的向量
      const faceUV = []
      faceUV[0] = new BABYLON.Vector4(0.5,0.0,0.75,1.0) // back
      faceUV[1] = new BABYLON.Vector4(0,0,0.25,1.0) // front
      faceUV[2] = new BABYLON.Vector4(0.25,0,0.5,1.0) // right
      faceUV[3] = new BABYLON.Vector4(0.75,0,1,1) // left

      const box = BABYLON.MeshBuilder.CreateBox('box',{faceUV:faceUV,wrap:true})
      box.material = boxMat
      return box
    },

    buildBigBox(){
      const boxMat = new BABYLON.StandardMaterial('boxMat')
      // 长贴图，用四维向量贴到不同面
      boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/semihouse.png')
      // 面对应的向量
      const faceUV = []
      faceUV[0] = new BABYLON.Vector4(0.6,0.0,1,1.0) // back
      faceUV[1] = new BABYLON.Vector4(0,0,0.4,1.0) // front
      faceUV[2] = new BABYLON.Vector4(0.4,0,0.6,1.0) // right
      faceUV[3] = new BABYLON.Vector4(0.4,0,0.6,1) // left

      const box = BABYLON.MeshBuilder.CreateBox('box',{width:2,faceUV:faceUV,wrap:true})
      box.material = boxMat
      return box
    }
  }
}
</script>

<style lang="scss" scoped>
.village {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
