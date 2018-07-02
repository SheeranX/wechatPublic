<template>
    <div class="option-detail flex-row">
        <span class="numbtn minus" @click="minus">-</span><input type="text" class="quantity" maxlength="2" v-model="num"><span class="numbtn plus" @click="plus">+</span>
    </div>
</template>
<script>
    export default({
        name:'quantity',
        data:function(){
            return {
                num:1
            }
        },
        methods:{
            minus(){
               this.num<2?this.num==1:this.num--
            },
            plus(){
                this.num++
            }
        }
    })
</script>
<style lang='less' scoped>
@import '../assets/style/index.less';

.numbtn{
     display: inline-block;
     background: @btn-color;
     color: @white-color;
     width: 0.8rem;
     align-items: center;
     line-height: 0.5rem;
     font-size: 0.4rem;
}
.minus{
     border-radius: 0.05rem 0 0 0.05rem;
}
.plus{
     border-radius: 0rem 0.05rem 0.05rem 0rem;
}
.quantity{
    width: 0.8rem;
    border: 1px solid @btn-color;
    outline: none;
    text-align: center;
    color: @num-color;
}
</style>

