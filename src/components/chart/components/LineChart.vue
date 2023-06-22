<script setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { shallowRef, onMounted } from 'vue';

const props = defineProps({
    options: {
        type: Object
    }
})

let root;
const chartdiv = shallowRef(null);

onMounted(() => {
  root = am5.Root.new(chartdiv.value);

  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
    })
  );

  // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
        value = Math.round((Math.random() * 10 - 5) + value);
        am5.time.add(date, "day", 1);
        return {
            date: date.getTime(),
            value: value
        };
    }

    function generateDatas(count) {
        let data = [];
        for (let i = 0; i < count; ++i) {
            data.push(generateData());
        }
        return data;
    }

    let data = generateDatas(1200);


  // Define data
  //let data = props.options.data;

  // Create Y-axis
  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Create X-Axis
  let xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    })
  );
 // xAxis.data.setAll(data);

  // Create series
  let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        })
    }));
  series.data.setAll(data);  
  

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));
  
});
</script>

<template>
    <div>       
        <div class="chart" ref="chartdiv"></div>
    </div>
</template>

<style scoped>
.chart {
  width: 350px;
  height: 350px;
}
</style>
