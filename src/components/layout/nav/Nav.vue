<script setup>
</script>

<template>
    <div class="col-lg-3">
        <h3 class="my-4 text-center">Sample Page</h3>
        <div class="list-group mb-4">
            <div class="list-group-item list-group-item-info font-weight-bold"><router-link to="/test1">Axios</router-link></div>   
            <div class="list-group-item list-group-item-info font-weight-bold"><router-link to="/test2">Util</router-link></div> 
            <div class="list-group-item list-group-item-info font-weight-bold"><router-link to="/test3">amChart</router-link></div> 
            <div class="list-group-item list-group-item-info font-weight-bold">
                Bootstrap
                <ul>
                    <li><router-link to="/test4/sample">Sample</router-link></li>
                    <li><router-link to="/test4/table">Table</router-link></li>
                    <li><router-link to="/test4/message">Message Modal</router-link></li>
                </ul>
                
            </div>        
            <div class="list-group-item list-group-item-info font-weight-bold"><router-link to="/test5">S-Map</router-link></div>        
        </div>
    </div>
</template>

<style scoped>
</style>
