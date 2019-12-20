<template>
    <div id="container">
        <div class="good" style="display: flex;flex-direction: row;">
            <div class="shop-left" style="display: flex;flex-direction: column;align-items: center;height: 100%;">
                <div class="type-item" v-for="(item, index) in goodArr" :key="index"
                    :style="{'background-color': (item.selected ? '#fff':'#eee')}" @click='itemSelect(index)'>
                    <div class="type-item-text">{{item.dishType}}</div>
                </div>
            </div>
            <div class="good-right" ref="menuWrap"
                style="height: 100%;margin-left: 1rem;width: 12rem;margin-bottom: 5rem;">
                <div>
                    <div class="good-list" v-for="(product, parentIndex) in goodArr" :key="parentIndex"
                        style="margin-bottom: 1rem;">
                        <div class="right-title-view" :id='order(parentIndex)' style="width: 100%;">
                            <div class="right-title">{{product.dishType}}</div>
                        </div>
                        <div class="good-item" style="width: 12rem;" v-for="(good, index) in product.dish" :key="index">
                            <img v-bind:src="good.dishImage" class="good-img" alt="商品图片">
                            <div class="good-info">
                                <div class="good-name">{{good.dishName}}</div>
                                <div class="info-bottom">
                                    <div class="good-price">￥{{good.price}}</div>
                                    <div class="good-number-control">
                                        <div @click='subtractTo(index,parentIndex)'
                                            style="width: 1.08rem;height: 1.08rem;">
                                            <img src="../assets/subtract_icon.png" class="subtract-icon"
                                                v-if='good.number>0'>
                                        </div>
                                        <div class="good-number" v-if='good.number>0'>{{good.number}}</div>
                                        <div @click='addTo(index,parentIndex)' style="width: 1.08rem;height: 1.08rem;">
                                            <img src="../assets/add_icon.png" class="subtract-icon"
                                                style="margin-right:0rem">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--shopCart-->
        <div class="shopCart" style="width: 100%;height: 3rem;">
            <div class="content"
                style="width: 100%;height: 3rem;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                <div class="content-left">
                    <!-- <div class="logo-wrapper"> -->
                    <div class="logo-cart" @click='toCart'>
                        <!-- <div class="logo highlight" bindtap='toCart'> -->
                        <img src="../assets/cart_logo.png" class="cart-logo">
                        <!-- <div class="iconfont icon-gouwuche highlight"></div> -->
                        <!-- </div> -->
                        <div class="num" v-if="totalCount> 0">{{totalCount}}</div>
                    </div>
                    <!-- </div> -->
                    <div class="highlight" style="margin-left: 1rem;">￥{{totalPrice}}</div>
                </div>
                <div class="content-right">
                    <!-- <router-link to="/cart"> -->
                    <div class="pay enough" @click='toCart'>
                        提交
                    </div>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import BScroll from 'better-scroll'
    import axios from 'axios'
    export default {
        name: 'container',
        data() {
            return {
                goodArr: [],
                totalCount: 0,
                totalPrice: 0,
                shopId: '',
                tableId: '',
                shopInfo: {}
            }
        },
        created() {
            console.log('into order...............');
            // this.shopId = this.$route.params.shopId;
            // var shopId = localStorage.getItem('shopId');
            // var tableId = localStorage.getItem('tableId');
            var shopInfo = JSON.parse(localStorage.getItem('shopInfo'));
            this.shopInfo = shopInfo;
            // this.shopId = shopInfo.shopId;
            // this.tableId = shopInfo.tableId;
            // console.log('into order....tableId...........', this.tableId);
            this.$nextTick(() => {
                this.getAll();
                this.getTableNumber();
            });
        },
        //挂载数据
        mounted() {
            // this.getAll();
        },
        methods: {
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrap, { click: true, tap: true })
                // this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {})
            },
            //获取菜品
            getAll: function () {
                var shopInfo = this.shopInfo;
                var shopId = shopInfo.shopId;
                // var tableId = this.tableId;
                axios({
                    url: '/onlyOrder/menu/selectAll',
                    // url: '/api/menu/selectAll',
                    method: 'get',
                    params: {
                        shopId: shopId
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {

                    const goodArr = res.data.data;
                    goodArr.forEach(item => {
                        item.selected = false;
                        item.dish.forEach(items => {
                            items.number = 0;
                        })
                    })
                    goodArr[0].selected = true;
                    // console.log('goodArr-======', goodArr);
                    this.goodArr = goodArr;
                    this.$nextTick(() => {//
                        this._initScroll();
                    });
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //获取当前已选择数量和价格
            getTableNumber: function () {
                var shopInfo = this.shopInfo;
                var shopId = shopInfo.shopId;
                var tableId = shopInfo.tableId;
                axios({
                    url: '/onlyOrder/cart/selectNumberAndPrice',
                    // url: '/api/menu/selectAll',
                    method: 'get',
                    params: {
                        shopId: shopId,
                        tableId: tableId
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {

                    this.totalCount = res.data.data.totalCount;
                    this.totalPrice = res.data.data.totalPrice;
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            itemSelect(index) {
                const goodArr = this.goodArr;
                goodArr.forEach(item => {
                    item.selected = false;
                })
                goodArr[index].selected = true;
                // console.log('goodArr-======', goodArr);
                this.goodArr = goodArr;
                const scrollTo = this.order(index);
                // console.log('scrollTo:', scrollTo);
                document.getElementById(scrollTo).scrollIntoView();
            },
            order: function (parentIndex) {
                return 'order' + parentIndex;
            },
            //数量加
            addTo: function (index, parentIndex) {
                // var shopId = this.shopId;
                // var tableId = this.tableId;
                var shopInfo = this.shopInfo;
                var shopId = shopInfo.shopId;
                var tableId = shopInfo.tableId;
                console.log('tableId is:------------', tableId);
                let totalCount = this.totalCount;
                let goodArr = this.goodArr;
                goodArr[parentIndex].dish[index].number++;
                let dishId = goodArr[parentIndex].dish[index].iftId;
                let dishName = goodArr[parentIndex].dish[index].dishName;
                let dishImage = goodArr[parentIndex].dish[index].dishImage;
                let number = goodArr[parentIndex].dish[index].number;
                let dishPrice = goodArr[parentIndex].dish[index].price;
                totalCount++;
                this.totalCount = totalCount;
                axios({
                    url: '/onlyOrder/cart/add',
                    // url: '/api/cart/add',
                    method: 'post',
                    data: {
                        shopId: shopId,
                        tableId: tableId,
                        // shopId: 1,
                        // tableId: 1,
                        dishId: dishId,
                        dishName: dishName,
                        // dishImage: dishImage,
                        number: number,
                        dishPrice: dishPrice
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {

                    // this.totalCount = totalCount;
                    this.goodArr = goodArr;
                    // this.totalCount = res.data.data.totalCount;
                    var totalPrice = res.data.data.totalPrice;
                    this.totalPrice = totalPrice;
                    this.$forceUpdate()
                    console.log('数量加=???????=====', this.totalPrice);
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //数量减
            subtractTo: function (index, parentIndex) {
                console.log('菜品数量减。。。。。', this.tableId);
                // var shopId = this.shopId;
                // var tableId = this.tableId;
                var shopInfo = this.shopInfo;
                var shopId = shopInfo.shopId;
                var tableId = shopInfo.tableId;
                let totalCount = this.totalCount;
                let goodArr = this.goodArr;
                goodArr[parentIndex].dish[index].number--;
                let dishId = goodArr[parentIndex].dish[index].iftId;
                totalCount--;
                this.totalCount = totalCount;
                axios({
                    url: '/onlyOrder/cart/reduceNumber',
                    method: 'get',
                    params: {
                        shopId: shopId,
                        tableId: tableId,
                        dishId: dishId,
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    // console.log('数量减---------', res);
                    // this.totalCount = totalCount;
                    this.goodArr = goodArr;
                    // this.totalCount = res.data.data.totalCount;
                    var totalPrice = res.data.data.totalPrice;
                    this.totalPrice = totalPrice;
                    this.$forceUpdate()
                    console.log('数量减?????======', this.totalPrice);
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            toCart: function () {
                var shopId = this.shopId;
                var tableId = this.tableId;
                console.log('跳转到购物车....');
                this.$router.push({
                    path: '/cart',
                    // query: {
                    //     table: 1,
                    // }
                    // name: 'cart',
                    // params: {
                    //     shopId: shopId,
                    //     tableId: tableId
                    // }
                }).catch(err => {
                    console.log('跳转失败：', err);
                })
            }
        }
    }
</script>
<style>
    body {
        width: 100%;
        height: 100%;
    }

    #container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }

    .good {
        /* display: flex; */
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        /* justify-content: space-between; */
        /* overflow: hidden; */
        /* z-index: 1; */
        /* padding-bottom: 2.67rem; */
    }

    .shop-left {
        width: 4rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #eee;
        /* box-sizing: border-box; */
        /* flex: 1; */
        /* position: absolute; */
        /* top: 0; */
    }

    .type-item {
        width: 100%;
        height: 1.97rem;
        display: flex;
        flex-direction: column;
        font-size: 0.7rem;
        color: #5c5d5f;
        text-align: center;
        align-items: center;
        vertical-align: middle;
        line-height: 1.97rem;
        border-bottom: 1px solid #fff;

    }

    .type-item-text {
        display: flex;
        flex-direction: row;
        height: 1.97rem;
        text-align: center;
        align-items: center;
        vertical-align: middle;
    }

    .good-right {
        /* position: absolute; */
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        /* flex: 1; */
        /* width: 10rem; */
        /* margin-left: 4rem; */
        /* right: 0; */
        /* box-sizing: border-box; */
    }

    .good-list {
        display: flex;
        /* width: 10rem; */
        height: 100%;
        flex-direction: column;
        align-items: center;
    }

    .right-title-view {
        /* background-color: #eee; */
        /* width: 10rem; */
        display: flex;
        flex-direction: row;
    }

    .right-title {
        /* width: 10rem; */
        font-size: 0.9rem;
        padding: 0.3rem 0 0.3rem 1rem;
        /* text-align: left; */
    }



    .good-item {
        width: 8rem;
        height: 4.48rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.4rem 0;
        border-bottom: solid 1px #eee;
    }

    .good-left {
        display: flex;
        flex-direction: row;

    }

    .good-img {
        width: 5.6rem;
        height: 4rem;
        background-color: #2b2b2b;
    }

    .good-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 0.43rem;
        height: 4rem;
        justify-content: space-between;
    }

    .good-price {
        color: #e86458;
        text-align: left;
    }

    .info-bottom {
        height: 1.6rem;
        /* width: 100%;+
         */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .good-name {
        text-align: left;
        font-size: 0.9rem;
        color: #2b2b2b;
    }

    .good-number-control {
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    .subtract-icon {
        width: 1.06rem;
        height: 1.06rem;
        /* padding: 1rem; */
        box-sizing: border-box;
    }

    .good-number {
        margin-left: 0.32rem;
        margin-right: 0.32rem;
        color: #999999;
        font-size: 0.9rem;
    }


    /* shopcart 样式 */

    .shopCart {
        position: fixed;
        /* left: 0; */
        bottom: 0;
        z-index: 9999;
        width: 100%;
        height: 3rem;
    }

    .shopCart .content {
        display: flex;
        background: #eee;
    }

    .content-left {

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    /* .shopCart .content .content-left .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -0.53rem;
        margin: 0 0.64rem;
        padding: 2.93rem;
        width: 2.98rem;
        height: 2.98rem;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
    } */

    .logo-cart {
        width: 2.53rem;
        height: 2.56rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 1.44rem;
    }

    .cart-logo {
        width: 2.21rem;
        height: 2.21rem;
        background-color: #e60012;
        border-radius: 50%;
        /* line-height:2.56rem; */
    }

    .logo-cart .num {
        position: absolute;
        top: 0;
        /* right: 0; */
        left: 3.17rem;
        width: 1.28rem;
        height: 1.28rem;
        line-height: 1.28rem;
        text-align: center;
        border-radius: 0.85rem;
        font-size: 0.48rem;
        font-weight: 700;
        color: #fff;
        background: rgb(240, 20, 20);
        box-shadow: 0 0.21rem 0.42rem 0 rgba(0, 0, 0, 0.4);
    }

    /* .shopCart .content .content-left .logo-wrapper .logo {
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 50%;
        background: #2b343c;
    }

    .shopCart .content .content-left .logo-wrapper .logo.highlight {
        background: rgb(0, 160, 220);
    }

    .shopCart .content .content-left .logo-wrapper .logo .icon-gouwuche {
        line-height: 2.34rem;
        font-size: 1.28rem;
        color: #80858a;
    }

    .shopCart .content .content-left .logo-wrapper .logo .icon-gouwuche.highlight {
        color: #fff;
    } */

    /* .shopCart .content .content-left .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 0.64rem;
        line-height: 1.28rem;
        padding-right: 0.64rem;
        box-sizing: border-box;

        font-size: 0.85rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
    } */

    .highlight {
        color: #333333;
        /* box-sizing: border-box; */
    }

    .shopCart .content .content-left .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 1.28rem;
        margin-left: 0.64rem;
        margin-top: 0.64rem;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.53rem;
    }

    .shopCart .content .content-right {
        flex: 0 0 5.6rem;
        width: 5.6rem;
    }

    .shopCart .content .content-right .pay {
        height: 2.56rem;
        line-height: 2.56rem;
        text-align: center;
        font-size: 0.64rem;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        background: #2b333b;
    }

    .shopCart .content .content-right .pay.not-enough {
        background: #2b333b;
    }

    .shopCart .content .content-right .pay.enough {
        /* background: #00b43c; */
        background: #fada85;
        color: #333;
    }

    .shopCart .ball-container .ball {
        position: fixed;
        left: 1.75rem;
        bottom: 1.17rem;
        z-index: 200;
        transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }

    .shopCart .ball-container .ball .inner {
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
    }

    .shopCart .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
    }

    .shopCart .shopcart-list :fade-enter-active,
    :fade-leave-active {
        transition: all 0.5s transform translate3d(0, -100%, 0);
    }

    .shopCart .shopcart-list :fade-enter,
    :fade-leave-active {
        transform: translate3d(0, 0, 0);
    }

    .shopCart .shopcart-list .list-header {
        height: 2.13rem;
        line-height: 2.13rem;
        padding: 0 0.96rem;
        background: #f3f5f7;
        border-bottom: 2rpx solid rgba(7, 17, 27, 0.1);
    }

    .shopCart .shopcart-list .list-header .title {
        float: left;
        font-size: 0.74rem;
        color: rgb(7, 17, 27);
    }

    .shopCart .shopcart-list .list-header .empty {
        float: right;
        font-size: 0.64rem;
        color: rgb(0, 160, 220);
    }

    .shopCart .shopcart-list .list-content {
        padding: 0 0.95rem;
        max-height: 11.57rem;
        overflow: hidden;
        background: #fff;
    }

    .shopCart .shopcart-list .list-content .shopcart-food {
        position: relative;
        padding: 0.64rem 0;
        box-sizing: border-box;
        /*border-top: 1px solid rgba(7,17,27,0.1);*/
    }

    .shopCart .shopcart-list .list-content .shopcart-food .name {
        line-height: 1.28rem;
        font-size: 0.74rem;
        color: rgb(7, 17, 27);
    }

    .shopCart .shopcart-list .list-content .shopcart-food .price {
        position: absolute;
        right: 4.8rem;
        bottom: 0.64rem;
        line-height: 1.28rem;
        font-size: 0.74rem;
        font-weight: 700;
        color: rgb(240, 20, 20);
    }

    .shopCart .shopcart-list .list-content .shopcart-food .cartControl-wrapper {
        position: absolute;
        right: 0;
        bottom: 0.32rem;
    }
</style>