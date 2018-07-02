<template>
       <div class="nav-bar flex-row white-bg">
             <div class="nav-item" v-for="(item,index) in navitem" :key='item.id' :id="item.id" @click="toPage(item.value,index)"><span class="nav-icon" v-bind:class="checked==index?(item.class+'-hover'):(item.class)"></span><span class="font24" v-bind:class="checked==index?'info-color':''">{{item.txt}}</span></div>
        </div>
</template>
<script>
    export default({
        name:'navbar',
        data:function(){
            return {
                navitem:[{id:'1001',txt:'首页',class:'home-icon',value:'index'},{id:'1002',txt:'我的',class:'mine-icon',value:'mine'}],
                checked:0
            }
        },
        methods:{
            toPage(name,idx){
               this.checked = idx;
               this.$router.push({name:name});
            }
        }
    })
</script>
<style lang="less" scoped>
@import '../assets/style/index.less';
.nav-bar{
    justify-content: space-around;
    padding: 0.1rem 0;
    position: fixed;
    bottom: 0;
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.05);
    width: 100%;
}
.nav-icon{
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 auto;
}
.nav-item{
    width: 3.75rem;
    border-right: 2px solid #efefef;
    box-sizing: border-box;
    &:last-child{
        border-right: none;
    }
}
.home-icon{
    background: url(../assets/images/icon-home.png);
    background-size: 0.5rem;
}
.home-icon-hover{
     background: url(../assets/images/icon-home-hover.png);
     background-size: 0.5rem;
}
.mine-icon{
    background: url(../assets/images/icon-user.png);
    background-size: 0.5rem;
}
.mine-icon-hover{
     background: url(../assets/images/icon-user-hover.png);
     background-size: 0.5rem;
}

</style>

