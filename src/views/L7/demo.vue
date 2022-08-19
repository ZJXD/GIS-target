<template>
  <div id="demoMap"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Scene, PointLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'

export default defineComponent({
  setup() {
    onMounted(() => {
      const scene = new Scene({
        id: 'demoMap',
        map: new GaodeMap({
          pitch: 0,
          style: 'dark',
          center: [121.435159, 31.256971],
          zoom: 15,
          minZoom: 10,
          token: 'eebd1da15f69153281dd241cb6b29713',
        }),
      })

      // 几何图形
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json'
      )
        .then((res) => res.json())
        .then((data) => {
          const pointLayer = new PointLayer({})
            .source(data, {
              parser: {
                type: 'json',
                x: 'longitude',
                y: 'latitude',
              },
            })
            .shape('name', [
              'circle',
              'triangle',
              'square',
              'pentagon',
              'hexagon',
              'octogon',
              'hexagram',
              'rhombus',
              'vesica',
            ])
            .size('unit_price', [10, 25])
            .color('name', [
              '#5B8FF9',
              '#5CCEA1',
              '#5D7092',
              '#F6BD16',
              '#E86452',
            ])
            .style({
              opacity: 0.3,
              strokeWidth: 2,
            })

          scene.addLayer(pointLayer)
        })

      // 海量亮度图
      // fetch(
      //   'https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt'
      // )
      //   .then((res) => res.text())
      //   .then((data) => {
      //     const lightPointLayer = new PointLayer({})
      //       .source(data, {
      //         parser: {
      //           type: 'csv',
      //           x: 'lng',
      //           y: 'lat',
      //         },
      //       })
      //       .size(0.5)
      //       .color('#080298')
      //       .style({ opacity: 1 })

      //     scene.addLayer(lightPointLayer)
      //   })
    })
  },
})
</script>

<style lang="scss" scoped>
#demoMap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
