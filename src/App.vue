<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from "./components/layout/header/Header.vue";
import Nav from "./components/layout/nav/Nav.vue";
import Footer from "./components/layout/footer/Footer.vue";
import MessageModal from './components/modal/MessageModal.vue'
import { useMessageModalStore } from './stores/messageModal'


const messageModalStore = useMessageModalStore()
onMounted(() => {    
    window.onpopstate = () => {
        messageModalStore.close()
    }
})
</script>

<template>
    <div id="wapper">
        <Header></Header>
        <!-- Page Content -->
        <div class="container">
            <div class="row">
                <Nav></Nav>
                <!-- /.col-lg-3 -->
                <div class="col-lg-9 my-4 mb-4">                    
                    <router-view></router-view>                        
                    <MessageModal></MessageModal>
                </div>
                <!-- /.col-lg-9 -->
            </div>
            <!-- /.row -->
        </div>
        <Footer></Footer>
    </div>
</template>

<style scoped>
</style>
