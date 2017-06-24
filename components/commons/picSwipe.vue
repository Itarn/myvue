<template>
	<div>
		<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="(item,index) in pics" :key="index">
			  	<a :href="item.url">
			  		<img :src="item.img">
			  	</a>
			  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				
			}
		},
		props:['pics'],
		created(){
			//console.log(this.pics);
			//console.log(this.a);
		}

	}
</script>
<style type="text/css">

	.mint-swipe{
		height: 200px;
	}
	.mint-swipe-item{
		text-align: center;
	}
	.mint-swipe-item img{
		height: 100%;
	}

</style>