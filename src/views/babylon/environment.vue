<template>
  <div class="environment info-content">
    <canvas ref="environmentEl"></canvas>
  </div>
</template>

<script>
import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'


export default {
  data(){
    return{
      engine:null,
      scene:BABYLON.Scene,
      fountain:null,
      particleSystem:BABYLON.ParticleSystem,
      open:false
    }
  },
  mounted(){
    this.engine = new BABYLON.Engine(this.$refs.environmentEl,true,{preserverDrawingBuffer:true,stencli:true})
    this.createScene()
    this.engine.runRenderLoop(()=>{this.scene.render()})
  },
  beforeUnmount(){
    if(this.particleSystem) {
      this.particleSystem.stop()
      this.particleSystem.dispose()
    }
    this.scene && this.scene.dispose()
  },
  methods:{
    createScene(){
      this.scene = new BABYLON.Scene(this.engine)
      const camera = new BABYLON.ArcRotateCamera('camera',-Math.PI/2,Math.PI/4,15,new BABYLON.Vector3(0,0,0))
      // 视角不能移动到地面以下
      camera.upperBetaLimit = Math.PI/2.2
      camera.attachControl(this.$refs.environmentEl,true)
      new BABYLON.HemisphericLight('light',new BABYLON.Vector3(2,1,0))

      // valleyvillage.glb 中包含 ground
      // const largeGroundMat = new BABYLON.StandardMaterial('largeGroundMat')
      // largeGroundMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/valleygrass.png')
      // const largeGround = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('largeGround','https://assets.babylonjs.com/environments/villageheightmap.png',{width:150,height:150,subdivisions:20,minHeight:0,maxHeight:10})
      // largeGround.material = largeGroundMat
      // largeGround.position.y = -0.01

      // const groundMat = new BABYLON.StandardMaterial('groundMat')
      // groundMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/villagegreen.png')
      // groundMat.diffuseTexture.hasAlpha = true
      // const ground = new BABYLON.MeshBuilder.CreateGround('ground',{width:24,height:24})
      // ground.material = groundMat

      // sky
      const skyboxMat = new BABYLON.StandardMaterial('skyboxMat')
      skyboxMat.backFaceCulling = false
      skyboxMat.reflectionTexture = new BABYLON.CubeTexture('https://playground.babylonjs.com/textures/skybox')
      skyboxMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
      skyboxMat.diffuseColor = new BABYLON.Color3(0,0,0)
      skyboxMat.specularColor = new BABYLON.Color3(0,0,0)
      const skybox = new BABYLON.MeshBuilder.CreateBox('skybox',{size:150})
      skybox.material = skyboxMat

      // trees
      const spriteManagerTrees = new BABYLON.SpriteManager('treesManager','https://playground.babylonjs.com/textures/palm.png',2000,{width:512,height:1024},this.scene)
      // 生成两片树林
      for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite('tree',spriteManagerTrees)
        tree.position.x = Math.random()*(-30)
        tree.position.z = Math.random()*20 + 8
        tree.position.y = 0.5
      }
      for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite('tree',spriteManagerTrees)
        tree.position.x = Math.random()*25 + 7
        tree.position.z = Math.random()*(-35) + 8
        tree.position.y = 0.5
      }

      // 喷泉
      const fountainProfile = [
        new BABYLON.Vector3(0,0,0),
        new BABYLON.Vector3(0.5,0,0),
        new BABYLON.Vector3(0.5,0.2,0),
        new BABYLON.Vector3(0.4,0.2,0),
        new BABYLON.Vector3(0.4,0.2,0),
        new BABYLON.Vector3(0.05,0.1,0),
        new BABYLON.Vector3(0.05,0.75,0),
        new BABYLON.Vector3(0.15,0.85,0),
      ]
      this.fountain = new BABYLON.MeshBuilder.CreateLathe('fountain',{shape:fountainProfile,sideOrientation:BABYLON.Mesh.DOUBLESIDE},this.scene)
      // fountain.scaling = new BABYLON.Vector3(0.05,0.05,0.05)
      this.fountain.position = new BABYLON.Vector3(-3,0,-5)

      this.particleSystem = new BABYLON.ParticleSystem('particles',5000,this.scene)
      // particleSystem.position = new BABYLON.Vector3(-3,0,-5)
      this.particleSystem.particleTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/flare.png',this.scene)
      // 粒子范围
      this.particleSystem.emitter = new BABYLON.Vector3(-3,0.6,-5)
      this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.05,0,0)
      this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.05,0,0)

      // 粒子颜色
      this.particleSystem.color1 = new BABYLON.Color4(0.7,0.8,1.0,1.0)
      this.particleSystem.color2 = new BABYLON.Color4(0.2,0.5,1.0,1.0)
      this.particleSystem.colorDead = new BABYLON.Color4(0,0,0.2,0.0)

      // 粒子大小范围
      this.particleSystem.minSize = 0.01
      this.particleSystem.maxSize = 0.05
      // 生命周期范围
      this.particleSystem.minLifeTime = 0.3
      this.particleSystem.maxLifeTime = 1.5
      // 发射速率
      this.particleSystem.emitRate = 1500
      // 混合模式
      this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE
      // 粒子重力，可以再下落
      this.particleSystem.gravity = new BABYLON.Vector3(0,-9.8,0)
      // 粒子发射的方向
      this.particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1)
      this.particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1)
      // 角速度
      this.particleSystem.minAngularSpeed = 0
      this.particleSystem.maxAngularSpeed = Math.PI
      // 速度
      this.particleSystem.minEmitPower = 0.2
      this.particleSystem.maxEmitPower = 0.6
      this.particleSystem.updateSpeed = 0.01
      // 控制喷泉
      this.scene.onPointerObservable.add((pointerInfo)=>{
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            console.log('点击事件')
            if(pointerInfo.pickInfo.hit){
              console.log(pointerInfo.pickInfo.hit,pointerInfo.pickInfo.pickedMesh)
              this.pointerDown(pointerInfo.pickInfo.pickedMesh)
            }
            break;
        
          default:
            break;
        }
      })


      BABYLON.SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','valleyvillage.glb')
      // BABYLON.SceneLoader.ImportMeshAsync('','https://assets.babylonjs.com/meshes/','car.glb').then(()=>{
      //   const car = this.scene.getMeshByName('car')
      //   car.rotation = new BABYLON.Vector3(Math.PI/2,0,-Math.PI/2)
      //   car.position = new BABYLON.Vector3(-3,0.16,8)

      //   const carAnim = new BABYLON.Animation('carAnimation','position.z',30,BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
      //   const carkeys = [{frame:0,value:10},{frame:300,value:-15}]
      //   carAnim.setKeys(carkeys)
      //   car.animations = []
      //   car.animations.push(carAnim)
      //   this.scene.beginAnimation(car,0,300,true)

      //   // 轮子作为车的子级，似乎不用，效果不明显
      //   const wheelRB = this.scene.getMeshByName('wheelRB')
      //   this.scene.beginAnimation(wheelRB,0,30,true)
      //   const wheelRF = this.scene.getMeshByName('wheelRF')
      //   this.scene.beginAnimation(wheelRF,0,30,true)
      //   const wheelLB = this.scene.getMeshByName('wheelLB')
      //   this.scene.beginAnimation(wheelLB,0,30,true)
      //   const wheelLF = this.scene.getMeshByName('wheelLF')
      //   this.scene.beginAnimation(wheelLF,0,30,true)
      // })
    },

    pointerDown(mesh){
      if(mesh.id === 'fountain' && mesh.name === 'fountain'){
        this.open = !this.open
        if(this.open){
          this.particleSystem.start()
        }else{
          this.particleSystem.stop()
        }
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
