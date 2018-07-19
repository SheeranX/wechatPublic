<template>
    <div class="modal" v-if="isFlightHide">
        <div class="modal-panel white-bg spacing-padding-between">
            <div class="modal-title flex-row btm-wired">
                <div>{{title}}</div>
                <div class="warning" @click="close()">取消</div>
            </div>
            <div class="flex-row num-color modal-content-item item-title">
                <div>开航时间</div>
                <div>船舶名称</div>
            </div>
            <div class="modal-content num-color">
                <div class="modal-content-item flex-row" v-for="(item,index) in items" @click="check(item,index)" :class="index==idx?'info-color':''">
                    <div>{{item.hbTime}}</div>
                    <div>{{item.name}}</div>
                </div>
                <div class="modal-content-item flex-row" v-if="items.toString()==''">
                    <p>该线路暂时没有航班</p>
                </div>
            </div>
        </div>
        <div class="modal-bg" @click="close()"></div>
    </div>
</template>
<script>
    export default({
        name:'flightModal',
        data:function(){
            return{
                idx:null,
                animation:"",
                selectItem:{},
                isFlightHide:this.isFlightShow
            }
        },
        methods:{
            close(){
                this.isFlightHide = false;
            },
            check(item,index){
                var self = this;
                self.selectItem =item;
                self.idx = index;
                self.animation = 'modal-animation-out';

                self.$emit('sendFlightID',self.selectItem);
                self.isFlightHide = false;
            }
        },
        props:['items','isFlightShow','title'],
        watch:{
            isFlightShow(val){
                this.isFlightHide = val;
            },
            isFlightHide(val){
                this.$emit('on-flight-change',val);
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
    z-index:998;
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
.item-title{
    justify-content: space-around;
}
.modal-content{
    max-height: 6rem;
    overflow-y: scroll;
}
.modal-content-item{
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid @wire-color;
    justify-content: space-around;
    &:last-child{
        border-bottom: none;
    }
}

</style>
