<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';

const modal = useModal();
const usersStore = useUsers();
const router = useRouter();

async function logout () {
	await usersStore.logout();
	router.push('/');
}
</script>

<template>
<!-- 	<div class="navbar">
		<div class="navbar-end">
			<div v-if="usersStore.currentUserId" class="buttons">
				<RouterLink to="/posts/new" class="button">New Post</RouterLink>
				<button class="button" @click="logout()">Log Out</button>
			</div>
			<div v-else class="buttons">
				<button class="button" @click="modal.showModal('signUp')">Sign Up</button>
				<button class="button" @click="modal.showModal('signIn')">Sign In</button>
			</div>
		</div>
	</div>
 -->
	<section class="hero is-small is-primary">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-four-fifths">
          <p class="title">
            Transcendouille
          </p>
          <p class="subtitle">
            Ceci est un test
          </p>
        </div>
        <div class="column">
			<div v-if="usersStore.currentUserId" class="buttons">
				<RouterLink to="/posts/new" class="button">New Post</RouterLink>
				<button class="button is-danger is-inverted" @click="logout()">Log Out</button>
			</div>
			<div v-else class="buttons">
				<button class="button is-primary is-inverted" @click="modal.showModal('signUp')">Sign Up</button>
				<button class="button" @click="modal.showModal('signIn')">Sign In</button>
			</div>
        </div>
      </div>
    </div>
  </section>
  <nav class="level">
    <p class="level-item has-text-centered">
      <a class="button is-primary is-outlined is-active">Home</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="button is-primary is-outlined is-active">Your Profile</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="button is-danger is-large is-rounded is-active is-focused">PLAY</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="button is-primary is-outlined is-active">Chat</a>
    </p>
    <p class="level-item has-text-centered">
      <a class="button is-primary is-outlined is-active">Friend</a>
    </p>
  </nav>

	<teleport to="#modal">
		<component :is="modal.component.value" />
	</teleport>

</template>