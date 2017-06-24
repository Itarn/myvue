<template>
	<div>
		<comment :cid="id"></comment>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				id: this.$route.query.id,
			}
		}
	}
</script>
<style type="text/css"></style>