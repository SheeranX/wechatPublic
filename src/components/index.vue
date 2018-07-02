<template>
    <div class="container flex-column bg-color">
        <div class="flex-content logo white-bg">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="option-list spacing-padding-between white-bg spacing-padding-top">
            <div class="flex-row option-item btm-wired">
                <div class="option-title font28">出发日期:</div>
                <div class="option-detail flex-row">
                    <span class="info-color">2018-06-30 星期四</span>
                    <span class="arrow"></span>
                </div>
            </div>
             <div class="flex-row option-item btm-wired">
                <div class="option-title font28">出&nbsp; 发&nbsp; 港:</div>
                <div class="option-detail flex-row">
                    <span class="num-color">请选择</span>
                    <span class="arrow"></span>
                </div>
            </div>
             <div class="flex-row option-item btm-wired">
                <div class="option-title font28">到&nbsp; 达&nbsp; 港:</div>
                <div class="option-detail flex-row">
                    <span class="num-color">请选择</span>
                    <span class="arrow"></span>
                </div>
            </div>
              <div class="flex-row option-item btm-wired">
                <div class="option-title font28">航&emsp;&emsp;班:</div>
                <div class="option-detail flex-row">
                    <span class="num-color">请选择</span>
                    <span class="arrow"></span>
                </div>
            </div>
        </div>
        <div class="option-list spacing-padding-between white-bg spacing-margin-updown">
             <div class="flex-row option-item btm-wired">
                <div class="option-title font28">全价票:&emsp;<span class="num-color">45.00 元 / 张</span></div>
                <quantity></quantity>
            </div>
            <div class="flex-row option-item btm-wired">
                <div class="option-title font28">全价票:&emsp;<span class="num-color">45.00 元 / 张</span></div>
                <quantity></quantity>
            </div>
            <div class="flex-row option-item btm-wired">
                 <div class="option-title font28">合計:&emsp;</div>
                  <div class="option-detail flex-row warning">
                      <span class="single-price bold font28">45.00</span><span class="sign">*</span><span class="single-num bold font28">1</span>
                      <span>+</span>
                      <span class="single-price bold font28">45.00</span><span class="sign">*</span><span class="single-num bold font28">1</span>
                      <span>=</span>
                      <span class="total bold font32">90.00</span>
                  </div>
            </div>
        </div>
         <btnsubmit></btnsubmit>
         <div class="option-list spacing-padding-between spacing-margin-top">
            <p class="font24"> 我已阅读并同意<span class="info-color">《购买须知》</span>中的条款</p>
        </div>
    </div>
</template>
<script>
import quantity from './quantity.vue';
import btnsubmit from './button-submit.vue';

    export default{
        name:'index',
        components:{quantity,btnsubmit},
        methods:{}
    }
</script>
<style lang="less">
@import '../assets/style/index.less';
.logo img{
    width: 0.6rem*@font-size-base;
}
.flex-content{
    justify-content: center;
    padding-top: 0.4rem;
}
.option-item{
    justify-content: space-between;
    padding-top: 0.3rem;
    height: 1rem;
    padding-bottom: 0.1rem;
    &:last-child{
        border: none;
    }
}
.option-title{
    line-height: 0.5rem;
}

</style>

