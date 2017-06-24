<template>
    <div class="tpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for=" (goods,index) in goodsList " :key="goods.id">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p>{{ goods.title }}</p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="subStract(goods)">-</span>
                            <span>{{goods.sigleGoodsNum}}</span>
                            <span @click="addNums(goods)">+</span>
                            <a href="javascript:;" @click="delGoods(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{ payment.cout }}件，总价￥{{ payment.sum }}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import tools from './goods/goodsTools.js';
import vueBus from './commons/myBus.js';

export default {
	data(){
		return {
			goodsList:[],
			goodsNum: tools.getNum(), // 购物车商品的总数
			priceTotal: 0, // 购物车总价格
		}
	},
	created(){
		this.getGoodsData();
	},
	methods:{
		getGoodsData(){

			let goods = tools.getShopcart();
			let str = '';
			for( let key in goods){
				str += key + ',';
			}
			str = str.substr(0,str.length-1);
			let url = 'goods/getshopcarlist/' + str;

			// 发送请求

			this.$ajax.get(url)
			.then( (res) => {

				//console.log(res.data.message);

				// sigleGoodsNum: 0, // 单个商品选择的数量
				// isPicked: true, // 商品项是否选择

				// 把上面两项内容加到请求到的数组对象里

				let dataArr = res.data.message;

				//console.log(dataArr);

				 dataArr.forEach( (el) => {

				 	el.sigleGoodsNum = goods[el.id];
				 	el.isPicked = true;

				 })

				this.goodsList = res.data.message;

			})
			.catch((err) => {
				console.log('购物车获取数据失败',err);
			})

		},

		subStract(goods){
			if (goods.sigleGoodsNum <= 1) return;
			goods.sigleGoodsNum -- ;
			vueBus.$emit("addShopcar",-1,goods.id);
		
		},

		addNums(goods){
			
			goods.sigleGoodsNum ++ ;
			vueBus.$emit("addShopcar",+1,goods.id);
			
		},
		delGoods(index){
			
			// 通知底部改变
			vueBus.$emit("addShopcar", -this.goodsList[index].sigleGoodsNum, this.goodsList[index].id);
			// localstorage里面的数据更改
			tools.del(this.goodsList[index].id);
			// goodslist去掉其中一项
			this.goodsList.splice(index,1);


		}
	},
	computed: {
		payment() {
				let cout = 0 ;
				let sum = 0;
				this.goodsList.forEach((ele)=>{
					if( ele.isPicked === true ){
						cout += ele.sigleGoodsNum;
						sum += ele.sigleGoodsNum * ele.sell_price;
					}
				})
				return {
					cout,
					sum
				}
		}
	}

}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
