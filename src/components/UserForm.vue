<script lang="ts" setup>
import { computed, ref } from 'vue';
import { validate, checkEmail, required, checkUsername, checkPassword, checkPasswordMatch } from '../validation';
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

const email = ref('')
const emailStatus = computed(() => {
	return validate(email.value, [required, checkEmail]);
});

const username = ref('')
const usernameStatus = computed(() => {
	return validate(username.value, [required, checkUsername]);
});

const password = ref('')
const passwordStatus = computed(() => {
	return validate(password.value, [required, checkPassword]);
});

/* const MatchPassword = ref('')
const MatchPasswordStatus = computed(() => {
	return validate(MatchPassword.value, [required, checkPasswordMatch(MatchPassword.value ,password.value)]);
}); */
// Ne fonctionne pas, type error...

const isInvalid = computed(() => {
	return !usernameStatus.value.valid || !passwordStatus.value.valid || !emailStatus.value.valid /* || !MatchPasswordStatus.value.valid */;
});

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit() {
	if (isInvalid.value) {
		return
	}
	const newUser: NewUser = {
		email: email.value,
		username: username.value,
		password: password.value
	}
	try {
		emit('submit', newUser)
	} catch (e) { }

}

function handleCancel(): void {
	email.value = ''
	username.value = ''
	password.value = ''
	modal.hideModal()
}

</script>

<template>
	<form class="form" @submit.prevent="handleSubmit">		
		<FormInput name="E-mail" v-model="email" :status="emailStatus" type="email" />
		<FormInput v-if="modal.whichModal()" name="Username" v-model="username" :status="usernameStatus" type="text" />
		<FormInput name="Password" v-model="password" :status="passwordStatus" type="password" />
		<!-- <FormInput v-if="modal.whichModal()" name="Confirm Password" v-model="MatchPassword" :status="MatchPasswordStatus" type="password" /> -->
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
				<button class="button is-danger" @click="handleCancel">Cancel</button>
			</div>
		</div>
	</form>
</template>

<style scoped>
.form {
	background: white;
	padding: 30px;
	margin-top: 60px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

div {
	white-space: pre-line;
}
</style>
