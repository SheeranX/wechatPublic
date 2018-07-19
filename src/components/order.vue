<template>
    <div class="order">
        <div class="header">
            <div class="flex-row time-flight">
                <h3 class="date spacing-padding-between">{{orderData.date||""}}</h3>
                <h3 class="flight spacing-padding-between">{{orderData.flight.name||""}}</h3>
            </div>
            <div class="flex-row departure-terminal">
                 <h3 class="spacing-padding-between start">{{orderData.departure.text}}</h3><h3>-</h3><h3 class="spacing-padding-between">{{orderData.arrived.dgName}}</h3>
            </div>
        </div>
        <div class="content flex-column  white-bg spacing-margin-top" v-if="!(full.ticketNum==0)">
            <h3 class="content-name spacing-padding-between">{{full.txt}}</h3>
            <div class="content-detail flex-row spacing-padding-between btm-wired">
                <div class="content-num num-color">{{full.price}}元/张x{{full.ticketNum}}张</div>
                <div class="total">共 <span class="warning bold">{{fullPrice}}</span> 元</div>
            </div>
           <transition name="fade" v-for="item in items['full']" :key="item.idcard" :id="item.idcard" v-if="item.idcard">
                <div class="flex-row customer-info spacing-padding-between btm-wired">
                <div class="flex-row">
                     <div class="user-name title">{{item.name||""}}</div>
                     <div class="id-card">{{item.idcard||""}}</div>
                </div>
                <div class="icon icon-delete" @click="delItem(item.idcard,'full')"></div>
            </div>
           </transition>
            <div class="flex-row content-footer info-color">
                <div @click="goAddCustomer('0')"><span class="icon icon-add add-customer"></span>新建乘客</div>
                <div @click="goUsualCustomer('0')"><span class="icon icon-contact"></span>常用联系人</div>
            </div>
        </div>  

         <div class="content flex-column  white-bg spacing-margin-top" v-if="!(half.ticketNum==0)">
            <h3 class="content-name spacing-padding-between">{{half.txt}}</h3>
            <div class="content-detail flex-row spacing-padding-between btm-wired">
                <div class="content-num num-color">{{half.price}}元/张x{{half.ticketNum}}张</div>
                <div class="total">共 <span class="warning bold">{{halfPrice}}</span> 元</div>
            </div>
         <transition name="fade" v-for="item in items['half']" :key="item.idcard" :id="item.idcard" v-if="item.idcard">
               <div class="flex-row customer-info spacing-padding-between btm-wired">
                <div class="flex-row">
                     <div class="user-name title">{{item.name||""}}</div>
                     <div class="id-card">{{item.idcard||""}}</div>
                </div>
                <div class="icon icon-delete" @click="delItem(item.idcard,'half')"></div>
            </div>
         </transition>
            <div class="flex-row content-footer info-color">
                <div @click="goAddCustomer('1')"><span class="icon icon-add add-customer"></span>新建乘客</div>
                <div @click="goUsualCustomer('1')"><span class="icon icon-contact"></span>常用联系人</div>
            </div>
        </div>  
        <h4 class="txt-align-left spacing-padding-between spacing-padding-top">订单总金额: <span class="font32 warning bold">{{(parseFloat(halfPrice)+parseFloat(fullPrice)).toFixed(2)}}</span>元</h4>
         <div class="option-list spacing-padding-between spacing-margin-top">
            <button class="btn white-color font32" @click="submitOrder()">提交订单</button>
        </div>
    </div>
</template>
<script>
import {USER_CACHE,USER_TOKEN} from '../assets/scripts/cache.js';

//import {onBridgeReady} from '../assets/scripts/WeixinJSBridge.js'

