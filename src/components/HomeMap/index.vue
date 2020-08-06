<template>
    <div>
      <div id="l-map"></div>
    </div>
</template>
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=lSZms8vUZ0bZns6rVHLWe3RQLaovokQM"></script>
<script>
    import {mapRequest} from '../../api/request'
    export default {
        name: "index",
        data(){
          return{
            //地址数据
            adds:[],
            //设备ID
            deviceId:[]
          }
        },
        methods:{
          //地图初始化
          mapInit(){
            var map = new BMapGL.Map("l-map");
            map.centerAndZoom(new BMapGL.Point(114.40555,22.707533), 19);
            map.enableScrollWheelZoom(true);
            map.setHeading(0);
            map.setTilt(73);
            var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
            map.addControl(scaleCtrl);
            var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
            map.addControl(zoomCtrl);
            var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
            map.addControl(navi3DCtrl);
            for(var i = 0; i<this.adds.length; i++){
              var marker = new BMapGL.Marker(this.adds[i]);
              map.addOverlay(marker);
              marker.setLabel(new BMapGL.Label("设备ID:</br>"+this.deviceId[i],{offset:new BMapGL.Size(15,-50)}));
            }
          }
        },
        mounted() {
          //页面挂载初始化地图并请求位置数据
          this.mapInit()
          mapRequest(this,BMapGL)
        },
        watch:{
          //监听地址数据变化并重新渲染地图
          adds:{
            handler(){
              this.mapInit()
            },
            immediate:true,
            deep:true
          },
          //监听设备数据变化并重新渲染地图
          deviceId:{
            handler(){
              this.mapInit()
            },
            immediate:true,
            deep:true
          }
        }
    }
</script>

<style scoped>
    #l-map{
        height: 21.4rem;
        width: 39.4rem;
        border-radius: 1rem;
        border:0.3rem solid white;
    }
</style>