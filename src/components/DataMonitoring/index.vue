<template>
    <div>
        <div class="title">数据监测</div>
        <v-chart id="home-temperature-data-monitoring" class="home-chart" style="margin: 1rem 0 0 0.5rem;" :options="temperatureOption"/>
        <v-chart id="home-humidity-data-monitoring" class="home-chart" style="margin-top: -2vh" :options="humidityOption"/>
        <v-chart id="home-Illumination-data-monitoring" class="home-chart" style="margin-top: -2vh" :options="IlluminationOption"/>
    </div>
</template>
<script>
    import {dataMonitoringRequest} from '../../api/request'
    import {mapState} from 'vuex'

    export default {
        name: "index",
        data(){
            return{
                //具体参数配置参考eCharts官方配置项手册
                //温度监测图表配置
                temperatureOption:{
                    title: {
                        text: '温度',
                        textStyle: {
                            align: 'center',
                            color: '#0872ea',
                            fontSize: this.$rem(1),
                            fontWeight:this.$rem(25)
                        },
                        top: '0%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br />{a}: {c}℃',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '5%',
                        right: '9%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        name:'日期',
                        splitNumber: 8,
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea'
                            }
                        },
                        splitArea: {
                            // show: true,
                            color: 'black',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#0872ea',
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data: ['7.22', '7.22','7.23', '7.23','7.24','7.24', '7.25','7.25'],

                    }],

                    yAxis: [{
                        type: 'value',
                        name: '温度/ ℃',
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        min: 0,
                        max: 50,
                        splitNumber: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea',
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: this.$rem(0.8),
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                    }],
                    series: [
                        {
                            name: '温度',
                            type: 'line',
                            smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            showSymbol:false,
                            symbolSize: this.$rem(0.3),
                            lineStyle: {
                                normal: {
                                    color: "#0872ea",
                                    shadowColor: '#0872ea',
                                    shadowBlur: 0,
                                    shadowOffsetY: 0,
                                    shadowOffsetX: 0,
                                    width:this.$rem(0.12)
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#0872ea',
                                    fontSize:this.$rem(0.7)
                                }
                            },

                            itemStyle: {
                                color: "#fff",
                                borderColor: "#0872ea",
                                borderWidth:this.$rem(0.16),
                                shadowColor: 'rgba(0,0,0,0.3)',
                                shadowBlur: 0,
                                shadowOffsetY: this.$rem(0.16),
                                shadowOffsetX: this.$rem(0.16),
                            },
                            tooltip: {
                                show: true,
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0872ea'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: '#fff',
                                    shadowBlur: this.$rem(1.6)
                                }
                            },
                            data: [26,37,39,34,28,38,27,29],
                        },
                    ]
                },
                //湿度监测图表配置
                humidityOption:{
                    title: {
                        text: '湿度',
                        textStyle: {
                            align: 'center',
                            color: '#0872ea',
                            fontSize: this.$rem(1),
                            fontWeight:this.$rem(25)
                        },
                        top: '0%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br />{a}: {c}%',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '5%',
                        right: '9%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        name:'日期',
                        splitNumber: 8,
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea'
                            }
                        },
                        splitArea: {
                            // show: true,
                            color: 'black',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#0872ea',
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data: ['7.22', '7.22','7.23', '7.23','7.24','7.24', '7.25','7.25'],

                    }],

                    yAxis: [{
                        type: 'value',
                        name: '湿度/ %',
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        min: 0,
                        max: 100,
                        splitNumber: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea',
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: this.$rem(0.8),
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                    }],
                    series: [
                        {
                            name: '湿度',
                            type: 'line',
                            smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            showSymbol:false,
                            symbolSize: this.$rem(0.3),
                            lineStyle: {
                                normal: {
                                    color: "#0872ea",
                                    shadowColor: '#0872ea',
                                    shadowBlur: 0,
                                    shadowOffsetY: 0,
                                    shadowOffsetX: 0,
                                    width:this.$rem(0.12)
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#0872ea',
                                    fontSize:this.$rem(0.7)
                                }
                            },

                            itemStyle: {
                                color: "#fff",
                                borderColor: "#0872ea",
                                borderWidth:this.$rem(0.16),
                                shadowColor: 'rgba(0,0,0,0.3)',
                                shadowBlur: 0,
                                shadowOffsetY: this.$rem(0.16),
                                shadowOffsetX: this.$rem(0.16),
                            },
                            tooltip: {
                                show: true,
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0872ea'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: '#fff',
                                    shadowBlur: this.$rem(1.6)
                                }
                            },
                            data: [20,30,37,58,64,70,54,43],
                        },
                    ]
                },
                //光照监测图表配置
                IlluminationOption:{
                    title: {
                        text: '光照强度',
                        textStyle: {
                            align: 'center',
                            color: '#0872ea',
                            fontSize: this.$rem(1),
                            fontWeight:this.$rem(25)
                        },
                        top: '0%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br />{a}: {c}Lux',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '1.5%',
                        right: '9%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        name:'日期',
                        splitNumber: 8,
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea'
                            }
                        },
                        splitArea: {
                            // show: true,
                            color: 'black',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#0872ea',
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data: ['7.22', '7.22','7.23', '7.23','7.24','7.24', '7.25','7.25'],

                    }],

                    yAxis: [{
                        type: 'value',
                        name: '光照/ Lux',
                        nameTextStyle:{
                            color:'#0872ea',
                            fontSize:this.$rem(0.7)
                        },
                        min: 0,
                        max: 10000,
                        splitNumber: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#0872ea',
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: this.$rem(0.8),
                            textStyle: {
                                color: '#0872ea',
                                fontSize:this.$rem(0.7)
                            },
                        },
                        axisTick: {
                            show: true,
                        },
                    }],
                    series: [
                        {
                            name: '光照强度',
                            type: 'line',
                            smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            showSymbol:false,
                            symbolSize: this.$rem(0.3),
                            lineStyle: {
                                normal: {
                                    color: "#0872ea",
                                    shadowColor: '#0872ea',
                                    shadowBlur: 0,
                                    shadowOffsetY: 0,
                                    shadowOffsetX: 0,
                                    width:this.$rem(0.12)
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#0872ea',
                                    fontSize:this.$rem(0.7)
                                }
                            },

                            itemStyle: {
                                color: "#fff",
                                borderColor: "#0872ea",
                                borderWidth:this.$rem(0.16),
                                shadowColor: 'rgba(0,0,0,0.3)',
                                shadowBlur: 0,
                                shadowOffsetY: this.$rem(0.16),
                                shadowOffsetX: this.$rem(0.16),
                            },
                            tooltip: {
                                show: true,
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0872ea'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: '#fff',
                                    shadowBlur: this.$rem(1.6)
                                }
                            },
                            data: [3000,4000,5000,3000,2000,4000,7000,8000],
                        },
                    ]
                },
                //异步数据请求定时器挂载变量
                delay:null
                }
        },
        computed:{
          ...mapState(['homePageDelay']) //Vuex引入homePageDelay（数据时延）变量
        },
        watch:{
          //监听homePageDelay（数据时延）并及时响应  关闭定时器并重新按时延开启定时器
          homePageDelay:{
            handler(){
              clearInterval(this.delay)
              this.delay=setInterval(()=>{
                dataMonitoringRequest(this)
              },this.homePageDelay)
            },
            immediate:true,
            deep:true
          }
        },
        mounted() {
            // window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', this.resizeHandle, false);
            // document.addEventListener('DOMContentLoaded', this.resizeHandle, false);
          /*
          * 页面挂载发起一次数据监测数据请求并开启定时器
          * */
          dataMonitoringRequest(this)
          this.delay=setInterval(()=>{
            dataMonitoringRequest(this)
          },this.homePageDelay)

        },
        methods:{
            //图表响应式处理（未启用）
            resizeHandle(){
                document.getElementById('home-temperature-data-monitoring').resize()
                document.getElementById('home-humidity-data-monitoring').resize()
                document.getElementById('home-Illumination-data-monitoring').resize()
            }
        }
    }
</script>
<style scoped>
    .title{
        border-bottom:0.08rem solid dimgray;
        font-weight: 700;
        margin: 0 0.93rem 0 0.93rem;
        padding: 0.8rem 0 0.5rem 0;
    }
    .home-chart{
        height: 30rem;
        width: 27rem;
        margin: 2.2rem 0 0 0.5rem;
        z-index: 2;
    }
</style>