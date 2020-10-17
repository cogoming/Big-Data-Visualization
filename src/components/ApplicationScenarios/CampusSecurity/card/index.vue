<template>
  <div>
    <div class="card">
      <div class="card-left">
        <div class="card-left-num">
          <div class="num" :style="numStyle">{{ num }}</div>
          <img class="card-icon" :src=" decimals > 0 ? cardStyle.upSrc : cardStyle.downSrc ">
          <div class="decimals" :style="decimals > 0 ? cardStyle.upColor : cardStyle.downColor">{{
              decimals
            }}
          </div>
        </div>
        <div class="card-left-word">
          {{ name }}
        </div>
      </div>
      <img class="card-chart" :src="chartSrc">
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    //数字样式
    numStyle: String,
    //数字数值
    num: Number,
    //小数数值
    decimals: Number,
    //标题
    name: String,
    //卡片总体样式
    cardStyle: Object,
    //图表图标地址
    chartSrc: String
  }
}
</script>

<style scoped>
.card {
  height: 6.57rem;
  width: 26.6rem;
  background: white;
  margin: 0 2.03rem 1.22rem 0;
  display: flex;
  flex-direction: row;
}

.card-icon {
  height: 0.67rem;
  width: 0.54rem;
  margin: 2.3rem 0.3rem 0 0;
}

.card-left {
  display: flex;
  flex-direction: column;
  margin: 0.6rem 0 0 3.17rem;
}

.card-left-num {
  display: flex;
  flex-direction: row;
  margin-bottom: -0.5rem;
}

.card-left-word {
  font-size: 0.88rem;
  color: #4D4F5C;
}

.num {
  font-size: 3.04rem;
  margin: 0 0.5rem 0 0;
  font-weight: 400;
}

.decimals {
  font-size: 0.88rem;
  margin: 2rem 0 0 0;
  font-weight: bold;
}

.card-chart {
  margin: 2.3rem 1rem 0 6.8rem;
  width: 7.56rem;
  height: 2.7rem;
}
</style>