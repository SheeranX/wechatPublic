<template>
    <div class="content">
     <div v-for="item in items" :key="item.orderNo" class="content-box">
         <div class="white-bg flex-column spacing-padding-between btm-wired">
            <div class="flex-row order-header txt-align-left">
                <p class="order-title">
                    <span class="regular title">订单编号:</span>
                    <span class="height-light">{{item.orderNo}}</span>
                </p>
                <p class="order-status warning ">{{item.paymentStatus=="YES"?'已支付':"未支付"}}</p>
            </div>
        </div>
        <div class="white-bg flex-column spacing-padding-between btm-dashed">
              <div class="flex-column order-content txt-align-left spacing-padding-btm">
                  <p class="start-day  spacing-padding-top"><span class="title">出发日期:</span>
                  <span class="info-color">{{item.playDateTime}}</span></p>
                  <p class="flight-info spacing-padding-top"><span class="title">航班编号:</span>
                  <span class="info-color">{{item.flightNo}}</span>
                  </p>
                  <p class="flight-info spacing-padding-top"><span class="title"></span>
                  <span class="info-color">{{item.startPointName}}-{{item.endPointName}}</span>
                  </p>
              </div>
        </div>
        <div class="white-bg flex-row spacing-padding-between btm-wired cash-info">
            <div class="flex-column order-content txt-align-left spacing-padding-top spacing-padding-btm">
                <p><span class="title">订单金额:</span>
                <span class="height-light">{{(item.orderAmount).toFixed(2)}}元</span></p>
            </div>
            <div class="widthdraw info-color spacing-padding-top spacing-padding-btm">
                <span @click="goOnPay(item.orderNo)" v-if="item.paymentStatus=='NO'&&item.orderStatus=='NORMAL'">继续支付</span>
                <span @click="widthdraw(item.orderNo)" v-if="item.orderStatus=='NORMAL'">{{!item.withdrewFlag?((item.paymentStatus=='YES'&&item.orderStatus)=="NORMAL"?"退订":"取消"):""}}</span>
            </div>
        </div>
         <div class="white-bg flex-column spacing-padding-between">
            <div class="flex-column order-customer-detail">
                <label class="txt-align-center" @click="getMore(item.orderNo)" :for="item.orderNo"><span class="arrow-down choose-color" :class="!modal.show?'arrow-up':''">展开乘客详情</span></label>
            </div>
            <div class="flex-column" v-if="!modal.show" v-for="order in item.orderDetailList" :key="order.certificateNo">
                 <div class="flex-row person-details-list">
                    <p class="person-detail-item title">{{order.ticketTypeName}}</p>
                    <p class="person-detail-item">{{order.certificateNo}}</p>
                    <p class="person-detail-item title">{{order.certificateName}}</p>
                </div>
            </div>
        </div>
     </div>
     <h4 class="txt-align-center no-result" v-if="items.toString()==''">
         无订单信息
     </h4>
    </div>
</template>
<style lang='less' scoped>
@import "../assets/style/index.less";

.content {
  margin-top: 1rem;
}
.content-box {
  padding-bottom: 0.3rem;
}
.order-header {
  justify-content: space-between;
}
.order-title {
  height: 0.8rem;
  line-height: 0.8rem;
}
.order-status {
  line-height: 0.8rem;
}
.start-day {
  text-align: left;
}
.cash-info {
  justify-content: space-between;
}
.order-customer-detail {
  height: 0.8rem;
  line-height: 0.8rem;
}
.person-details-list {
  justify-content: space-between;
  height: 0.8rem;
}
.person-details-list .idnum {
  width: 60%;
}
.person-details-list .person-detail-item {
  padding-top: 0.1rem;
}
</style>
<script>
const LOOK = process.env.LOOK_API;

export default ({
  name: "orderdetail",
  props: ['resultData'],
  data: function() {
    return {
      items: this.resultData,
      modal: {
        show: true
      }
    };
  },
  methods: {
    getMore(id) {
      this.modal.show = !this.modal.show;
    },
    goOnPay(id){
       let status = confirm("确定执行此操作？");
       if(status)
       {
           this.$loading("系统操作中...");

           this.$http({
            url: LOOK + "/pckgBookingTicket/cancelOrder.do?orderNo=" + id
          }).then(res=>{
             this.$loading.close();
             this.$router.push({name:'message',params:{code:0,orderid:id}});
        })
       }
    },
    widthdraw(id) {
      
      let status = confirm("确定执行此操作？");
      if (status) {
        this.$loading("系统操作中...");
        this.$http({
          url: LOOK + "/pckgBookingTicket/cancelOrder.do?orderNo=" + id
        })
          .then(res => {
            this.$loading.close();
            if (res.code == "0") {
                let arr = JSON.parse(JSON.stringify(this.items));
              for(let i =0;i<arr.length;i++){
                  if(arr[i].orderNo==id)
                  {
                      arr[i].withdrewFlag = true;
                  }
              }
              this.items = arr;
             // this.withdrewFlag = false;
            } else {
              this.$toast.center(res.message);
            }
          })
          .catch(error => {
            this.$toast.center("退订失败，请重试");
          });
      }
    }
  },
  watch:{
      resultData(val){
          this.items = val;
      }
  }
});
</script>

