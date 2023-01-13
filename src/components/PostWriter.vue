<script setup lang="ts">
import { Post, TimelinePost } from '../posts';
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { marked } from "marked"
import highlightjs from "highlight.js"
import debounce from "lodash/debounce"
import { usePosts } from "../stores/posts"
import { useUsers } from '../stores/users';

const props = defineProps<{
	post: TimelinePost | Post;
}>()

const emit = defineEmits<{
	(event: "submit", post: Post): void;
}>();

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref("")
const contentEditable = ref<HTMLDivElement>()
const posts = usePosts()
const router = useRouter()
const usersStore = useUsers();

/* watchEffect(() => {
	marked.parse(content.value, (err, parseResult) => {
		if (err) {
			throw err
		}
		html.value = parseResult
	})
}) */
////// SAME AS:
/* watch(content, (newContent) => {
	marked.parse(newContent, {
		gfm: true,
		breaks: true,
		highlight: (code) => {
			return highlightjs.highlightAuto(code).value
		}
	}, (err, parseResult) => {
		if (err) {
			throw err
		}
		html.value = parseResult
	})
}, { immediate: true }) */

function parseHtml (markdown: string) {
	marked.parse(markdown, {
		gfm: true,
		breaks: true,
		highlight: (code) => {
			return highlightjs.highlightAuto(code).value
		}
	}, (err, parseResult) => {
		if (err) {
			throw err
		}
		html.value = parseResult
	})
}

watch(content, debounce((newContent) => {
	parseHtml(newContent)
}, 250), { immediate: true })

onMounted(() => {
	if (!contentEditable.value) {
		throw Error("contentEditable DOM node is not defined")
	}
	contentEditable.value.innerText = content.value
})

function handleInput() {
	if (!contentEditable.value) {
		throw Error("contentEditable DOM node is not defined")
	}
	content.value = contentEditable.value?.innerText
}

async function handleClick() {
	if (!usersStore.currentUserId) {
		throw Error('User was not found')
	}

	const newPost: Post = {
		...props.post,
		created: typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
		title: title.value,
		authorId: usersStore.currentUserId,
		markdown: content.value,
		html: html.value
	};
	emit('submit', newPost)
}

</script>

<template>
	<div class="columns">
		<div class="column">
			<div class="field">
				<div class="label">Post Title</div>
				<input type="text" class="input" v-model="title">
			</div>
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<div contenteditable ref="contentEditable" @input="handleInput" />

		</div>
		<div class="column">
			<div v-html="html" />
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<button class="button is-primary is-pulled-right"
			@click="handleClick"
		>
			Save Post</button>
		</div>
	</div>
</template>