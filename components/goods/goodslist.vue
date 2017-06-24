<template>
    <div class="tpl" style="height:100%">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :auto-fill="false" ref="loadmore" :bottom-all-loaded="allLoaded">
		 
	        <ul class="mui-table-view mui-grid-view">
	            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="goods in goodslist" :key="goods.id">		
	                <router-link :to="{name:'goods.detail',query:{id:goods.id}}">
	                    <img class="mui-media-object" :src="goods.img_url
	">
	                    <div class="mui-media-body">{{goods.title}}</div>
	                    <div class="desc">
	                        <div class="sell">
	                            <span>￥{{goods.sell_price}}</span>
	                            <s>￥{{goods.market_price}}</s>
	                        </div>
	                        <div class="detail">
	                            <div class="hot">
	                                热卖中
	                            </div>
	                            <div class="count">
	                                剩{{goods.stock_quantity}}件
	                            </div>
	                        </div>
	                    </div>
	                </router-link>
	            </li>
	        </ul>

        </mt-loadmore>
        <mt-spinner type="triple-bounce" v-show="isLoading==='loading'"></mt-spinner>
    </div>
</template>
<script>

export default {
	data(){
		return {
			pageIndex:1,
			goodslist:[],
			allLoaded: false,
			isLoading:''
		}
	},
	created(){
		// getgoods?pageindex=number
		this.$ajax.get('getgoods?pageindex=' + this.pageIndex )
		.then((res)=>{
			this.pageIndex++;
			this.goodslist = res.data.message;
			//console.log(this.goodslist);

		})
		.catch((err)=>{
			console.log('获取商品列表异常',err);
		})
	},
	methods:{
		handleBottomChange(status){
			//console.log(status);
			this.loading = status;
		},
		loadBottom() {
			  
			this.$ajax.get('getgoods?pageindex=' + this.pageIndex )
			.then((res)=>{
				this.pageIndex++;
				this.goodslist = this.goodslist.concat(res.data.message);
				//console.log(this.goodslist);

				// 判断是否还需要再调用bottom-method方法
				// 思路:当最后加载的页面的item个数不超过后台规定的单页数据总数,那么就要停同bottom-method方法
				if (res.data.message.length != 10) {
					this.allLoaded = true;
				}

				//通知下拉加载完毕，进入下一个状态
	            this.$refs.loadmore.onBottomLoaded();

			})
		.catch((err)=>{
			console.log('获取商品列表异常',err);
		})
			  
		}
	}
}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
