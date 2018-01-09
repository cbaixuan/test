import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import song from '@/components/song'
import hot from '@/components/hot'
import search from '@/components/search'
import playlist from '@/components/playlist'
import play from '@/components/play'
import songlist from '@/components/songlist'
import listinfo from '@/components/listinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
    	path:'/song/:id',
    	name:'song',
    	component:song
    },{
    	path:'/hot',
    	name:'hot',
    	component:hot
    },{
    	path:'/search',
    	name:'search',
    	component:search
    },{
      path:'/playlist/:id',
      name:'playlist',
      component:playlist
    },{
      path:'/play/:id',
      name:'play',
      component:play
    },{
      path:'/songlist',
      name:'songlist',
      component:songlist
    },{
      path:'/listinfo/:id',
      name:'listinfo',
      component:listinfo
    }

  ]
})
