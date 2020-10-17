  <template>
  <div>
    <div class="pos-all">
      <div class="pos-title">预警位置</div>
      <div id="pos-map"></div>
      <div class="pos-bottom">
        <div class="pos-map-text">
          经度：{{ this.activeWarning.position.longitude }}  纬度：{{ this.activeWarning.position.latitude }}
        </div>
        <div id="pos-map-text">{{ position }}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=lSZms8vUZ0bZns6rVHLWe3RQLaovokQM"></script>
<script>
import {mapState} from 'vuex'

export default {
  name: "index",
  data(){
    return{
      //逆解析经纬度得出的地址变量
      position:''
    }
  },
  methods: {
    //初始化地图
    mapinit() {
      var map = new BMap.Map("pos-map");
      //将当前选择预警的位置当做中心
      var point = new BMap.Point(this.activeWarning.position.longitude, this.activeWarning.position.latitude);
      //设置地图中心和缩放
      map.centerAndZoom(point, 17);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);// 将标注添加到地图中
      map.enableScrollWheelZoom(true);
      var myGeo = new BMap.Geocoder();
      myGeo.getLocation(point,(rs)=>{
        var addComp = rs.addressComponents;
        //逆解析地址
        this.position=addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber
      })
    }
  },
  computed: {
    ...mapState(['activeWarning'])
  },
  mounted() {
    this.mapinit()
  },
  watch: {
    //监听当前选择预警变化  并重新初始化地图
    activeWarning: {
      handler() {
        this.mapinit()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
.pos-all {
  margin: 1.16rem 0 0 0.88rem;
}

.pos-title {
  font-size: 1.21rem;
  font-weight: 400;
  color: #4D4F5C;
}

#pos-map {
  height: 16.87rem;
  width: 20.3rem;
  margin: 1.14rem 0 1rem 0;
}

#pos-map-text {
  font-size: 0.87rem;
  font-weight: 400;
  color: #4D4F5C;
}
.pos-map-text{
  font-weight: 400;
  font-size: 0.87rem;
  color: #A6A7AD;
  margin: 0.5rem 0.5rem 0.5rem 0;
}
</style>