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
