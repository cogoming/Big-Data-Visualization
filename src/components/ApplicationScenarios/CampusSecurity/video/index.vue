<template>
  <div>
    <div class="video-all">
      <div class="video-title">预警视频</div>
      <video style="width: 25rem;height: 16.94rem" controls>
        <source :src="activeWarning.videoUrl" type="video/mp4">
        您的浏览器不支持 HTML5 video 标签。
      </video>
      <div class="video-bottom">
        <div class="video-bottom-text">
          <div class="video-warning-type">{{ activeWarning.name }}</div>
          <div class="video-warning-num">识别人数：{{ activeWarning.num }}人</div>
        </div>
        <div class="video-bottom-time">
          <div class="video-time-text">{{ activeWarning.time.h }}:{{ activeWarning.time.m }}:{{ activeWarning.time.s }}</div>
          <div class="video-time-text">{{ activeWarning.time.year }}.{{ activeWarning.time.month }}.{{ activeWarning.time.day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "index",
  computed: {
    //获取当前选择的预警信息
    ...mapState(['activeWarning'])
  }
}
</script>

<style scoped>
.video-all {
  margin: 1.16rem 0 0 1.2rem;
}

.video-title {
  font-size: 1.21rem;
  font-weight: 400;
  margin: 0 0 0.6rem 0;
  color: #4D4F5C;
}

.video-bottom {
  display: flex;
  flex-direction: row;
  margin: 0.6rem 0 0 0;
}

.video-warning-type {
  font-size: 1.21rem;
  color: #4D4F5C;
  font-weight: 400;
  margin: 0 0 0.2rem 0;
}

.video-warning-num {
  font-size: 1.01rem;
  font-weight: 400;
  color: #4D4F5C;
}
.video-bottom-time{
  flex: 1;
  justify-content: flex-end;
  margin-right: 1.2rem;
}
.video-time-text{
  font-size: 1.21rem;
  font-weight: 400;
  color: #4D4F5C;
  display: flex;
  justify-content: flex-end;
}
</style>