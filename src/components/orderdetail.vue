<template>
    <div class="content">
        <div class="white-bg flex-column spacing-padding-between btm-wired">
            <div class="flex-row order-header txt-align-left">
                <p class="order-title">
                    <span class="regular title">订单编号:</span>
                    <span class="height-light">123652145874</span>
                </p>
                <p class="order-status warning ">已支付</p>
            </div>
        </div>
        <div class="white-bg flex-column spacing-padding-between btm-dashed">
              <div class="flex-column order-content txt-align-left spacing-padding-btm">
                  <p class="start-day  spacing-padding-top"><span class="title">出发日期:</span>
                  <span class="info-color">2018-06-30 星期四</span></p>
                  <p class="flight-info spacing-padding-top"><span class="title">航班信息:</span>
                  <span class="info-color">吉祥航空</span>
                  </p>
                  <p class="flight-info spacing-padding-top"><span class="title"></span>
                  <span class="info-color">浙江杭州-黑龙江哈尔滨</span>
                  </p>
              </div>
        </div>
        <div class="white-bg flex-column spacing-padding-between btm-wired">
            <div class="flex-column order-content txt-align-left spacing-padding-top spacing-padding-btm">
                <p><span class="title">订单金额:</span>
                <span class="height-light">255.0元</span></p>
            </div>
        </div>
         <div class="white-bg flex-column spacing-padding-between">
            <div class="flex-column order-customer-detail">
                <p class="txt-align-center"><span class="arrow-down choose-color">展开乘客详情</span></p>
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
@import '../assets/style/index.less';

    .content{
        margin-top: 1rem;
    }
    .order-header{
        justify-content: space-between;
    }
    .order-title{
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .order-status{
        line-height: 0.8rem;
    }
    .start-day{
        text-align: left;
    }
    .order-customer-detail{
        height: 0.8rem;
        line-height: 0.8rem;
    }
</style>
<script>
    export default({
        name:'orderdetail'
    });
</script>

