<script lang="ts" setup>
import { ref } from 'vue';

const showDrop = ref(false);

function dropDownMenu() {
	showDrop.value = !showDrop.value;
}
</script>

<template>
	<div class="section">
		<div class="container">
			<div class="box">
				<h2>
					Je sais pas si cest vraiment utile mais bon...
				</h2>
				<p>
					Peut etre plutot dans un dropdown comme celui la:
				</p>
				<div class="dropdown is-active">
					<div class="dropdown-trigger">
						<button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
							<span>Dropdown button</span>
							<span class="icon is-small">
								<i class="fas fa-angle-down" aria-hidden="true"></i>
							</span>
						</button>
					</div>
					<div class="dropdown-menu" id="dropdown-menu" role="menu">
						<div class="dropdown-content">
							<a href="#" class="dropdown-item">
								Dropdown item
							</a>
							<a class="dropdown-item">
								Other dropdown item
							</a>
							<hr class="dropdown-divider">
							<a href="#" class="dropdown-item">
								With a divider
							</a>
						</div>
					</div>
				</div>
				<p>
				</p>
			</div>
		</div>
	</div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box">
		ou un truc du genre
		<h2>Une fois que j'aurai trouve le moyen de le faire fonctionner correctement ce batard</h2>
	</div>
</template>