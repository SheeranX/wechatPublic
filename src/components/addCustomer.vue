<template>
    <div class="add-customer flex-column">
      <div class="white-bg">
            <div class="flex-row flex-center spacing-padding-between spacing-padding-top btm-wired spacing-padding-btm">   
            <div class="w2 txt-align-left">姓名</div>
            <div class="w8 txt-align-left">
                <input type="text" class="h" placeholder="请输入乘客姓名" maxlength="10" v-model="cardInfo.name">
            </div>
        </div>
        <div class="flex-row flex-center spacing-padding-between spacing-padding-top spacing-padding-btm">   
            <div class="w2 txt-align-left">身份证号</div>
            <div class="w8 txt-align-left">
                <input type="text" class="h" placeholder="请输入证件号码" maxlength='18' v-model="cardInfo.idcard">
            </div>
        </div>
      </div>
         <div class="spacing-padding-top">
           <button class="btn white-color font32" @click="submit">确定</button>
        </div>
    </div>
</template>
<script>
import {USER_CACHE} from '../assets/scripts/cache.js';

    let addcustomer={
        name:"addcustomer",
        data:function(){
            return {
                cardInfo:{name:'',idcard:''},
                flag :''
            }
        },
        methods:{
            submit(){

                let localArr =  {};
                let cardInfo = this.cardInfo;
                let flag = this.flag;
                
              
                
                if(!this.isEmpty(cardInfo.idcard)||!this.isEmpty(cardInfo.name))
                {
                    this.$toast.center('输入内容不能为空');
                    return;
                }
                if(!this.isNumber(cardInfo.idcard))
                {
                    this.$toast.center('身份证格式不正确');
                    return;
                }

                localArr = USER_CACHE.get();

                if(!localArr.flag)
                {
                   // localArr = {full:[],half:[]};
                    localArr[flag].push(cardInfo);
                    USER_CACHE.set(localArr);
                }
               else
               {
                    for(let i = 0;i<localArr[flag].length;i++){
                    if(localArr[flag][i].idcard==this.cardInfo.idcard)
                    {
                           
                        this.$toast.center('该证件已存在');
                        return
                    } 
                }
               
                localArr[flag].push(cardInfo);

                USER_CACHE.set(localArr);
               }

                // this.$router.push({
                //     name:'order',
                //     params:{
                //         dataObj:this.cardInfo
                //     }
                // })
                this.$router.go(-1);
            },
            isEmpty(para){
                if(para.trim().length==0)
                    return false
                else
                    return true
            },
            isNumber(para){
               var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
               if(reg.test(para) === false)
                {
                    return  false;
                }
                else
                {
                    return true;
                }

            }
        },
        mounted() {
            let flag = this.$route.params.id;
          

            if(flag=='0')
                this.flag = 'full';
            else
                this.flag = 'half';
        },
    }

    export default(addcustomer);
</script>
<style lang='less' scoped>
 @import '../assets/style/index.less';

 .h{
     height: 0.6rem;
 }
.w8{
    width: 80%;
}
.w2{
    width: 20%;
}
.flex-center{
    align-items: center;
}
input{
    border: none;
    outline: none;
    width: 100%;
}
input::-webkit-input-placeholder{
    color: #c8c8cc;
}
</style>
