<template>
    <div id='schedule'>
        <div class="good-item" v-for="(item, index) in goods" :key="index" @click="">
            <div class="good-left">
                <img v-bind:src="item.src" class="good-img">
                <div class="good-info">
                    <div class="good-name">{{item.name}}</div>
                    <div class="good-price">￥{{item.price}}元</div>
                </div>
            </div>
            <!-- 显示菜品状态 -->
            <div class="good-right">
                <template v-if="item.status==1">
                    已出单
                </template>
                <template v-else-if='item.status==2'>
                    制作中
                </template>
                <template v-else-if="item.status==3">
                    已上菜
                </template>
                <template v-else>
                    已退菜
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>

<style>
    #schedule {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .good-item {
        width: 17.8rem;
        height: 4.85rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #e0dada;
        justify-content: space-between;
    }

    .good-img {
        width: 5.6rem;
        height: 4rem;
        box-sizing: border-box;
    }

    .good-left {
        display: flex;
        flex-direction: row;
    }

    .good-info {
        display: flex;
        flex-direction: column;
    }

    .good-right {
        width: 2.66rem;
        height: 1.33rem;
    }
</style>