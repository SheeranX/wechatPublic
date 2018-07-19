<template>
    <div class="">
        <tab @on-result-pending="resultPending"></tab>
        <orderdetail :resultData="result"></orderdetail>
    </div>
</template>
<script>
import tab from './tab.vue';
import orderdetail from './orderdetail.vue';

const LOOK = process.env.LOOK_API;

    export default({
        name:'mine',
        data:function(){
            return {
                tab:"",
                result:[]
            }
        },
        methods:{
            resultPending:function(val){
               this.result = val;
               //console.log(JSON.stringify(val));
            }
        },
        components:{tab,orderdetail},
         mounted() {
              this.$loading('数据加载中...');
              this.$http({
                    method:'post',
                    url:LOOK+'/pckgBookingTicket/queryOrder.do',
                    data:JSON.stringify({
                            "orderType":"0"//默认待出行
                        })
                     }).then(res=>{
                        this.result =JSON.parse(res.data);
                        this.$toast.close();
                     }).catch(error=>{
                        console.log('error');
                        this.$loading.close();
                    });       
        },
    })
</script>
<style>

</style>

