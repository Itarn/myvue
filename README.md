# 基于Vue2.0+Axios实现虚拟移动商城
+ 利用业余时间经过一周的学习,虚拟商城第一版新鲜出炉
## 开发环境
+ Vue + webpack
## 前端架构
+ 页面结构(H5,CSS3,原生JS)
+ 数据请求处理框架(Axios)
+ Vue-Router进行路由处理
+ Vue-LazyLoad进行图片赖加载
+ Mui与Mint-ui搭建常用组件
+ vue-preview插件解决了点击图片预览的功能
## 数据接口
+ http://webhm.top:8899/api
+ api详情文档见code文件夹
## 目前项目已经实现的功能
1.首页数据的展示
2.新闻资讯
3.图文分享
4.商品展示
5.购物车
6.商品与文章的评论版块
## 安装
通过npm安装本地服务第三方依赖模块(需要已安装Node.js)
```
cd myvue
```
```
npm install 或 cnpm install(个人比较喜欢使用后者，下载依赖模块速度较快)
```
```
npm test
```
## 开发

vue非常好的融合了react的组件化思想和angular的指令思想。
一个vue的组件将HTML、CSS、JS代码写在一个文件里面，这样既方便编写，也方便管理和修改

### Axios

在vue1.x的时候，vue的官方推荐HTTP请求工具是vue-resource，但是在vue2.0的时候将推荐工具改成了axios。

使用方式都差不多，但需要注意的是：接口返回的res并不直接是返回的数据，而是经过axios本身处理过的json对象。真正的数据在res.data里：

```javascript
axios.get(url).then((res)=>{
  this.data = res.data
})
```

### Vuex

vue提供了一个数据管理工具vuex，有点类似于angular中factory和service，可以进行数据上的通信。
比如存储一些公共变量或者是不同组件间的数据处理等。

这个有一些高级用法在这里不细说，想要了解的可以去官方文档看，有中文版本。

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
```

### Vue-Router

vue-router是vue的路由系统，可以用来创建单页应用。基本思想是在主页面中引入<router-view>标签，然后定义路由，把router挂在到app上，然后把各个子页面渲染到view里面。使用起来还是很方便的，
跳转页面只需要

```javascript
router.push('test')
```

### 获取元素节点

vue2.0废除了v-el指令，所有的节点指令修改为ref，然后通过ref来获取元素节点，如

```html
<div ref="testHook">test</div>
...js code
this.$ref.testHook
```

### 组件间的通信

一。如果是和子组件通信，则使用ref就可以实现，如：

```html
<test ref="testHook"></test>
...js code
this.$ref.testHook.add() //调用test子组件的add方法
```

二。使用emit来发送广播

vue2提供了一套广播机制，即一边发送广播，一边接收广播来执行相应操作。使用方法如下：

比如想要给test组件发送一个“相加”广播:

```javascript
export default {
  method:{
  	click(){
  	  Vue.$emit('add',{}) //第二个参数可作为传递数据传送到监听端口，不需要则传空对象
  	}
  }
}
```

那么test组件中就需要监听，在created方法里写

```javascript
export default {
  created(){
   Vue.$on('add',this.add)
  },
  method:{
  	add(){
  	  this.count++
  	}
  }
}
```


除了以上总结的这点小的知识点以外，还有很多vue的知识想要和大家分享，以后会陆续写出来，大家感兴趣的也可以来我的GitHub一起来写这个项目（觉得不错的给个star Hah）

## 目录结构

```
├── README.md           
├── 项目和api接口说明文档   
├── webpack.config.js  		// webpack配置文件
├── package.json       		// 项目配置文件
├── app.vue              	// 项目中全局Vue
├── main.js        	    	// Webpack 预编译入口
├── index.html         		// 项目入口文件
├── components          	// 各种Vue组件
├── static              	// 静态资源文件夹
├── node_modules          	// node资源包(相当于npm install)
```
## 项目效果图
![首页](http://chuantu.biz/t5/116/1498357876x2890171534.jpg)
![首页](http://chuantu.biz/t5/116/1498357966x1928668097.jpg)
---
---
![](http://chuantu.biz/t5/116/1498358382x1928668097.jpg)
![首页](http://chuantu.biz/t5/116/1498358003x1928668097.jpg)
---
---
![首页](http://chuantu.biz/t5/116/1498358047x1928668097.jpg)
![](http://chuantu.biz/t5/116/1498358275x1033225665.jpg)
---
---
![首页](http://chuantu.biz/t5/116/1498358163x3733009760.bmp)
![首页](http://chuantu.biz/t5/116/1498358182x3733009760.bmp)
