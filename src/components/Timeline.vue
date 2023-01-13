<script setup lang="ts">
import { usePosts } from '../stores/posts'
import TimelineItem from './TimelineItem.vue'
import { Period, periods } from '../constants'

const postsStore = usePosts()

await postsStore.fetchPosts()
</script>

<template>
	<nav class="is-primary panel">
		<span class="panel-tabs">
			<a 
				v-for="period in periods" 
				:key="period" 
				:class="{ 'is-active': period === postsStore.selectedPeriod }"
				@click="postsStore.setSelectedPeriod(period)"
			> 
				{{ period }} 
			</a>
		</span>
		<TimelineItem
			v-for="post in postsStore.filteresPosts"
			:key="post.id"
			:post="post"
		/>
	</nav>
</template>

<style scoped>
	.is-primary{
		background-color: #ffffff !important;
	}

</style>