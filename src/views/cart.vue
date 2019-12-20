<template>
    <div id="cart">
        <template v-if='cartList'>
            <div class="cart-list">
                <div class="cart-item" v-for="(item, index) in cartList" :key="index">
                    <div class="item-name">{{item.dishName}}</div>
                    <div class="item-right" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                        <div class="item-price" style="width: 2rem;;">￥{{item.dishPrice}}</div>
                        <div class="buy-num" style="width: 3.78rem;">
                            <div class="jian-btn" @click="jianBtnTap(index)">
                                -</div>
                            <input type="number" :value='(item.number)' v-on:keyup="inputTargetValue"
                                class="number-input" />
                            <div class="jia-btn" @click="jiaBtnTap(index)">+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="totalprice">总价:￥{{totalPrice}}</div>
                <div class="footer-right">
                    <!-- <div class="submit" @click='toHome'>首页</div> -->
                    <div class="submit" @click='submit' style="background-color: #ba000f;color: #fff;">提交</div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="null-view">
                <div class="null-title">购物车空空如也</div>
                <mt-button type="danger" style="padding:0 3rem;" @click='toOrder'>立即点餐</mt-button>
            </div>
        </template>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';
    import axios from 'axios'
    import { Toast } from 'mint-ui';
    export default {
        name: 'cart',
        data() {
            return {
                cartList: [],
                totalPrice: 0,
                shopId: '',
                tableId: ''
            }
        },
        created() {
            // this.shopId = this.$route.params.shopId;
            // this.tableId = this.$route.params.tableId;
            var shopInfo = JSON.parse(localStorage.getItem('shopInfo'));
            this.shopInfo = shopInfo;
            this.shopId = shopInfo.shopId;
            this.tableId = shopInfo.tableId;
            // console.log('tableId:????????', this.tableId);
            // this.$nextTick(() => {
            //     this.getData();
            // });
        },
        mounted() {
            this.getData();
        },
        methods: {
            //获取购物车数据
            getData: function () {
                var shopId = this.shopId;
                var tableId = this.tableId;
                axios({
                    url: '/onlyOrder/cart/select',
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
                    // console.log('res。。。。。。。。。。。。', res);
                    const cartList = res.data.data;
                    this.cartList = cartList;
                    this.getTotalPrice();
                }).catch(res1 => {
                    console.log('res1......', res1)
                })
            },
            //数量加
            jiaBtnTap: function (index) {
                // console.log('菜品数量加。。。。。');
                // const shopId = sessionStorage.getItem('shopId');
                // const tableId = sessionStorage.getItem('tableId');
                var shopId = this.shopId;
                var tableId = this.tableId;
                let totalCount = this.totalCount;
                let cartList = this.cartList;
                cartList[index].number++;
                let dishId = cartList[index].dishId;
                let dishName = cartList[index].dishName;
                let dishImage = cartList[index].dishImage;
                let number = cartList[index].number;
                let dishPrice = cartList[index].dishPrice;
                totalCount++;
                this.totalCount = totalCount;
                axios({
                    url: '/onlyOrder/cart/add',
                    method: 'post',
                    data: {
                        // shopId: shopId,
                        // tableId: tableId,
                        shopId: shopId,
                        tableId: tableId,
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
                    console.log('数量加======', res);
                    // this.cartList = cartList;
                    this.totalPrice = res.data.data.totalPrice;
                    this.$forceUpdate()
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //数量减
            jianBtnTap: function (index, parentIndex) {
                console.log('菜品数量减。。。。。');
                // const shopId = sessionStorage.getItem('shopId');
                // const tableId = sessionStorage.getItem('tableId');
                let totalCount = this.totalCount;
                let cartList = this.cartList;
                cartList[index].number--;
                let dishId = cartList[index].dishId;
                totalCount--;
                this.totalCount = totalCount;
                axios({
                    url: '/onlyOrder/cart/reduceNumber',
                    method: 'get',
                    params: {
                        // shopId: shopId,
                        // tableId: tableId,
                        shopId: this.shopId,
                        tableId: this.tableId,
                        dishId: dishId,
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {
                    console.log('数量减---------', res);
                    // this.totalCount = totalCount;
                    // this.cartList = cartList;
                    // this.totalCount = res.data.data.totalCount;
                    this.getData();
                    if (res.data.data != null) {
                        this.totalPrice = res.data.data.totalPrice;
                        this.$forceUpdate()
                    }
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //获取输入框值
            inputTargetValue: function (e) {
                console.log(e.target.value);
                let totalCount = this.totalCount;
                let cartList = this.cartList;
                cartList[index].number = e.target.value;
                let dishId = cartList[index].iftId;
                let dishName = cartList[index].dishName;
                let dishImage = cartList[index].dishImage;
                let number = cartList[index].number;
                let dishPrice = cartList[index].price;
                this.totalCount = totalCount;
                axios({
                    url: '/onlyOrder/cart/add',
                    method: 'post',
                    params: {
                        // shopId: shopId,
                        // tableId: tableId,
                        shopId: this.shopId,
                        tableId: this.tableId,
                        dishId: dishId,
                        dishName: dishName,
                        dishImage: dishImage,
                        number: number,
                        dishPrice: dishPrice

                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {
                    console.log('数量加======', res);
                    this.cartList = cartList;
                    this.totalPrice = res.data.data.totalPrice;
                    this.$forceUpdate()
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //生成预订单，打印
            submit: function () {
                let cartList = this.cartList;
                //封装好订单数组
                let dishArray = new Array;
                for (var i = 0; i < cartList.length; i++) {
                    var temp = {
                        cid: cartList[i].id,
                        dishId: cartList[i].dishId,
                        dishImage: cartList[i].dishImage,
                        dishName: cartList[i].dishName,
                        dishPrice: cartList[i].dishPrice,
                        dishNumber: cartList[i].number
                    }
                    dishArray.push(temp);
                }
                console.log('dishArray is:', dishArray);
                // let openId = 
                axios({
                    url: '/onlyOrder/order/add',
                    method: 'POST',
                    data: {
                        shopId: this.shopId,
                        tableId: this.tableId,
                        dishArray: dishArray,
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    console.log('生成预订单======', res);
                    // this.$router.push('/form')
                    let orderId = res.data.data;
                    this.orderId = orderId;
                    console.log('orderId is:', orderId);
                    this.printOrder();
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //打印
            printOrder: function () {
                var orderId = this.orderId;
                console.log('printOrder is:', orderId);
                axios({
                    url: '/onlyOrder/print/sendMsgAll',
                    method: 'get',
                    params: {
                        // shopId: shopId,
                        // tableId: tableId,
                        shopId: this.shopId,
                        orderId: this.orderId
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {
                    console.log('打印成功======', res);
                    Toast('菜单打印成功');
                    this.toForm();
                    // this.cartList = cartList;
                    // this.totalPrice = res.data.data.totalPrice;
                }).catch(res1 => {
                    console.log(res1, 'res1')
                })
            },
            //计算总价
            getTotalPrice: function () {
                let cartList = this.cartList;
                let totalPrice = 0;
                console.log('计算总价cartList:', cartList);
                if (cartList != null) {
                    console.log('当前总价为：::::::::::::::', totalPrice);
                    for (var i = 0; i < cartList.length; i++) {
                        totalPrice += cartList[i].dishPrice * cartList[i].number;
                    }
                }
                this.totalPrice = totalPrice;
            },
            //立即点餐
            toOrder: function () {
                this.$router.push({
                    // name: 'order',
                    // params: {
                    //     shopId: this.shopId,
                    //     tableId: this.tableId
                    // },
                    path: '/order'
                })
            },
            //跳转到订单
            toForm: function () {
                this.$router.push({
                    // name: 'form',
                    // params: {
                    //     shopId: this.shopId,
                    //     tableId: this.tableId
                    // },
                    path: '/form'
                }).catch(err => {
                    console.log('跳转失败：', err);
                })
            }
        },
    }
</script>
<style>
    #cart {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }

    .null-view {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10rem;
        ;
    }

    .null-title {
        font-size: 1rem;
        color: #999;
        margin-bottom: 2rem;
    }

    .cart-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cart-item {
        width: 19.2rem;
        display: flex;
        height: 2.66rem;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e2e2e2;
    }

    .item-name {
        font-size: 0.8rem;
        color: #333333;
        width: 100%;
        text-align: left;
    }
    .item-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        /* width: 100%; */
        justify-content: space-between;
    }

    .item-price {
        width: 3rem;
        font-size: 0.74rem;
        color: #333333;
    }


    .buy-num {
        width: 3.78rem;
        height: 1.28rem;
        /* line-height: 1.28rem; */
        position: absolute;
        right: 0.8rem;
        /* bottom: 0; */
        display: flex;
        /*justify-content: space-between;*/
        font-size: 0.64rem;
        text-align: center;
    }

    .jian-btn {
        width: 1.28rem;
        height: 1.28rem;
        border-left: 0.03rem solid #ccc;
        border-bottom: 0.03rem solid #ccc;
        border-top: 0.03rem solid #ccc;
        border-bottom-left-radius: 0.16rem;
        border-top-left-radius: 0.16rem;
        text-align: center;
        line-height: 1.28rem;
    }

    .jian-btn.disabled {
        background-color: #f5f5f9;
        border-left: 0.03rem solid #eee;
        border-bottom: 0.03rem solid #eee;
        border-top: 0.03rem solid #eee;
        color: #ccc;
        text-align: center;
        line-height: 1.28rem;
    }

    .jia-btn {
        width: 1.28rem;
        height: 1.28rem;
        border-right: 0.03rem solid #ccc;
        border-bottom: 0.03rem solid #ccc;
        border-top: 0.03rem solid #ccc;
        border-bottom-right-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        text-align: center;
        line-height: 1.28rem;
    }


    .number-input {
        width: 1.81rem;
        height: 1.17rem;
        /* min-height: 1.28rem; */
        text-align: center;
        font-size: 0.64rem;
        border: 0.03rem solid #ccc;
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 2.66rem;
        position: fixed;
        background-color: #eee;
        bottom: 0;
        z-index: 999;

    }

    .submit {
        width: 5.33rem;
        height: 2.66rem;
        background-color: #fada85;
        text-align: center;
        line-height: 2.66rem;
        font-size: 0.8rem;
    }

    .totalprice {
        margin-left: 1.44rem;
        font-size: 0.96rem;
    }

    .footer-right {
        display: flex;
        flex-direction: row;

    }
</style>