<template>
  <div class="start info-content">
    <canvas id="startCanvas" ref="canvasEle"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'

export default {
  data(){
    return{
      engine:null,
      scene:null,
      camera:null
    }
  },
  mounted(){
    this.engine = new BABYLON.Engine(this.$refs.canvasEle,true,{preserverDrawingBuffer:true,stencli:true})
    this.createScene()
    this.engine.runRenderLoop(()=>{this.scene.render()})
  },
  beforeUnmount(){
    this.scene && this.scene.dispose()
  },
  methods:{
    createScene(){
      this.scene = new BABYLON.Scene(this.engine)

      // 添加可交互（拖动等）相机
      this.camera = new BABYLON.ArcRotateCamera('camera',-Math.PI/2,Math.PI/4,8,new BABYLON.Vector3(0,0,0),this.scene)
      this.camera.attachControl(this.$refs.canvasEle,true)

      // 添加灯光、box
      new BABYLON.HemisphericLight('light',new BABYLON.Vector3(0,1,0),this.scene)
      const box = BABYLON.MeshBuilder.CreateBox('box',{},this.scene)
      box.position = new BABYLON.Vector3(0,0.5,2)

      // 添加模型
      // BABYLON.SceneLoader.ImportMeshAsync(['ground','semi_house'],'https://assets.babylonjs.com/meshes/','both_houses_scene.babylon')
      BABYLON.SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','both_houses_scene.babylon').then((result)=>{
        result.meshes[2].position.x = 2
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#startCanvas {
  width: 100%;
  height: 100%;
}
</style>
