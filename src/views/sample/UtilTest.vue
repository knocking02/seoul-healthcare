<script setup>
import { range } from 'lodash'
import { useCounterStore } from '../../stores/counter'

const title = 'hello~~~~'
const lodashTest = range(1,  3)
const store = useCounterStore();

</script>

<template>
    <div>
        <h4>UTIL TEST</h4>
        <br/>
        CONSTANT TEST : {{ $const.SITE_NAME }} <br>
        util TEST : {{$util.capitalize(title)}} <br>
        lodash TEST : {{ lodashTest }} <br>
        dayjs TEST: {{ $date('2022-06-20').format('DD/MM/YYYY') }}
        <br/>
        <br/>
        <hr/>
        <h4>Pinia Test</h4>
        현재 count : {{store.count}} / {{store.doubleCount}} <button @click="store.increment">count ++</button>
    </div>
</template>

<style>

</style>