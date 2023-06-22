<script setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
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
    am5percent.PieChart.new(root, {
      endAngle: 270
    })
  );

  // Define data
  let data = props.options.data;

  
  // Create series
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270
        })
    );

    series.states.create("hidden", {
        endAngle: -90
    });
    series.data.setAll(data);
 
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
