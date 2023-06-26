<script setup>
import { getCurrentInstance, onMounted, ref, reactive, shallowRef } from "vue";

const { proxy } = getCurrentInstance()

const tableVariants = ref([
	'primary',
	'secondary',
	'info',
	'danger',
	'warning',
	'success',
	'light',
	'dark'
])

const options = reactive({
	striped: false,
	bordered: false,
	borderless: false,
	outlined: false,
	small: false,
	hover: false,
	dark: false,
	fixed: false,
	footClone: false,
	headVariant: null,
	tableVariant: '',
	noCollapse: false
})

function _formatter(value, key, item) {
	return `knocking0${value}`
}

const fields = [
	{
		key: 'selected',
		label: '',
		sortable: false
	},
	{
		key: 'id',
		label: 'ID',
		sortable: true		
	},{
		key: 'userId',
		label: 'USER ID',
		sortable: true,
		formatter: _formatter
	},{
		key: 'title',
		label: 'TITLE',
		sortable: true
	},{
		key: 'completed',
		label: 'COMPLETED',
		sortable: true
	},{
		key: 'show_details',
		label: 'DETAIL',
		sortable: false		
	}
]

const items = ref([])
const isBusy = ref(false)

/** Selected start */
const modes = ref(['multi', 'single', 'range'])
const selectMode = ref('multi')
const selected = ref([])
const selectableTable = ref(null)

const onRowSelected = (items) => {
	console.log(items)
	selected.value = items
}

const selectAllRows = () => {
	selectableTable.value.selectAllRows()
}

const clearSelected = () => {
	selectableTable.value.clearSelected()
}

const selectThirdRow = () => {
	// Rows are indexed from 0, so the third row is index 2
	selectableTable.value.selectRow(2)
}

const unselectThirdRow = () => {
	// Rows are indexed from 0, so the third row is index 2
	selectableTable.value.unselectRow(2)
}
/** Selected  end */

/** Sort */
const sortBy = ref('title')
const sortDesc = ref(false)


/** modal */
const infoModal = reactive({
	id: 'info-modal',
	title: '',
	content: ''
})

const info = (item, index, button) => {
	infoModal.title = `Row index: ${index}`
	infoModal.content = JSON.stringify(item, null, 2)
	$root.$emit('bv::show::modal', infoModal.id, button)
}

const resetInfoModal = () => {
	infoModal.title = ''
	infoModal.content = ''
}


//  Axios get Data
const getDatas = ()=> {
	isBusy.value = true
	proxy.$axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
		items.value = res.data.slice(0,10)
		isBusy.value = false
	})
	
}

onMounted(() => {
	getDatas()
})
</script>

