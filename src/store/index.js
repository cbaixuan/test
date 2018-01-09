import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		id:'',
		picUrl:'',
		name:'',
		intro:'',
		songs:[]
	},
	getters:{
		id : state => state.id,
		picUrl : state => state.picUrl,
		name : state => state.name,
		intro : state => state.intro,
		songs : state => state.songs
	},
	mutations:{
		setId(state,i){
			state.id = i
		},
		setPicUrl(state,i){
			state.picUrl = i
		},
		setName(state,i){
			state.name = i
		},
		setIntro(state,i){
			state.intro = i
		},
		setSongs(state,i){
			state.songs = i
		}
	}
})

export default store


/**
 * 小项目就没必要用了 -_-
 */