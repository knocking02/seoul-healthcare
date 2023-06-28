<script setup>
import { ref } from 'vue'
import { useMessageModalStore } from '../../stores/messageModal.js'
const messageModalStore = useMessageModalStore()

const alertPopup = () => {
	messageModalStore.open({
		type: 'alert',
		message: '이름을 입력해주세요.'
	})
}

const createMember = () => {
	alert('Success')
}

const confirmPopup = () => {
	messageModalStore.open({
		type: 'confirm',
		message: '회원가입 하시겠습니까?',
		callFnc: createMember
	})
}

const errorPopup = () => {
	messageModalStore.open({
		type: 'error',
		message: '403 Error'
	})
}

</script>

<template>
	<div>
		<h4> 공통 Message</h4>		
		<b-button class="m-md-2" @click="alertPopup">Alert</b-button>
		<b-button class="m-md-2" @click="confirmPopup">Confirm</b-button>
		<b-button class="m-md-2" @click="errorPopup">Error</b-button>
	</div>
</template>

<style>

</style>
