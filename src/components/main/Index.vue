<template>
	<main class="main-content">
		<div class="wrapper">
			<slot></slot>
		</div>
	</main>
</template>

<style scoped lang="less">
	@width: 1200px;
	.main-content {
		width: @width;
		min-height: 100%;
		top: 0;
		left: 0;
		width: 1200px;
		margin: 0 auto;
		position: relative;
		padding: 120px 0;
		padding-bottom: 60px;
		box-sizing: border-box;
		// .wrapper {
		// 	min-height: 100%;
		// 	padding: 90px 0;
		// 	box-sizing: border-box;
		// }
	}
</style>

<script></script>

