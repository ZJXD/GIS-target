<template>
  <div class="anim-village info-content">
    <canvas ref="animVillageEl"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'

export default {
  data(){
    return{
      engine:null,
      scene:null
    }
  },
  mounted(){
    this.engine = new BABYLON.Engine(this.$refs.animVillageEl,true,{preserverDrawingBuffer:true,stencli:true})
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
      camera.attachControl(this.$refs.animVillageEl,true)
      new BABYLON.HemisphericLight('light',new BABYLON.Vector3(1,1,0))

      BABYLON.SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','village.glb',this.scene)
      BABYLON.SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','car.glb').then(()=>{
        const car = this.scene.getMeshByName('car')
        car.rotation = new BABYLON.Vector3(Math.PI/2,0,-Math.PI/2)
        car.position = new BABYLON.Vector3(-3,0.16,8)

        const carAnim = new BABYLON.Animation('carAnimation','position.z',30,BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
        const carkeys = [{frame:0,value:8},{frame:300,value:-7},{frame:350,value:-7}]
        carAnim.setKeys(carkeys)
        car.animations = []
        car.animations.push(carAnim)
        this.scene.beginAnimation(car,0,350,true)

        // 轮子作为车的子级，似乎不用，效果不明显
        // const wheelRB = this.scene.getMeshByName('wheelRB')
        // this.scene.beginAnimation(wheelRB,0,30,true)
        // const wheelRF = this.scene.getMeshByName('wheelRF')
        // this.scene.beginAnimation(wheelRF,0,30,true)
        // const wheelLB = this.scene.getMeshByName('wheelLB')
        // this.scene.beginAnimation(wheelLB,0,30,true)
        // const wheelLF = this.scene.getMeshByName('wheelLF')
        // this.scene.beginAnimation(wheelLF,0,30,true)
      })

      // 行走的 Dude
      const walk = function(trun,dist) {
        return {
          trun,dist
        }
      }
      const track = []
      track.push(new walk(86,7))
      track.push(new walk(-85, 14.8))
      track.push(new walk(-93, 16.5))
      track.push(new walk(48, 25.5))
      track.push(new walk(-112, 30.5))
      track.push(new walk(-72, 33.2))
      track.push(new walk(42, 37.5))
      track.push(new walk(-98, 45.2))
      track.push(new walk(0, 47))
      // 下载到本地后，没有贴图纹理
      // BABYLON.SceneLoader.ImportMeshAsync('him','/models/','Dude.babylon',this.scene).then((result)=>{
      BABYLON.SceneLoader.ImportMeshAsync('him','https://playground.babylonjs.com/scenes/Dude/','Dude.babylon',this.scene).then((result)=>{
        const dube = result.meshes[0]
        dube.scaling = new BABYLON.Vector3(0.008,0.008,0.008)
        dube.position = new BABYLON.Vector3(-6,0,0)
        dube.rotate(BABYLON.Axis.Y,BABYLON.Tools.ToRadians(-95),BABYLON.Space.LOCAL)
        const startRotation = dube.rotationQuaternion.clone()
        this.scene.beginAnimation(result.skeletons[0],0,100,true,1.0)

        let distance = 0
        let step = 0.025
        let p = 0
        this.scene.onBeforeRenderObservable.add(()=>{
          dube.movePOV(0,0,step)
          distance += step
          if(distance > track[p].dist){
            dube.rotate(BABYLON.Axis.Y,BABYLON.Tools.ToRadians(track[p].trun),BABYLON.Space.LOCAL)
            p += 1
            p %= track.length
            if(p === 0){
              distance = 0
              dube.position = new BABYLON.Vector3(-6,0,0)
              dube.rotationQuaternion = startRotation.clone()
            }
          }
        })
      })


    },
  }

}
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
