<template>
  <div>
    <div class="trajectory" id="tra-map">
    </div>
  </div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=lSZms8vUZ0bZns6rVHLWe3RQLaovokQM&services=&t=20200825103044"></script>
<script src="http://api.map.baidu.com/getscript?v=2.0&ak=lSZms8vUZ0bZns6rVHLWe3RQLaovokQM"></script>
<script type="text/javascript" src="//api.map.baidu.com/library/TrackAnimation/src/TrackAnimation_min.js"></script>
<script>
import {trajRequest} from '../../../api/HomePage/DataAnalysis'

export default {
  name: "index",
  data() {
    return {
    }
  },
  methods: {
    mapInit(data) {
      var bmap = new BMapGL.Map("tra-map");
      bmap.centerAndZoom(new BMapGL.Point(114.40555, 22.707533), 16);    // 初始化地图，设置中心点坐标和地图级别
      bmap.enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
      let scaleCtrl = new BMapGL.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});  // 添加比例尺控件
      bmap.addControl(scaleCtrl);
      let zoomCtrl = new BMapGL.ZoomControl({anchor: BMAP_ANCHOR_TOP_RIGHT});  // 添加缩放控件
      bmap.addControl(zoomCtrl);
      let navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
      bmap.addControl(navi3DCtrl);

      let points = [];

      for (let i = 0; i <data.length; i++) {
        points.push(new BMapGL.Point(data[i].lng,data[i].lat))
      }
      console.log(points)
      var pl = new BMapGL.Polyline(points);
      var trackAni = new BMapGLLib.TrackAnimation(bmap, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 30,          // 轨迹播放的角度，默认为55
        duration: 20000,   // 动画持续时长，默认为10000，单位ms
        delay: 1000        // 动画开始的延迟，默认0，单位ms
      });
      trackAni.start();
    //}

    }
  },
  mounted() {
    trajRequest(this)
  }
}
</script>

<style scoped>
.trajectory {
  height: 38rem;
  border: 1rem solid white;
  border-radius: 1rem;
}
</style>