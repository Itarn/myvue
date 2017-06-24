<template>
	<div class="tpl">
		<pic-swipe :pics="imgs"></pic-swipe>
		<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<router-link :to="{name:'news.list'}">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div>
		                </router-link>
		            </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to="{name:'photo.share'}">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图文分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to = "{name:'goods.list'}">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品展示</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">搜索资讯</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
		data(){
			return {
				imgs:[],
			}
		},
		created(){
			methods:{
				// 模拟数据
				this.imgs = [{
					url: "#",
					img: "../static/img/1.jpg"
				},{
					url: "#",
					img: "../static/img/2.jpg"
				},{
					url: "#",
					img: "../static/img/3.jpg"
				}];

				// 自己练习代码
				// this.$ajax.get('getlunbo')
				// .then((res) => {
				// 	//console.log(res);
					
				// 	this.imgs = res.data.message;
				// 	//console.log(this.pics);
				// })
				// .catch((err) => {
				// 	console.log(err);
				// })
			}
		}	
	}
</script>
<style type="text/css" scoped>
	
	
	/*九宫格*/

	.mui-content .mui-table-view{
		margin: 0;
	}
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0;
		
	}

	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before
	{
		content:'';
	}

	.mui-icon{
		height: 50px;
		width: 50px;
	}

	.mui-icon.mui-icon-home{
		background-image: url('../static/img/news.png');
		background-repeat: round;
	}

	.mui-icon-email {
	    background-image: url('../static/img/picShare.png');
	    /*设置环绕显示，显示出全部背景图片*/
	    background-repeat: round;
	}

	.mui-icon-chatbubble {
	    background-image: url('../static/img/goodShow.png');
	    /*设置环绕显示，显示出全部背景图片*/
	    background-repeat: round;
	}

	.mui-icon-location {
	    background-image: url('../static/img/feedback.png');
	    /*设置环绕显示，显示出全部背景图片*/
	    background-repeat: round;
	}

	.mui-icon-search {
	    background-image: url('../static/img/search.png');
	    /*设置环绕显示，显示出全部背景图片*/
	    background-repeat: round;
	}

	.mui-icon-phone {
	    background-image: url('../static/img/callme.png');
	    /*设置环绕显示，显示出全部背景图片*/
	    background-repeat: round;
	}

	

	</style>