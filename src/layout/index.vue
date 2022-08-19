<template>
  <div class="layout">
    <div class="header">
      <div class="logo">GISTarget</div>
      <div class="setting">设置信息</div>
    </div>
    <div class="container">
      <div class="sider">
        <el-menu :default-active="state.activeIndex" @open="handleOpen" @close="handleClose">
          <template v-for="menu in state.menuList" :key="menu.id">
            <el-sub-menu v-if="menu.child && menu.child.length>0" :index="menu.id">
              <template #title>{{ menu.name }}</template>
              <el-menu-item v-for="subMenu in menu.child" :key="subMenu.id" :index="subMenu.id" @click="onMenuItemClick(subMenu.path,subMenu.id)">{{ subMenu.name }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.id" @click="onMenuItemClick(menu.path || '',menu.id)">{{ menu.name }}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="info">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  menuList: [
    {
      id: '3',
      name: 'Babylon.js',
      path: '/babylon',
      child: [
        { id: '301', name: 'start', path: '/babylon/start' },
        { id: '302', name: 'village', path: '/babylon/village' },
      ],
    },
    {
      id: '1',
      name: 'L7',
      path: '/7',
      child: [
        { id: '101', name: 'demo', path: '/l7/demo' },
        { id: '102', name: 'building', path: '/l7/building' },
      ],
    },
    { id: '2', name: 'Deck.GL' },
  ],
  activeIndex: '301',
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const onMenuItemClick = (path: string, key: string) => {
  router.push(path)
  state.activeIndex = key
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  .header {
    height: 60px;
    width: 100%;
    display: flex;
    background-color: dodgerblue;
    z-index: 10;

    .logo {
      width: 200px;
      line-height: 60px;
      font-size: 30px;
    }
  }

  .container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    overflow-y: hidden;

    .sider {
      height: 100%;
      width: 200px;
      overflow-y: auto;
    }

    .info {
      height: 100%;
      width: calc(100% - 200px);
    }
  }
}
</style>
