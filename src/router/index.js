import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import index from '../components/index.vue'
import mine from '../components/personnel.vue'
import order from '../components/order.vue'
import message from '../components/message.vue'
import addcustomer from '../components/addCustomer.vue'
import contract from '../components/contract.vue'
import crypto from 'crypto'
import {formatDateToString,formateDateAndTimeToString} from '../assets/scripts/format'

import {USER_TOKEN} from '../assets/scripts/cache.js';

const LOOK = process.env.LOOK_API;

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  //base:'/BASE/',
  routes: [
    {
      path:'/',
      component:index,
      name:'index',
      meta: {
        keepAlive: true, // 需要被缓存,
        requireAuth:true //需要登录校验
      },
    },
    {
      path:'/personnel',
      component:mine,
      name:'mine',
      meta: {
        keepAlive: false,
        requireAuth:true// 不需要被缓存
        }
    },
    {
      path:'/order',
      component:order,
      name:'order',
      meta: {
        keepAlive: true ,
        requireAuth:true// 需要被缓存
        }
    },
    {
      path:'/message',
      component:message,
      name:'message',
      meta: {
        keepAlive: false,
        requireAuth:true // 不需要被缓存
        }
    },
    {
      path:'/addcustomer',
      component:addcustomer,
      name:'addcustomer',
      meta: {
        keepAlive: false ,// 不需要被缓存
        requireAuth:true //需要登录校验
        }
    },
    {
      path:'/contract',
      component:contract,
      name:'contract',
      meta: {
        keepAlive: false ,// 不需要被缓存
        requireAuth:true //需要登录校验
        }
    }
  ]
})

//路由钩子， 判断用户登陆状态

router.beforeEach((to,from,next)=>{
  //alert('进入路由拦截');
  if(to.matched.some(res=>res.meta.requireAuth))//需要登陆校验
  { 
      //alert("进入登陆校验");

      axios({
        url:LOOK+'/pckgBookingTicket/getLoginUser.do'
      }).then(res=>{
       // alert(res);
        if(res.code!='-1') 
        {
        // alert("用户一登陆");
          next();
        }
        else
        {   
         // alert("进入获取code");
            let getUrlParam = (name)=>{//获取code
              var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
              var r = window.location.search.substr(1).match(reg);
              if (r != null) return unescape(r[2]);
              return null;
            }
    
            let code = getUrlParam('code');
    
            if(!code)
            {
              let _url = window.location.href.split('#')[0];//获取URL
            // alert("开始调用微信");

              axios({
                method:'get',
                url:LOOK+"/pckgBookingTicket/getAppId.do",
                 }).then(res=>{
                    window.location ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+res.data+"&redirect_uri="+_url+"&response_type=code&scope=snsapi_base&state=#wechat_redirect"
               }).catch(error=>{
                  console.log(error);
            });
          }
          else
          { 
            //alert('调用toLiogn');
            axios({
              url:LOOK+'/pckgBookingTicket/toLogin.do?code='+code,
              }).then(res=>{
                console.log(res);
                let key = res.data;
                if(res.code!='0')
                {
                  alert('获取微信用户信息失败，请退出重新操作');
                }
                else
                {
                  let md5 = crypto.createHash('md5');
                  md5.update(key);
                  let token = md5.digest('hex');
                  let time = formateDateAndTimeToString(new Date());

                  let obj = {
                    "timestamp":time,
                    "sign":token
                  }
                  USER_TOKEN.set(obj);
                  next();
                }
            });
          }
        }
      }).catch(error=>{
         alert("网络错误，请重试");
      });
  }
  else
  {
      next();
  }

});

export default router
