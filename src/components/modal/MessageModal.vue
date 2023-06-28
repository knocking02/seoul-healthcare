<script setup>
import { ref, computed } from 'vue'
import { useMessageModalStore } from '../../stores/messageModal'

const messageModalStore = useMessageModalStore()

const headerBgVariant = computed(() => {
	let variant = ''
	switch(messageModalStore.options.type) {
		case 'alert':
			variant = 'primary'
			break
		case 'confirm':
			variant = 'success'
			break
		case 'error': 
			variant = 'danger'
			break
		default: 
			variant = 'light'
	} 
	return variant
})
const okOnly = computed(() => messageModalStore.options.type !== 'confirm')

const confirm = () => {
	console.log('ok')	
	if(messageModalStore.options.type == 'confirm' 
			&& typeof messageModalStore.options.callFnc === 'function') {
		messageModalStore.options.callFnc()
	}
}

const close = () => {
	messageModalStore.close()
}

</script>

<template>
	<BModal 
		:header-bg-variant="headerBgVariant"
		headerTextVariant = 'light'
		v-model="messageModalStore.isShow" 
		:title="messageModalStore.options.type"
		:ok-only="okOnly"
		@ok="confirm"
		@hide="close"
	>
		<p class="my-4">{{messageModalStore.options.message}}</p>
	</BModal>
</template>

<style>

</style>
