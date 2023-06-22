<script setup>
import { nextTick, reactive, ref } from "vue";

// Table
const items = ref(null)
items.value = [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]

// 모달
const modalShow = ref(false)

// Toast
const toastShow = ref(false)

// Form
const form = reactive({
  email: '',
  name: '',
  food: null,
  checked: []
})
const foods = reactive( [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'])
const show = ref(true)

const onSubmit = (event) => {
  event.preventDefault()
  alert(JSON.stringify(form.value))
}

const onReset = (event) => {
  event.preventDefault()
  // Reset our form values
  form.email = ''
  form.name = ''
  form.food = null
  form.checked = []
  // Trick to reset/clear native browser form validation state
  show.value = false

  nextTick(() => {
    show.value = true
  })
  
}

</script>

<template>
    <div>
        <h4>Bootstrap TEST</h4>
        <br>
            <div>
                <b-table striped="striped" hover="hover" :items="items"></b-table>
            </div>
            <div>
                <b-button @click="modalShow = !modalShow">Open Modal</b-button>
                <b-modal v-model="modalShow" title="Modal Test">Hello From Modal!</b-modal>

                <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item active="active">Active action</b-dropdown-item>
                    <b-dropdown-item disabled="disabled">Disabled action</b-dropdown-item>
                </b-dropdown>

                <b-button @click="toastShow = !toastShow">
                  Show toast
                </b-button>
                <b-toast v-model="toastShow" id="example-toast" title="BootstrapVue" static no-auto-hide>
                  Hello, world! This is a toast message.
                </b-toast>
            </div>
            <br>
            <h5>Form</h5>
            <div>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                        description="We'll never share your email with anyone else.">
                        <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email"
                            required="required"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="form.name"
                            placeholder="Enter name"
                            required="required"></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                        <b-form-select
                            id="input-3"
                            v-model="form.food"
                            :options="foods"
                            required="required"></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                            v-model="form.checked"
                            id="checkboxes-4"
                            :aria-describedby="ariaDescribedby">
                            <b-form-checkbox value="me">Check me out</b-form-checkbox>
                            <b-form-checkbox value="that">Check that out</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
                <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                </b-card>
            </div>
        </div>
    </template>

<style>

</style>
