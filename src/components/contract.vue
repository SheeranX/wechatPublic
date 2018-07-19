<template>
    <div>
        <div class="flex-column">
            <div @click="selectItem(item.certificateNo,idx)" class="flex-row white-bg spacing-padding-between item font28 btm-wired" v-for="(item,idx) in items" :key="idx">
                <input type="checkbox" class="item-checkbox" :id="idx" v-model="item.picked">
                <label class="item-check" :class="item.picked?'checked':''" :for="idx"></label>
                <label :for="idx" class="item-name">{{item.certificateName}}</label>
                <label :for="idx" class="item.certificateNo">{{item.certificateNo}}</label>
            </div>
            <div v-if="hasContract">
                无常用联系人
            </div>
            <div class="spacing-margin-top">
                <button class="btn white-color font28" @click="submitData">{{hasContract?"返回":"确定"}}</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../assets/style/index.less';

    .item{
        justify-content: space-around;
        height: 1rem;
        align-items: center;
    }
    .item-check{
        width: 0.30rem;
        height: 0.30rem;
        background: url(../assets/images/unchecked.png) no-repeat;
        background-size: 0.3rem
    }
    .item-checkbox{
       display: none;
    }
    .checked{
        background: url(../assets/images/checked.png) no-repeat;
        background-size: 0.3rem
    }
    .item-name{
        width: 1.5rem;
    }
</style>
<script>
import {USER_CACHE} from '../assets/scripts/cache.js';

const LOOK = process.env.LOOK_API;

    let contract = {
        name:'contract',
        data:function(){
            return {
                items:[],
                checkItem:[],
                index:"",
                flag:'',
                num:'',
                hasContract:true
                }
            },
        methods:{
            selectItem(id,idx){
                this.index = idx;
            },
            submitData(){
                if(this.hasContract)
                 {
                      this.$router.go(-1);
                      return;
                 }  

                let userData = USER_CACHE.get();
                let arr = [];
                let flag = true;
                for(let i=0;i<this.items.length;i++){
                   if(this.items[i].picked)
                   {
                       arr.push(this.items[i]);//获取所选身份证
                   }
                }
                    console.log(JSON.stringify(arr));
                if(arr.length<1)
                {
                    this.$toast.center('请选择联系人');
                    return
                }
                if(arr.length>this.num)
                {
                     this.$toast.center('身份证数量已达到上限，请重新添加');
                     console.log(JSON.stringify(this.num));
                     return;
                }
                else
                {
                    let id = this.flag=='0'?"full":"half";
                    let temp = arr;
                    for(let j = 0;j<temp.length;j++)
                    {
                      //  debugger;
                    //   if(arr[j]['certificateNo']==undefined)
                    //     break;

                     for(let i =0;i<userData[id].length;i++){
                        if(userData[id][i].idcard==temp[j].certificateNo)
                          {
                            this.$toast.center('身份证已存在');
                            arr.splice(j,1);
                            flag = false;
                          }
                        // else
                        // {   
                        //     let obj = {};
                        //     obj.id = arr[i].certificateNo;
                        //     obj.name = arr[i].certificateName;
                        //     userData[id].push(obj);
                        // }
                     }
                    }

                    for(let k =0;k<arr.length;k++){
                            let obj = {};

                            obj.idcard = arr[k].certificateNo;
                            obj.name = arr[k].certificateName;

                            userData[id].push(obj);
                            flag = true;
                    }

                   if(flag)
                   {
                         USER_CACHE.set(userData);
                         this.$router.go(-1);
                   }
                }
            },
        },
        mounted() {
            this.$loading("数据加载中");
            this.$http({
                 url:LOOK+'/pckgBookingTicket/queryFrequentContacts.do'
            }).then(res=>{
               this.items =JSON.parse(res.data);
               if(!(this.items.toString()==""))
                {
                     this.hasContract = false;
                     console.log(this.items.toString());
                }
                    this.flag = this.$route.params.id.flag;
                    this.num = this.$route.params.id.num;

               this.$loading.close();
            }).catch(error=>{
                console.log(error);
                this.$loading.close();
            });
             console.log(this.num);
        }
    }

    export default contract
</script>

