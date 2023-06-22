<script setup>
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import { computed, ref } from "vue"

const props = defineProps({
    type: {
        type: String,    
        default: ''
    },
    options: {
        type: Object  // options.type = Bar | Line | Pie ...
    }
})

const components = {
    'BarChart': BarChart,
    'LineChart': LineChart,
    'PieChart': PieChart
}
const currentChart = computed(() => props.options.type + 'Chart')

</script>

<template>
    <h6>{{ currentChart }}</h6>
    <div style="padding: 15px;">       
        <component 
            :is="components[currentChart]"
            :options="options">
        </component>
    </div>
</template>

<style scoped>

</style>
