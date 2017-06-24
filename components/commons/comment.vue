<template>
    <div class="tpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newMsg"></textarea>
                </li>
                <li>
                    <mt-button type="primary" @click="sendMsg" size="large">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}} : {{comment.content}} {{comment.add_time | formatDate}} 
                </li>
            </ul>
            <mt-button type="danger" @click="loadMore" size="large">加载更多..</mt-button>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default{
    data(){
        return {
            id: this.$props.cid,
            pageIndex: 1,
            comments:[],
            newMsg:'',
        }
    },
    props:['cid'],
    created(){
        this.loadInit();
    },
    methods:{
        loadInit(){
            
            this.pageIndex = 1;
            this.$ajax.get('getcomments/' + this.id + '?pageindex='+ this.pageIndex)
            .then((res)=>{
                //console.log(res.data.message);
                this.pageIndex++;
                this.comments = res.data.message;
            })
            .catch((err)=>{
                console.log('获取评论数据失败',err)
            })
        },
        loadMore(){
            this.$ajax.get('getcomments/' + this.id + '?pageindex='+ this.pageIndex)
            .then((res)=>{
                //console.log(res.data.message);
                this.pageIndex++;
                this.comments = this.comments.concat(res.data.message);
            })
            .catch((err)=>{
                console.log('获取评论数据失败',err)
            })
        },
        sendMsg(){

            Indicator.open({

                 text: '加载中...',
                 spinnerType: 'fading-circle'

            });

            // api/postcomment/:artid
            this.$ajax.post('postcomment/' + this.id,{
                content: this.newMsg
            },{
                transformRequest: function (data) {
                    var tmp = "";
                    for( var key in data){
                        tmp += key + "=" + data[key] + "&" ;
                    }
                    return tmp.substr(0,tmp.length-1);
                }
            })
            .then( res => {

                this.newMsg = "";
                Indicator.close();              
                this.loadInit();

            })
        },
        goback(){
           this.$router.go(-1); 
        }
    }

}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
