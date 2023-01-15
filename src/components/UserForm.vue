<script lang="ts" setup>
import { computed, ref } from 'vue';
import { validate, length, required } from '../validation';
import { NewUser } from '../users'
import { useUsers } from '../stores/users'
import { useModal } from '../composables/modal'
import FormInput from '../components/FormInput.vue';

defineProps<{
	error?: string
}>()

const emit = defineEmits<{
	(event: 'submit', payload: NewUser): void
}>()

const username = ref('')
const usernameStatus = computed(() => {
	return validate(username.value, [required, length({ min: 5, max: 40 })]);
});

const password = ref('')
const passwordStatus = computed(() => {
	return validate(password.value, [required, length({ min: 10, max: 40 })]);
});

const isInvalid = computed(() => {
	return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit() {
	if (isInvalid.value) {
		return
	}
	const newUser: NewUser = {
		username: username.value,
		password: password.value
	}
	try {
		emit('submit', newUser)
	} catch (e) { }

}
</script>

<template>
	<form class="form" @submit.prevent="handleSubmit">
		<FormInput name="E-mail" v-model="username" :status="usernameStatus" type="email" />
		<FormInput name="Password" v-model="password" :status="passwordStatus" type="password" />
		<div class="is-danger help">
			{{ error }}
		</div>
		<div class="columns">
			<div class="column">
				<button class="button" :disabled="isInvalid" >Submit</button>
			</div>
			<div class="column">
				<button class="button is-primary" @click="modal.hideModal">Sign In with 42api</button>
			</div>
			<div class="column">
				<button class="button is-danger" @click="modal.hideModal">Cancel</button>
			</div>
		</div>
	</form>
</template>

<style scoped>
.form {
	background: white;
	padding: 30px;
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
