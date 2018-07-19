<template>
    <div class="modal" v-if="isHide">
        <div class="modal-panel white-bg spacing-padding-between">
            <div class="modal-title flex-row btm-wired">
                <div>{{title}}</div>
                <div class="warning" @click="close()">取消</div>
            </div>
            <div class="modal-content flex-column num-color">
                <div class="modal-content-item" v-for="(item,index) in items" :key="item.dgCode" @click="check(item,index)" :class="index==idx?'info-color':''">{{item.dgName}}</div>
            </div>
        </div>
        <div class="modal-bg" @click="close()"></div>
    </div>
</template>
<script>
    export default({
        name:'modal',
        data:function(){
            return{
                idx:null,
                animation:"",
                selectItem:{},
                isHide:this.isShow
            }
        },
        methods:{
            close(){
                this.isHide = false;
            },
            check(item,index){
                var self = this;
                self.selectItem =item;
                self.idx = index;
                self.animation = 'modal-animation-out';

                self.$emit('sendID',self.selectItem);
                self.isHide = false;
                // setTimeout(function(){
                //      self.isHide = false;
                // },500);
            }
        },
        props:['items','isShow','title'],
        watch:{
            isShow(val){
                this.isHide = val;
            },
            isHide(val){
                this.$emit('on-flag-change',val);
            }
        }
    });
</script>
<style lang="less" scoped>
@import '../assets/style/index.less';

@keyframes modalIn
{
    from { transform: translateY(150%);}
    to {transform: translateY(0%);}
}

@keyframes modalOut {
     from { transform: translateY(0%);}
    to {transform: translateY(150%);}
}
.modal-title{
    justify-content: space-between;
    height: 0.8rem;
    align-items: center;
}
.modal-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    top: 0;
    bottom: 0;
    left: 0;
}

.modal-panel{
    position: fixed;
    z-index: 999;
    width: 100%;
    right: 0;
    left: 0;
    box-sizing: border-box;
    bottom: 0;
}
.modal-content{
    max-height: 6rem;
    overflow-y: scroll;   
}
.modal-content-item{
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid @wire-color;
    &:last-child{
        border-bottom: none;
    }
}

</style>
