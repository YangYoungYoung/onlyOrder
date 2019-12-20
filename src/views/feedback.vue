<template>
    <div id="#feedback" style="width: 100%;display: flex;flex-direction: column;align-items: center;">
        <div class="content">
            <h5 style="margin-top: 0.53rem;">请留下您的宝贵意见：</h5>
            <textarea class="input-view" v-model="str"  placeholder="请输入意见。。。">
            </textarea>
            <mt-button type="primary" style="margin-top: 1.53rem
            ;width:12rem ;" @click.native="handleClick">提交</mt-button>
        </div>
    </div>
</template>
<script>
    import { Button } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        name: 'feedback',
        data() {
            return {
                str:''
            }
        },
        beforeCreate() {
            var that = this;
            document.querySelector('body').setAttribute('style', 'background:#f3f3f3')
        },
        methods: {
            handleClick: function () {
                // console.log('我点击了一下按钮');
                Toast('提交成功');
                this.str=''
            }
        },
    }
</script>

<style>
    #feedback {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
    }

    .content {
        width: 18.93rem;
        height: 17.6rem;
        background-color: #ffffff;
        border-radius: 0.26rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.56rem;
    }

    .input-view {
        width: 12.85rem;
        height: 7.15rem;
        font-size: 0.64rem;
        margin-top: 0.66rem;
        border: solid 1px #999;
        border-radius: 20px;
        resize: none;
        padding: 0.56rem;
    }

</style>