<template>
  <div id="buildingMap"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {Scene,PolygonLayer,GaodeMap} from '@antv/l7'

export default defineComponent({
    setup() {
        onMounted(()=>{
            console.log(document.getElementById('buildingMap'))
            const scene = new Scene({
                id:'buildingMap',
                map: new GaodeMap({
                    pitch:0,
                    style:'dark',
                    center:[ 114.050008, 22.529272 ],
                    zoom:14,
                    minZoom:9,
                    token:'eebd1da15f69153281dd241cb6b29713'
                })
            })

            fetch('https://gw.alipayobjects.com/os/basement_prod/972566c5-a2b9-4a7e-8da1-bae9d0eb0117.json')
                .then(res=>res.json())
                .then(data=>{
                    const polygon = new PolygonLayer({})
                        .source(data)
                        .shape('extrude')
                        .size('h20',[100,120,160,200,260,500])
                        .color('h20',['#816CAD','#A67FB5','#C997C7','#DEB8D4','#F5D4E6','#FAE4F1','#FFF3FC'])
                        .style({opacity:1})

                    scene.addLayer(polygon)
                })
        })
    },
})
</script>


<style lang="scss" scoped>
#buildingMap{
    position: relative;
    width: 100%;
    height: 100%;
}
</style>