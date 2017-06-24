let tools = {

    // 增加或者更新   
    addorUpdate: function(goods) {
        // goods.id goods.num
  		let shopcart = this.getShopcart();

        shopcart[goods.id] = shopcart[goods.id] ? shopcart[goods.id] + goods.num : goods.num;

        window.localStorage.setItem("shopcart", JSON.stringify(shopcart));
    },

    getShopcart: function () {
    	return JSON.parse( window.localStorage.getItem('shopcart') || '{}');
    },

    getNum: function () {

    	// 获取到shopcart对象
    	let obj = this.getShopcart();
    	let num = 0;

    	for( let key in obj){
    		num += obj[key];
    	}

    	return num;
    },
    
    del: function (id) {
    	let obj = this.getShopcart();
    	delete obj[id];

    	window.localStorage.setItem("shopcart", JSON.stringify(obj));
    }
}

export default tools;
