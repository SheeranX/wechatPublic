<template>
    <div class="remid-panel flex-column" @click="close" v-if="show">
      <div class="panel">
        <div class="remind-title white-bg h btm-wired"><h4>购买须知</h4><span class="icon ic0n-remind"></span></div>
        <div class="remind-content white-bg spacing-padding-between txt-align-left" v-html="data">
         </div>
    </div>
    </div>
</template>
<style lang='less' scoped>
@import '../assets/style/index.less';

.remid-panel{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
}
.panel{
    position: fixed;
    width: 100%;
    bottom: 0;
}
.h{
    height: 1rem;
    line-height: 1rem;
}
.remind-item{
    padding: 0.2rem;
}
.remind-item p{
    height: 0.6rem;
}
.remind-item h4{
    height: 0.5rem;
}
.icon{
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
    position: absolute;
    background:url(../assets/images/close.png) no-repeat;
    background-size: 0.3rem;
    background-position-y:0.1rem;
    right: 0.4rem;
    margin-top: -0.8rem;
}
.remind-content /deep/ p{
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    box-sizing: border-box;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
<script>
const LOOK = process.env.LOOK_API;
    let remind = {
        name:'remind',
        data:function(){
            return {
                show:this.isShow,
                data:''
            }
        },
        methods:{
            close:function(){
                this.show = !this.show;
            }
        },
        props:['isShow'],
        watch:{
            isShow(val){
                this.show = val;
            },
            show(val){
                this.$emit('on-remind-change',val);
            }
        },
        mounted() {
            this.$http({
                url:LOOK+'/pckgBookingTicket/queryDocumentContent.do'
            }).then(res=>{
                 let d = JSON.parse(res.data);
                 this.data = d[0].docContent;
                 console.log(d);
            });
        },
    }

    export default(remind);
</script>

