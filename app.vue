<template>
	<div>
		<mt-header title="wm信息管理系统"></mt-header>
		<router-view></router-view>
		<!-- 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" :to="{ name:'home'}">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{ name:'member'}">
				<span class="mui-icon mui-icon-members"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{ name:'shopcar'}">
				<span class="mui-icon mui-icon-shopcar"><span class="mui-badge">{{ pickNum }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" :to="{ name:'search'}">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
		</nav>
	</div>
</template>
<script type="text/javascript">
	import { Header } from 'mint-ui';
	import vueBus from './components/commons/myBus.js';
	import tools from './components/goods/goodsTools.js'
	export default {
		data(){
			return {
				pickNum: tools.getNum(),
			}
		},
		created(){
			vueBus.$on("addShopcar",(num,id)=>{

				this.pickNum += num;

				// 存储到本地
				tools.addorUpdate({
					id:id,
					num:num
				});
			})

			

		}
	}
	
</script>
<style type="text/css" scoped>

	
</style>