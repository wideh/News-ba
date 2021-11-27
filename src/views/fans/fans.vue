<template>
  <el-card class="filter-card">
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <div ref="main" style="width: 600px;height:400px;"></div>
    <map-demo />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
// 如果依赖百度地图的图表，必须，详见官网的"下载"-"扩展下载"
// 1.加载 百度地图的 javaScript SDK脚本文件
// 2.加载 echarts 百度地图的扩展
import 'echarts/dist/extension/bmap'
import mapDemo from './components/mapDemo.vue'
export default {
  name: 'fansIndex',
  components: { mapDemo },
  mounted() {
    var myChart = echarts.init(this.$refs.main);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  }
}
</script>


<style>

</style>