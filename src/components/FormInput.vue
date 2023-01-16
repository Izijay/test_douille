<script setup lang="ts">
import { Status } from "../validation";

defineProps<{
	name: string;
	modelValue: string;
	status: Status;
	type: string;
}>();

const emit = defineEmits<{
	(event: "update:modelValue", value: string): void;
}>();

function handleInput(event: Event) {
	emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
	<div class="field">
		<label for="name" class="label">{{ name }}</label>
		<div class="control">
			<input 
				v-if="name === 'E-mail'" 
				:type="type" 
				:id="name" 
				:value="modelValue" 
				class="input" 
				placeholder="Your e-mail" 
				@input="handleInput"
			>
			<input 
				v-else-if="name === 'Password'" 
				:type="type" 
				:id="name" 
				:value="modelValue" 
				class="input" 
				placeholder="Your password" 
				@input="handleInput"
			>
			<input 
				v-else-if="name === 'Username'" 
				:type="type" 
				:id="name" 
				:value="modelValue" 
				class="input" 
				placeholder="Your username" 
				@input="handleInput"
			>
		</div>
		<p class="is-danger help" v-if="!status.valid">
			{{ status.message }}
		</p>
	</div>
</template>
