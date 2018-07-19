<template>
    <div class="topbar white-bg">
        <div class="flex-row top-bar-list">
            <div class="top-bar-item" v-for="(item,index) in tabbar" :key="item.id" v-bind:class="index==selected?'active':''" @click="switchTab(index,item.id)">{{item.txt}}</div>
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
        z-index: 999;
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

const LOOK = process.env.LOOK_API;
const BASE = process.env.BASE_API;

    export default({
        name:'tab',
        data:function(){
            return {
                selected:'0',
                tabbar:[{id:'2001',txt:'待出行订单'},{id:"2002",txt:'未支付订单'},{id:'2003',txt:'历史订单'}],
                orderStatus:['pending','unpay','history']
            }
        },
        methods:{
            switchTab(idx){
                let self = this;
                self.selected = idx;
               
               switch(idx){
                   case 0://待支付
                    let pend = [];
                     this.$loading('数据加载中...');
                    self.$http({
                        method:'post',
                        url:LOOK+'/pckgBookingTicket/queryOrder.do',
                        data:JSON.stringify({
                            "orderType":"0"
                        })
                     }).then(res=>{
                        this.$loading.close()
                        pend =JSON.parse(res.data);
                        self.$emit('on-result-pending',pend);
                     }).catch(error=>{
                          this.$toast.close();
                    });
                    break;
                   case 1://已支付
                     let unpay = [];
                      this.$loading('数据加载中...');
                      self.$http({
                        method:'post',
                        url:LOOK+'/pckgBookingTicket/queryOrder.do',
                        data:JSON.stringify({
                            "orderType":"1"
                        })
                      }).then(res=>{
                        this.$loading.close()
                        unpay = JSON.parse(res.data);

                        self.$emit('on-result-pending',unpay);

                      }).catch(error=>{
                          this.$toast.close();
                     });
                    break;
                   case 2://历史订单
                      this.$loading('数据加载中...');
                     let history = [];
                      self.$http({
                        method:'post',
                        url:LOOK+'/pckgBookingTicket/queryOrder.do',
                        data:JSON.stringify({
                            "orderType":"2"
                        })
                      }).then(res=>{
                        this.$loading.close()
                        history =JSON.parse(res.data);
                        self.$emit('on-result-pending',history);
                      }).catch(error=>{
                          this.$toast.close();
                     });

                    console.log(idx);
                    break;
               }
            }

        },
        props:['result']
    })
</script>

