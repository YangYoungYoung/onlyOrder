<template>
    <div id="form-order">
        <template v-if='cartList'>
            <div class=" cart-list">
                <div class="cart-item" v-for="(item, index) in cartList" :key="index">
                    <div class="item-name">{{item.dishName}}</div>
                    <div class="item-right">
                        <div class="item-price">￥{{item.dishPrice}}</div>
                        <div class="buy-num">{{item.number}}份</div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="totalprice">总价:￥{{totalPrice}}</div>
                <div class="footer-right">
                    <div class="submit" @click='toHome'>首页</div>
                    <!-- <div class="submit" @click='submit' style="background-color: #ba000f;color: #fff;">提交</div> -->
                </div>
            </div>
        </template>
        <template v-else>
            <div class="null-view">
                <div class="null-title">订单空空如也</div>
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
        name: 'form-order',
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
        },
        mounted() {
            this.getData();
        },
        methods: {
            //获取订单数据
            getData: function () {
                axios({
                    url: '/onlyOrder/order/select',
                    method: 'get',
                    params: {
                        shopId: this.shopId,
                        tableId: this.tableId
                    },
                    headers: {
                        // Authorization: 'Bearer eyJ0eXAiABUg-Fxs...',
                        Accept: 'application/json'
                    }
                }).then(res => {
                    console.log('res。。。。。。。。。。。。', res);
                    const cartList = res.data.data.jsonArray;
                    this.cartList = cartList;
                    this.getTotalPrice();
                }).catch(res1 => {
                    console.log('res1......', res1)
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
            //跳转到首页
            toHome: function () {
                this.$router.push({
                    // name: '/',
                    // params: {
                    //     shopId: this.shopId,
                    //     tableId: this.tableId
                    // },
                    path: '/'
                }).catch(err => {
                    console.log('跳转失败：', err);
                })
            }
        },
    }

</script>
<style>
    #form-order {
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
        /* justify-content: space-between; */
        border-bottom: 1px solid #e2e2e2;
    }

    .item-name {
        font-size: 0.8rem;
        color: #333333;
        width: 100%;
        text-align: left;
        margin-left: 1rem;
    }

    .item-price {
        width: 50%;
        font-size: 0.74rem;
        color: #333333;
    }

    .item-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .buy-num {
        width: 50%;
        font-size: 0.74rem;
        text-align: right;
        margin-right: 1rem;
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