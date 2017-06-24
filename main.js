"use strict";
// 引入vue
import Vue from 'vue';

//引入 http axios
import Axios from 'axios';
Vue.prototype.$ajax = Axios;
//配置默认的请求url
Axios.defaults.baseURL = 'http://webhm.top:8899/api/';

//引入组件 mint-ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
// 安装
Vue.use(MintUi);

//引入mui-master
import './static/mui-master/dist/css/mui.css';

//引入全局的css
import './static/global.css';

// 引入全局的组件
import Comment from './components/commons/comment.vue';
import PicSwipe from './components/commons/picSwipe.vue';

// 引入组件
import App from './app.vue';
import Home from './components/home.vue';
import Member from './components/member.vue';
import Shopcar from './components/shopcar.vue';
import Search from './components/search.vue';
import NewsList from './components/news/NewsList.vue';
import NewsDetail from './components/news/NewsDetail.vue';
import PhotoShare from './components/photoshare/photoshare.vue';
import PhotoDetail from './components/photoshare/photodetail.vue';
import GoodsList from './components/goods/goodslist.vue';
import GoodsDetail from './components/goods/goodDetail.vue';
import GoodsComment from './components/goods/goodscomment.vue';


//引入vue-router
import VueRouter from 'vue-router';

// 引入事件格式处理插件
import Moment from 'moment';

// 引入导航栏组件
import NavBar from './components/commons/navbar.vue';

// 引入图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 声明全局组件
//Vue.component('组件名称',组件对象) 组件名称用驼峰命令法
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);
Vue.component('picSwipe',PicSwipe);



//安装
Vue.use(VueRouter);
// 配置路由规则VueRouter
let router = new VueRouter({
		linkActiveClass: 'mui-active'  //设置当锚点值匹配的时候当前a标签所用的样式
	});


router.addRoutes([
    { name: 'home', path: '/home', component: Home },
    { path: '/', redirect: { name: 'home' } },// 重定向到Home

    // 底部
    { name: 'member', path: '/member', component: Member },
    { name: 'shopcar', path: '/shopcar', component: Shopcar },
    { name: 'search', path: '/search', component: Search },

    //home部分
    { name: 'news.list', path: '/news/list', component: NewsList },
    { name: 'photo.share', path: '/photo/share', component: PhotoShare },
    { name: 'goods.list', path: '/goods/list', component: GoodsList },

    //新闻列表部分
    { name: 'news.detail', path: '/news/detail', component: NewsDetail },

    // 图片详情部分
    { name: 'photo.detail', path: '/photo/detail/:id', component: PhotoDetail },

    // 商品详情部分
    { name: 'goods.detail', path: '/goods/detail',component: GoodsDetail },
    { name: 'goods.comment', path: '/goods/comment',component: GoodsComment },

])

//声明全局过滤器
Vue.filter('formatDate',function (value) {
	return Moment(value).format('YYYY-MM-DD');
})

// 构建vue实例

new Vue({
    el: '#app',
    router,
    render: c => c(App)
})
