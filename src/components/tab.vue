<template>
    <div class="topbar white-bg">
        <div class="flex-row top-bar-list">
            <div class="top-bar-item" v-for="(item,index) in tabbar" :key="item.id" v-bind:class="index==selected?'active':''" @click="switchTab(index)">{{item.txt}}</div>
        </div>
    </div>
</template>
<style lang='less' scoped>
@import '../assets/style/index.less';
    .topbar{
        position: fixed;
        height: 0.8rem;
        width: 100%;
        line-height: 0.8rem;
        top: 0;
    }
    .top-bar-list{
        justify-content: space-around;
    }
    .top-bar-item{
        width: 33%;
    }
    .active{
        color: @info-color;
        &:after{
            content: '';
            display: block;
            position: absolute;
            width: 33%;
            height: 2px;
            background: @info-color
        }
    }
</style>
<script>
    export default({
        name:'tab',
        data:function(){
            return {
                selected:'0',
                tabbar:[{id:'2001',txt:'待出行订单'},{id:"2002",txt:'未支付订单'},{id:'2003',txt:'历史订单'}]
            }
        },
        methods:{
            switchTab(idx){
               this.selected = idx;
            }
        }
    })
</script>

