<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useCounterStore } from '../../stores/counter'

const data = ref([])
const { proxy } = getCurrentInstance();
const store = useCounterStore();

const getData = async () => {
    await proxy.$axios.get('/json/test.json').then((res) => {        
        data.value = res.data
    })
}

onMounted(() => {
    getData()
})


</script>

<template>
    <div>
        <h4>Axios Test</h4>
        <br>
        <div>           
            <textarea rows="15" cols="60">{{data}}</textarea>
        </div>
         <br/>
        <br/>
        <hr/>
        <h4>Pinia Test</h4>
        현재 count : {{store.count}} / {{store.doubleCount}}  <b-button @click="store.increment">count ++</b-button>
    </div>
</template>

<style>

</style>