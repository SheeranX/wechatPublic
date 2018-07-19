<template>
    <div class="container flex-column bg-color">
        <div class="flex-content logo white-bg">
            <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="option-list spacing-padding-between white-bg spacing-padding-top">
            <div class="flex-row option-item btm-wired"  @click="isShowdatePicker=!isShowdatePicker" v-on:picked="picked">
                <div class="option-title font28">出发日期:</div>
                <div class="option-detail flex-row">
                    <span class="info-color">{{date}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
             <div class="flex-row option-item btm-wired" @click="showModal('出发港')">
                <div class="option-title font28">出&nbsp; 发&nbsp; 港:</div>
                <div class="option-detail flex-row">
                    <span class="num-color" :class="departure.text?'info-color':''">{{departure.text||'请选择'}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
             <div class="flex-row option-item btm-wired" @click="showModal('到达港')">
                <div class="option-title font28">到&nbsp; 达&nbsp; 港:</div>
                <div class="option-detail flex-row">
                    <span class="num-color" :class="arrived.dgName?'info-color':''">{{arrived.dgName||'请选择'}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
              <div class="flex-row option-item btm-wired" @click="showModal('航班')">
                <div class="option-title font28">航&emsp;&emsp;班:</div>
                <div class="option-detail flex-row">
                    <span class="num-color" :class="flight.shipId?'info-color':''">{{flight.name||'请选择'}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
        </div>
        <div class="option-list spacing-padding-between white-bg spacing-margin-updown">
             <div class="flex-row option-item btm-wired" v-for="(item,idx) in priceItem" :key="item.id">
                <div class="option-title font28">{{item.txt}}:&emsp;<span class="num-color">{{item.price}} 元 / 张</span></div>
                <!-- <quantity  v-model='item.ticketNum' v-on:plus="plus"></quantity> -->
                  <div class="option-detail flex-row">
                    <span class="numbtn minus" @click="minus(idx)">-</span><input type="text" class="quantity" maxlength="2" v-model="item.ticketNum" @input="enterVal(idx)"><span class="numbtn plus" @click="plus(idx)">+</span>
                  </div>
            </div>
            <div class="flex-row option-item btm-wired">
                 <div class="option-title font28">合计:&emsp;</div>
                  <div class="option-detail flex-row warning" v-if="priceItem[0].price=='--'||priceItem[1].price=='--'?false:true">
                      <span class="single-price bold font28">{{priceItem[0].price}}</span><span class="sign">*</span><span class="single-num bold font28">{{priceItem[0].ticketNum}}</span>
                      <span>+</span>
                      <span class="single-price bold font28">{{priceItem[1].price}}</span><span class="sign">*</span><span class="single-num bold font28">{{priceItem[1].ticketNum}}</span>
                      <span>=</span>
                      <span class="total bold font32">{{total||0}}</span>
                  </div>
            </div>
        </div>
         <!-- <btnsubmit txt="立即购买" pageName='order' :isAllow="isChecked" :paraData="orderData"></btnsubmit> -->
       <div class="spacing-padding-between spacing-margin-top">
             <button class="btn white-color font28" @click="toPage">立即购买</button>
       </div>
         <div class="option-list spacing-padding-between spacing-margin-top">
            <span class="font24" :class="isChecked?'agree':'disagree'" @click="getAgree">我已阅读并同意</span><span class="info-color font24" @click="purchase">《购买须知》</span><span class="font24">中的条款</span>
        </div>
        <modal v-on:sendID="getID" v-bind:items="itemData" v-bind:isShow="isShowModal" v-on:on-flag-change="syncFlag" v-bind:title="modalTitle"></modal>
        <flights v-on:sendFlightID="getFlightID" v-bind:items="itemFlight" v-bind:isFlightShow="isShowFlightModal" v-on:on-flight-change="syncFlightFlag" v-bind:title="modalTitle"></flights>
        <departure  v-on:sendDepartureID="getDepartureID" v-bind:items="itemDeparture" v-bind:isdepartureShow="isDeparture" v-on:on-departure-change="syncDepartureFlag" v-bind:title="modalTitle"></departure>
        <div class="date">
           <datepicker v-on:picked="picked" :show='isShowdatePicker'  @on-show-change="showChange"></datepicker>
        </div>
        <remind :isShow='remindInfo' v-on:on-remind-change="remindModal"></remind>
    </div>
</template>
<script>
import modal from './modal.vue';
import datepicker from './datepicker';
import remind from './remindInfo';
import flights from './flight';
import departure from './departure';
import {USER_TOKEN} from '../assets/scripts/cache.js';

import qs from 'qs';

const LOOK = process.env.LOOK_API;
const BASE = process.env.BASE_API;
let key = USER_TOKEN.get();
//const WECHAT = process.env.WECHAT;
console.log(USER_TOKEN.get());
export default{
        name:'index',
        components:{modal,datepicker,remind,flights,departure},
        data:function(){
            return {
               departure :{},
               arrived:{},
               flight:{},
               modalTitle:'',
               isShowModal:false,
               isShowFlightModal:false,
               isDeparture:false,
               itemData:[],
               itemFlight:[],
               itemDeparture:[],
               isShowdatePicker:false,
               date:'',
               isChecked:true,
               priceItem:[{id:"p001",price:'--',txt:'全价票',ticketNum:0},{id:"p002",price:'--',txt:'居民票',ticketNum:0}],
               total:0,
               remindInfo:false,
               orderData:{},
               maxTicketNum:""
            }
        },
        methods:{
            getID:function(data){
               // this.local = data;
                if(data.dgCode!=""&&data.dgCode!=undefined)
                {
                    this.arrived = data;
                }
            },
            getFlightID:function(data){
                this.flight = data;
                var s = [];
                for(let i =0;i<JSON.parse(JSON.stringify(this.priceItem)).length;i++){
                    s.push(JSON.parse(JSON.stringify(this.priceItem))[i].id);
                }

                let targetObj = {
                        "shipId":data.shipId,
                        "zdId":data.zdId,
                        "pjlx":s.toString(),
                }

                Object.assign(targetObj,key);

                this.$http({
                    method:'post',
                    url:BASE+'/pckg/getTicketPrice.do',
                    data:JSON.stringify(targetObj)
                }).then(res=>{
                    if(res.code!='0')
                    {
                       return Promise.reject({
                           notRealPromiseException:true,
                           message:res.message
                       });

                    }
                    for(let i = 0;i<res.ticketPriceList.length;i++){
                        this.priceItem[i].price = res.ticketPriceList[i].pjTotal;
                    }
                     let total = 0;
                    for(let i = 0;i<this.priceItem.length;i++){
                        total+= parseFloat(this.priceItem[i].price)*parseInt(this.priceItem[i].ticketNum);
                        };
                    this.total = total.toFixed(2);
                    console.log(res);
                }).catch(error=>{
                     if(error.notRealPromiseException)
                       this.$toast.center(error.message);
                     else
                       this.$toast.center('网络开了点小差');
                });
                console.log(data);
            },
            getDepartureID:function(data){
                  this.departure = data;
                  console.log(data);
            },
            showModal(val){
                 let self = this;
                if(val=='到达港')
                 {
                     this.flight = {};
                    if(!this.departure.text)
                    {
                         this.$toast.center('请先选择出发港');
                         return;
                    }
                    this.$loading('数据加载中...');
                    this.$http({
                        method:'post',
                        url:BASE+'/pckg/getPortOfArrival.do',
                        data:JSON.stringify(key)
                }).then(response=>{
                    console.log(response);
                    this.$loading.close();
                    this.isShowModal = true;
                    this.modalTitle = val;
                    this.itemData = response.portOfArrivalList;
                }).catch(error=>{
                     this.$loading.close();
                });
                 }
                else if(val=='出发港')
                {
                        this.flight = {};
                        this.arrived = {};
                        this.$loading('数据加载中...');
                        this.$http({
                        method:'get',
                        url:LOOK+'/pckgBookingTicket/getStartPort.do'
                    }).then(res=>{
                        this.isDeparture = !this.isDeparture;
                        this.modalTitle = val;
                        this.itemDeparture = JSON.parse(res.data);
                        this.$loading.close();
                        console.log(res);
                    }).catch(res=>{
                          alert(res);
                          this.$loading.close();
                    });
                }
                else if(val=="航班")
                {
                    if(!this.arrived.dgName)
                    {
                         this.$toast.center('请先选择到达港');
                         return;
                    }
                    this.$loading('数据加载中...');
                    let targetObj = {
                          "hbRq":this.date.split(' ')[0],
                          "ddCode":this.arrived.dgCode,
                    }
                    Object.assign(targetObj,key);
                    this.$http({
                        method:'post',
                        url:BASE+'/pckg/getFlightInfo.do', 
                        data:JSON.stringify(targetObj)
                    }).then(res=>{
                        var self = this;
                        this.modalTitle = val;
                        this.isShowFlightModal =!this.isShowFlightModal;
                        this.itemFlight=res.flightInfoList;
                      
                        console.log(res);
                        this.$loading.close();
                    })
                }
            },
            syncFlag(val){
                this.isShowModal = val;
            },
            syncFlightFlag(val){
                this.isShowFlightModal = val;        
            },
            syncDepartureFlag(val){
                this.isDeparture = val;
            },
           	picked(val) {        
                let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                    if (!val) {
                        return ''
                    }
                    let d = `${val.year}-${val.month}-${val.date}`.replace(/\d+/g, (a) => {
                        return (a.length === 4) ? a : ((a.length === 2) ? a : ('0' + a))
                    });
                    let myDate = new Date(Date.parse(d.replace(/-/g, "/")));
                    let t = new Date();
                    let today = t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
                    
                    if(Date.parse(d)<Date.parse(today))
                    {
                        this.$toast.center('日期不能小于当前日期,请重新选择');
                        return;
                    }

                    this.departure={};
                    this.arrived={};
                    this.flight={}

                    this.date =d +" "+ weekDay[myDate.getDay()];                
            },
            showChange(val){
                this.isShowdatePicker = val;
            },
            getAgree(){
                this.isChecked = !this.isChecked
            },
            calTotal(){
                //this.ticketNum = val;
                let total = 0;
                for(let i = 0;i<this.priceItem.length;i++){
                  total+= parseFloat(this.priceItem[i].price)*parseInt(this.priceItem[i].ticketNum);
                };
                this.total = total.toFixed(2);
            },

            minus(idx){
               this.priceItem[idx].ticketNum<1?this.priceItem[idx].ticketNum==1:this.priceItem[idx].ticketNum--;
               this.calTotal();
            },
            plus(idx){
                let ticketNum = this.priceItem[0].ticketNum+this.priceItem[1].ticketNum;
                if(ticketNum>=this.maxTicketNum)
                {
                    this.$toast.center('超出最大购票数量');
                    return;
                }
                this.priceItem[idx].ticketNum++;
                this.calTotal();
            },
            enterVal(idx){
                if(isNaN(this.priceItem[idx].ticketNum))
                    this.priceItem[idx].ticketNum = 0;
            },
            purchase(){
                 this.remindInfo=!this.remindInfo;
            },
            remindModal(val){
                this.remindInfo = val;
            },
            toPage(){
                //let flag = false;
                if(!this.isChecked)
                {
                    this.$toast.center('未同意条款，无法购买');
                    return;
                }

                if(JSON.stringify(this.flight)=="{}"||JSON.stringify(this.arrived)=="{}"||JSON.stringify(this.departure)=="{}")
                {
                    this.$toast.center('购票信息选择不完整');
                    return;
                }

                if(parseInt(this.total)==0)
                {
                    this.$toast.center('请先选择购票数量');
                    return;
                }

                let self = this;

                let data = {
                    date:self.date,
                    departure:self.departure,
                    flight:self.flight,
                    arrived:self.arrived,
                    ticketInfo:self.priceItem
                }
                let hxbh = "";

                let promise = ()=>{
                    let targetObj = { "zdid":self.flight.zdId}
                    Object.assign(targetObj,key);
                    //Object.assign();
                     return self.$http({
                        method:'post',
                        url:BASE+'/pckg/getFlightRoute.do',
                        data:JSON.stringify(targetObj)
                    })
                }

                let flightStroage = {
                    "hbBh":self.flight.hbBh,
                    "hbRq":self.flight.hbRq,
                    "hbTime":self.flight.hbTime,
                    "shipId":self.flight.shipId,
                    "zdId":self.flight.zdId,
                }
                Object.assign(flightStroage,key);

                promise().then(res=>{
                    hxbh = res.hxbh;
                    flightStroage.hxbh = hxbh;


                   return  self.$http({
                        method:'post',
                        url:BASE+'/pckg/getFlightStock.do',
                        data:JSON.stringify(flightStroage)
                    })

                }).then(res=>{
                    console.log(res);

                    let left =parseInt(res.wskp);
                    let booked = parseInt(res.wyskp);
                   
                    let self = this;

                    let num = function(){
                        let arr = self.priceItem;
                        let sum = 0;
                        for(let i =0;i<arr.length;i++){
                            sum+=arr[i].ticketNum;
                        }   
                        return sum;
                    }
                    console.log(num()+left.toString()+booked.toString());
                     if((left-booked-num())>0)
                    {
                            this.$router.push({name:'order',params:{data}});
                        }
                        else
                        {
                            this.$toast.center("余票不足,请选择其他航班");
                            return
                        }
                });  
            }
        },
        mounted() {
            this.$loading("数据加载中");
            this.$http({
                method:'get',
                url:LOOK+'/pckgBookingTicket/getTicketInfo.do'
            }).then(res=>{
                this.$loading.close();
                const resData = JSON.parse(res.data);
                for(let i =0;i<JSON.parse(res.data).length;i++){
                    this.priceItem[i].id = resData[i].code;
                    this.priceItem[i].txt = resData[i].text;
                    this.priceItem[i].price = resData[i].price||'--';
                    this.priceItem[i].ticketNum = resData[i].ticketNum||0;
                }

                this.$http({
                        method:'GET',
                        url:LOOK+'/pckgBookingTicket/getMaxTicketCount.do'
                        }).then(res=>{
                            if(res.code=="0")
                            {
                                this.maxTicketNum = parseInt(res.data);
                            }
                            else
                            {
                                this.$toast.center(res.message);
                            }
                        });
            }).catch(error=>{
                console.log(error);
            });
        },
        beforeCreate:function(){
            
         }
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
.agree::before{
    content: '';
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    left: 16%;
    background:url(../assets/images/checked.png) no-repeat;
    background-size: 0.3rem;
    z-index: 99;
}
.disagree::before{
     background:url(../assets/images/unchecked.png) no-repeat;
   content: '';
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    left: 16%;
    background-size: 0.3rem;
     z-index: 99;
}
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