let LOOK = process.env.LOOK_API;
let BASE = process.env.BASE_API;
let key =USER_TOKEN.get();
//let WECHAT = process.env.WECHAT;

    let order = {
        name:'order',
        components:{},
        data:function(){
            return {
                orderid:'',
                orderData:{},
                full:{},
                half:{},
                code:{},
                items:{}//{id:'O1001',name:'Nancy',idcard:'330621199402230125'},{id:'O1002',name:'Steve',idcard:'330621156402230125'},{id:'O1003',name:'TIM COOK',idcard:'330621199402230127'}
            }
        },
        methods:{
            delItem(id,flag){
                let arr = USER_CACHE.get();

                for(let i=0;i<arr[flag].length;i++){
                    if(arr[flag][i].idcard==id)
                        arr[flag].splice(i,1);
                }

                 this.items = arr;
                 USER_CACHE.set(arr);

            },
            goAddCustomer(flag){
                switch(flag)
                {
                    case '1':
                        if(this.items['half'].toString()==""&&this.half.ticketNum!=0)
                        {
                            this.$router.push({name:'addcustomer',params:{id:flag}});
                        }
                        else
                        {
                            if(this.half.ticketNum<=this.items['half'].length)
                                this.$toast.center('身份证数量已达到上限');
                            else
                                this.$router.push({name:'addcustomer',params:{id:flag}});
                        }
                        break;
                    case '0':
                         if(this.items['full'].toString()==""&&this.full.ticketNum!=0)
                          {
                              this.$router.push({name:'addcustomer',params:{id:flag}});
                          }
                         else
                         {
                            //  console.log(this.full.ticketNum);
                            //  console.log(this.items['full'].length);
                            if(this.full.ticketNum<=this.items['full'].length)
                              this.$toast.center('身份证数量已达到上限');
                            else
                              this.$router.push({name:'addcustomer',params:{id:flag}});
                         }
                        break;
                }
            },
            goUsualCustomer(flag){
              switch(flag)
                {
                    case '1':
                        if(this.items['half'].toString()==""&&this.half.ticketNum!=0)
                        {
                           this.$router.push({name:'contract',params:{id:{flag,num:this.half.ticketNum}}});
                        }
                        else
                        {
                            if(this.half.ticketNum<=this.items['half'].length)
                                this.$toast.center('身份证数量已达到上限');
                            else
                            {
                                let leftNum = this.half.ticketNum-this.items['half'].length;
                                this.$router.push({name:'contract',params:{id:{flag,num:leftNum}}});
                                console.log(leftNum);
                            }
                        }
                        break;
                    case '0':
                         if(this.items['full'].toString()==""&&this.full.ticketNum!=0)
                          {
                              this.$router.push({name:'contract',params:{id:{flag,num:this.full.ticketNum}}});
                          }
                         else
                         {
                            if(this.full.ticketNum<=this.items['full'].length)
                              this.$toast.center('身份证数量已达到上限');
                            else
                              {
                                let leftNum = this.half.ticketNum-this.items['full'].length;
                                this.$router.push({name:'contract',params:{id:{flag,num:leftNum}}});
                              }
                         }
                        break;
                }
            },
            getParams(){
                 let paras = this.$route.params.dataObj;
                 let orderdata = this.$route.params.data;//首页跳转
                 let contract = this.$route.params.id;
              
               // if(paras||contract)
              //  {
                    let customer = {};

                    customer = USER_CACHE.get();
                    console.log(customer);
                    this.items = customer;
                       
                // }
                if(orderdata)
                {

                    this.orderData = orderdata;

                      if(this.orderData.ticketInfo[0].id=='01')
                            this.full = this.orderData.ticketInfo[0]

                       if(this.orderData.ticketInfo[1].id=='07')
                            this.half = this.orderData.ticketInfo[1]

                   // console.log(JSON.parse(JSON.stringify(this.orderData)));
                }
                else
                    return; 
            },
            submitOrder(){
                let _this = this;
                let that = this;
                let self = this.orderData;
                let items = JSON.parse(JSON.stringify(this.items));
                let routeNo = "";
                console.log(JSON.stringify(this.items));

               if(this.half.ticketNum!=0)
                {
                    if(JSON.stringify(this.items.half)=='[]')
                      {
                            this.$toast.center('请添加居民票身份证');
                            return
                      }
                    else
                     {
                        if(this.half.ticketNum!=this.items['half'].length)   
                           {
                                this.$toast.center('居民票身份证未添加完整');
                                return
                           }
                     }
                }

                if(this.full.ticketNum!=0)
                {
                    if(JSON.stringify(this.items.full)=='[]')
                      {
                            this.$toast.center('请添加全票身份证');
                            return;
                      }
                    else
                    {
                        if(this.full.ticketNum!=this.items['full'].length)   
                           {
                                this.$toast.center('全价票身份证未添加完整');
                                return;
                           }
                    }
                }

                let getRouteNo = function(){
                   let targetObj = {"zdid":self.flight.zdId}
                   Object.assign(targetObj,key);
                   return  that.$http({
                            method:'post',
                            url:BASE+'/pckg/getFlightRoute.do',
                            data:JSON.stringify(targetObj)
                    })
                }

                let getList = function(){
                    let full = items.full;
                    let half = items.half;

                    let list = [];

                    for(let i =0;i<full.length;i++){
                        let obj = {};
                        obj.ticketTypeNo = '01';
                        obj.certificateNo = full[i].idcard;
                        obj.certificateName = full[i].name;
                        
                        list.push(obj);
                    }

                    for(let i =0;i<half.length;i++){
                        let obj = {};
                        obj.ticketTypeNo = '07';
                        obj.certificateNo = half[i].idcard;
                        obj.certificateName = half[i].name;

                        list.push(obj);
                    }

                    return list;
                    
                }

                let formData = {
                    "startPointNo": self.departure.code,
                    "endPointNo": self.arrived.dgCode,
                    "flightNo": self.flight.hbBh,
                    "shipNo": self.flight.shipId,
                    "zdId": self.flight.zdId,
                    "flightDateStr": self.date.split(' ')[0],
                    "orderDetailList":getList()
                }
               // Object.assign(formData,key);

                getRouteNo().then(res=>{
                   formData.routeNo = res.hxbh;
                    this.$loading('订单保存中...');
                    return  that.$http({//保存订单
                                method:'post',
                                url:LOOK+"/pckgBookingTicket/saveOrder.do",
                                data:JSON.stringify(formData)
                                })
                            }).then(res=>{
                                  this.$loading.close();
                                  this.orderid = res.data;
                                if(res.code=='0')
                                {   
                                     USER_CACHE.set({full:[],half:[]});
                                     this.items = {full:[],half:[]};
                                    //this.$toast.center(res.message);
                                    return that.$http({//订单支付
                                      url:LOOK+'/pckgBookingTicket/submitWechatOrder.do?orderNo='+res.data,
                                    })
                                }
                                else
                                 {
                                    // this.$toast.center(res.message);
                                     return Promise.reject({
                                         notExpectionBreak:true,
                                         value:res.message
                                     })
                                 }
                            }).then(rs=>{
                                 console.log(rs);
                                 if(rs.code=='0')
                                 {
                                   let data = JSON.parse(rs.data);

                                   pay();

                                   function pay(){
                                     if (typeof WeixinJSBridge == "undefined"){
                                        if( document.addEventListener ){
                                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                        }else if (document.attachEvent){
                                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                        }
                                    }else
                                    {
                                        onBridgeReady();
                                    }
                                  }

                                   function onBridgeReady(){
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId":data.appId,     //公众号名称，由商户传入     
                                            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
                                            "nonceStr":data.nonceStr, //随机串     
                                            "package":data.prepayId,     
                                            "signType":data.signType,  //微信签名方式     
                                            "paySign":data.paySign //微信签名 
                                        },
                                        function(res){    
                                            //alert(JSON.stringify(res));
                                            if(res.err_msg == "get_brand_wcpay_request:ok")
                                            {
                                                _this.$router.push({name:"message",params:{code:0,orderid:_this.orderid}});
                                            }
                                            else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                                 _this.$router.push({name:"message",params:{code:1}});
                                            }else
                                            {
                                                alert("订单取消");
                                            }
                                               // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                                        }); 
                                    }

                                  }
                                  else
                                  {
                                    return Promise.reject({
                                            payError:true,
                                            value:rs.message
                                        });
                                    }
                                })
                            .catch(error=>{//异常处理
                               if(error.notExpectionBreak)
                                    that.$toast.center(error.value);
                               else if(error.payError)
                                     this.$toast.center(error.value);
                                else
                                    that.$toast.center('系统异常，请重试');
                              });
            }
        },
        watch:{
            '$route':'getParams'
        },
        mounted() {
            let customer = [];
            customer = USER_CACHE.get();
            if(!customer)
                this.items = {full:[],half:[]};
           else
                this.items = customer;

            if(!this.$route.params.data)
            {
                 this.$router.push({name:'index'});
            }
           else
           {
               this.orderData = this.$route.params.data;

              if(this.orderData.ticketInfo[0].id=='01')
                    this.full = this.orderData.ticketInfo[0]

              if(this.orderData.ticketInfo[1].id=='07')
                    this.half = this.orderData.ticketInfo[1]

               console.log(JSON.parse(JSON.stringify(this.orderData)));
           }
        },
        computed:{
            fullPrice:function(){
               return (parseFloat(this.full.price)*parseInt(this.full.ticketNum)).toFixed(2);
            },
            halfPrice:function(){
                return (parseFloat(this.half.price)*parseInt(this.half.ticketNum)).toFixed(2);
            }
        },
        beforeCreate:function(){
            let item = USER_CACHE.get(); 
            if(!item)
            {
                USER_CACHE.set({full:[],half:[]});
            }
        }
    }    

    export default(order);
