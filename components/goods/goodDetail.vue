<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <pic-swipe :pics="imgs"></pic-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goods.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goods.market_price}}</s> 销售价：<span>￥{{goods.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="subStract">-</span><span>{{pickNum}}</span><span @click="addNum">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click= "addShopCar" ref="addShopcar">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goods.goods_no}}</li>
                <li>库存情况：{{goods.stock_quantity}}件</li>
                <li>上架时间：{{goods.add_time|formatDate}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="showGoodsInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="showGoodsComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import vueBus from "../commons/myBus.js";
export default{
    data(){
        return {
            isShow: false,
            id: this.$route.query.id,
            goods: {},
            imgs: [],
            pickNum: 1,
        }
    },
    created(){
        this.getGoodsDetail();
        this.getSwipeImage();
    },
    methods:{
        // 获取详情
        getGoodsDetail(){
            this.$ajax.get('goods/getinfo/' + this.id)
            .then(res=>{
                //console.log(res.data.message);
                this.goods = res.data.message[0];
            })
            .catch(err=>{
                console.log('获取商品详情失败',err);
            })
        },
        getSwipeImage(){
            // getthumimages/:imgid
            this.$ajax.get('getthumimages/' + this.id)
            .then(res=>{
                //console.log(res.data.message);
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log('获取商品详情失败',err);
            })
        },
        showGoodsInfo(){
            this.$router.push({
                name: 'news.detail',
                query: {
                    id: this.id
                }
            })
        },
        showGoodsComment(){
            this.$router.push({
                name: 'goods.comment',
                query: {
                    id: this.id
                }
            })
        },
        // 购物车相关的函数
        addNum(){
            if(this.pickNum >= this.goods.stock_quantity) return;
            this.pickNum ++ ;
        },
        subStract(){
            if(this.pickNum <= 1) return;
            this.pickNum -- ;
        },
        addShopCar(){

            this.isShow = true;

            // 禁用按钮
            this.$refs.addShopcar.$el.disabled = true;

            // 每次点击都要把东西放进到localstorage
            // 而在存储中,数据格式是一个对象,每条属性的key是商品的id,值为数量

            // 而数据都必须有增删改查的功能,所以封装成一个函数

            // 看底部的兄弟组件

        },
        // 购物车小球

        afterEnter(){

            this.isShow = false;
            // 通知兄弟组件添加购物车数量
            vueBus.$emit("addShopcar",this.pickNum,this.goods.id);
            
            this.$refs.addShopcar.$el.disabled = false;

        }
    }
}
</script>
<style scoped>
.ball-enter-active {
    animation: bounce-in 1s;
}
.ball-enter {
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
