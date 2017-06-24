<template>
	<div class="tpl">
		<nav-bar title="图片分享"></nav-bar>
		<div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getPicByCategoryId(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for = "pic in pics" :key="pic.id">
                    <router-link :to="{name:'photo.detail',params:{id:pic.id}}">
                        <img v-lazy = "pic.img_url">
                        <p>
                            <span>{{pic.title}}</span>
                            <br>
                            <span>{{pic.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return{
				categorys:[],
				pics:{}	
			}
		},
		created(){
			this.$ajax.all([this.$ajax.get('getimgcategory'),this.getPicByCategoryId(0)])
			.then(this.$ajax.spread(res=>{
				this.categorys = res.data.message;
				this.categorys.unshift({
					id:0,
					title: '全部'
				})
				//console.log(res);
			}))
			.catch(err=>console.log('图片请求失败',err))
		},methods:{
			getPicByCategoryId(id){
				return this.$ajax.get('getimages/'+id).then((res)=>{
					this.pics = res.data.message;
					//console.log(this.pics);
				})
			}
		}
	}
</script>
<style type="text/css">
	.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}

</style>