</script>
<style lang='less' scoped>
    @import '../assets/style/index.less';

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        }

    .header{
        background: @info-color;
        color: @white-color;
    }
    .icon{
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
    }
    .icon-add{
        background: url(../assets/images/add.png) no-repeat;
        background-size: 0.4rem;
    }
    .icon-contact{
        background: url(../assets/images/user.png) no-repeat;
        background-size: 0.4rem;
    }
    .icon-delete{
        background:url(../assets/images/delete.png) no-repeat;
         background-size: 0.4rem;
    }
    .time-flight{
       width: 80%;
       height: 0.8rem;
       align-items: center;
       .date{
           border-right: 2px solid #fff;
           box-sizing: border-box;
       }
    }
    .departure-terminal{
        height: 1rem;
        align-items: center;
    }
    .content-detail{
        justify-content: space-between;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .content-footer{
        width: 100%;
        justify-content: space-around;
        height: 1rem;
        line-height: 0.8rem;
        padding:0.1rem 0rem;
        & div{
            width: 50%;
            border-right: 1px solid #cccccc;
            &:last-child{
                border: none;
            }
        }
    }
    .content-name{
        text-align: left;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .content-num{
        letter-spacing: 0.1rem;
    }
   .customer-info{
       height: 0.8rem;
       align-items: center;
       justify-content: space-between;
   }
   .id-card {
       padding-left: 0.3rem;
   }
</style>

