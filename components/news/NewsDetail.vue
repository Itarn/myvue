<template>
    <div class="tpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p>{{newsInfo.title}}</p>
            <div>
                <span>{{newsInfo.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsInfo.add_time | formatDate}}</span>
            </div>
        </div>
        <!-- 这里只是在设置给模板放什么内容，不是立刻就放上去了 -->
        <div class="news-content" v-html = "newsInfo.content">
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            title: "",
            newsInfo:{}
        }
    },
    created(){

        // 获取每条新闻的id
        let id = this.$route.query.id;;
        //console.log(id)
        this.$ajax.get('getnew/' + id)
        .then((res)=>{
            //console.log(res);
            this.newsInfo = res.data.message[0];
        })
    },
    // 勾子函数执行前,组件实例还没被创建
    beforeRouteEnter(to,from,next){
        let title = "";
        if (from.name == 'new.list') {
            title = "新闻详情";
        } else if (from.name == 'goods.detail') {
            title = "商品详情";
        }
        next(next(vm =>{
            vm.title = title;
        }))
    }
}

</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-title,.news-content{
    padding: 20px;
}

</style>