<template>
	<div>
		<h4>Bootstrap Table Test</h4>				
		<div>
			<b-form-group label="Table Options" label-cols-lg="2" v-slot="{ ariaDescribedby }">
				<b-form-checkbox v-model="options.striped" :aria-describedby="ariaDescribedby" inline>Striped</b-form-checkbox>
				<b-form-checkbox v-model="options.bordered" :aria-describedby="ariaDescribedby" inline>Bordered</b-form-checkbox>
				<b-form-checkbox v-model="options.borderless" :aria-describedby="ariaDescribedby" inline>Borderless</b-form-checkbox>
				<b-form-checkbox v-model="options.outlined" :aria-describedby="ariaDescribedby" inline>Outlined</b-form-checkbox>
				<b-form-checkbox v-model="options.small" :aria-describedby="ariaDescribedby" inline>Small</b-form-checkbox>
				<b-form-checkbox v-model="options.hover" :aria-describedby="ariaDescribedby" inline>Hover</b-form-checkbox>
				<b-form-checkbox v-model="options.dark" :aria-describedby="ariaDescribedby" inline>Dark</b-form-checkbox>
				<b-form-checkbox v-model="options.fixed" :aria-describedby="ariaDescribedby" inline>Fixed</b-form-checkbox>
				<b-form-checkbox v-model="options.footClone" :aria-describedby="ariaDescribedby" inline>Foot Clone</b-form-checkbox>
				<b-form-checkbox v-model="options.noCollapse" :aria-describedby="ariaDescribedby" inline>No border collapse</b-form-checkbox>
			</b-form-group>

			<b-form-group label="Head Variant" label-cols-lg="2" v-slot="{ ariaDescribedby }">
				<b-form-radio-group
					v-model="options.headVariant"
					:aria-describedby="ariaDescribedby"
					class="mt-lg-2"
				>
					<b-form-radio :value="null" inline>None</b-form-radio>
					<b-form-radio value="light" inline>Light</b-form-radio>
					<b-form-radio value="dark" inline>Dark</b-form-radio>
				</b-form-radio-group>
			</b-form-group>

			<b-form-group label="Table Variant" label-for="table-style-variant" label-cols-lg="2">
				<b-form-select
					id="table-style-variant"
					v-model="options.tableVariant"
					:options="tableVariants"
				>
					<template #first>
						<option value="">-- None --</option>
					</template>
				</b-form-select>
			</b-form-group>
			<b-form-group
				label="Selection mode:"
				label-for="table-select-mode-select"
				label-cols-lg="2"
			>
				<b-form-select
					id="table-select-mode-select"
					v-model="selectMode"
					:options="modes"
					class="mb-3"
				></b-form-select>
			</b-form-group>
			<br>
			<div>				 
				<b-table
					:striped="options.striped"
					:bordered="options.bordered"
					:borderless="options.borderless"
					:outlined="options.outlined"
					:small="options.small"
					:hover="options.hover"
					:dark="options.dark"
					:fixed="options.fixed"
					:foot-clone="options.footClone"
					:no-border-collapse="options.noCollapse"
					:head-variant="options.headVariant"
					:table-variant="options.tableVariant"
					:busy="isBusy"
					:items="items"
					:fields="fields"

					:select-mode="selectMode"
					ref="selectableTable"
      		selectable
      		@row-selected="onRowSelected"

					:sort-by.sync="sortBy"
      		:sort-desc.sync="sortDesc"
				>
					<!-- table busy !-->
					<template #table-busy>
						<div class="text-center text-danger my-2">
							<b-spinner class="align-middle"></b-spinner>
							<strong>Loading...</strong>
						</div>
					</template>

					<!-- captions !-->
					<template #table-caption>This is a table caption.</template>

					<!-- Row Detail !-->
					<template #cell(show_details)="row">
						<b-button size="sm" @click="info(row.item, row.index, $event.target)" class="m-md-1">
          		Info modal
        		</b-button>
						<b-button size="sm" @click="row.toggleDetails" class="mr-2">
							{{ row.detailsShowing ? 'Hide' : 'Show'}} Details
						</b-button>
					</template>

					<!-- Info modal -->
					<b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
						<pre>{{ infoModal.content }}</pre>
					</b-modal>

					<template #row-details="row">
						<b-card>
							<b-row class="mb-2">
								<b-col sm="3" class="text-sm-right"><b>Title:</b></b-col>
								<b-col>{{ row.item.title }}</b-col>
							</b-row>

							<b-row class="mb-2">
								<b-col sm="3" class="text-sm-right"><b>Completed:</b></b-col>
								<b-col>{{ row.item.completed }}</b-col>
							</b-row>

							<b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
						</b-card>
					</template>


					<!-- Example scoped slot for select state illustrative purposes -->
					<template #cell(selected)="{ rowSelected }">
						<template v-if="rowSelected">
							<span aria-hidden="true">&check;</span>
							<span class="sr-only">Selected</span>
						</template>
						<template v-else>
							<span aria-hidden="true">&nbsp;</span>
							<span class="sr-only">Not selected</span>
						</template>
					</template>

				</b-table>

				 <p>
					<b-button size="sm" @click="selectAllRows" class="m-md-1">Select all</b-button>
					<b-button size="sm" @click="clearSelected" class="m-md-1">Clear selected</b-button>
					<b-button size="sm" @click="selectThirdRow" class="m-md-1">Select 3rd row</b-button>
					<b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button>
				</p>
				<p>
					Selected Rows:<br>
					{{ selected }}
				</p>


			</div>
		</div>
	</div>
</template>

<style>

</style>