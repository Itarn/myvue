<template>
    <div class="tpl">
    	<nav-bar title="新闻列表"></nav-bar>
        <!-- mui中的图文列表 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newslist" :key="news.id">
                <router-link :to="{ name:'news.detail',query:{id:news.id} }">
                    <img class="mui-media-object mui-pull-left" :src='news.img_url'>
                    <div class="mui-media-body">
                        <span v-text='news.title'></span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time | formatDate}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
            return {
                newslist:[]
            }
        },
        //组件被创建的时候
        created() {
           this.$ajax.get('getnewslist')
           .then((res)=>{
           		//console.log(res);
           		this.newslist = res.data.message;
           })
           .catch((err)=>{
           		console.log('新闻列表获取失败',err);
           })
        }
}
</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;


}

.news-desc p:nth-child(2) {
    float: right;
}



</style>
