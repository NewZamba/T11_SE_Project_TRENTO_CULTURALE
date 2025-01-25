<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

  export default {
    name: 'BarChart',
    components: {
      'v-chart': ECharts,
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
      labels: {
        type: Array,
        required: true,
      }
    },
    computed: {
      chartOptions() {
        return {
          title: {
            text: 'diomerrda',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Values'],
            bottom: 0,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: this.labels,
            axisLabel: {
              rotate: 45,
            },
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Values',
              type: 'bar',
              data: this.data,
              barWidth: '50%',
            },
          ],
        };
      },
    },
  };
</script>

<template>
  <div class="chart-container">
    <v-chart
        :options="chartOptions"
        autoresize
        :style="{ height: '400px', width: '100%' }"
    />
  </div>
</template>

<style scoped>
  .chart-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
