import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageModalStore = defineStore('messageModal', () => {
	const isShow = ref(false)	
	const options = ref({}) // type: 메세지 타입, message: 메세지, callFnc : callback Function

	function open(modalOptions = {}) {		
		isShow.value = true
		options.value = modalOptions		
	}

	function close(params) {
		isShow.value = false
		options.value = {}
	}

	return {isShow, options, open, close}
})