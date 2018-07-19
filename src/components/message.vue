<template>
    <div class="message">
        <img :src="flag?success.img:error.img" alt="pay success">
        <p class="font32 bold spacing-margin-top">{{flag?success.msg:error.msg}}</p>
        <p class="spacing-margin-top">{{flag?'订单号:'+orderid:""}}</p>

        <button class="checkOrderDetails white-color spacing-margin-top" @click="goDetails">{{flag?success.btn:error.btn}}</button>
    </div>
</template>
<style lang='less' scoped>
@import '../assets/style/index.less';
.message{
    padding-top: 1.9rem;
}
.message img{
    width: 1.2rem;
} 
.checkOrderDetails{
    width: 2.8rem;
    height: 0.8rem;
    border: none;
    outline: none;
    background: @info-color;
    border-radius: 0.04rem;
}
</style>
<script>
    var message = {
        name:'message',
        data:function(){
            return {
                success:{msg:'恭喜您，支付成功!',btn:'查看订单详情',img:require('../assets/images/success.png')},
                error:{msg:'抱歉,支付失败!',btn:'返回订单',img:require('../assets/images/wrong.png')},
                flag:true,
                orderid:'330215411232554120',
                flag :true
            }
        },
        methods:{
            goDetails(){
                 if(this.flag)
                    this.$router.push({name:'mine'});
                 else
                    this.$router.push({name:'order'});
            }
        },
        mounted() {
            let code = parseInt(this.$route.params.code);

            this.orderid = this.$route.params.orderid;
            
            if(code=='1')
            {
                this.flag = false;
            }
            else if(code=='0')
            {
                this.flag = true;
            }
            else{
                this.$router.push({name:"index"});
            }
        },
    }

    export default(message);

</script>

