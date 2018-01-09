<template>
	<div id="search">
		<my-head></my-head>
		<div class='box'>
			<input type='text' placeholder="请输入要搜索的歌曲" v-model='val' @keydown.13='search'>
			<span @click='clear'> × </span>
		</div>
		<div v-if="total" class='total'>共有{{total}}条结果</div>
		<div class='songs'>
			<router-link v-for="(item,index) in songs" class='songsList' :to="{name:'song',params:{id:item.hash}}" :key='index'>
				<div class='songsName'>{{item.filename}}</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import api from '../api'
	import head from './head'
	export default{
		data(){
			return{
				val:'',
				songs:[],
				total:0
			}
		},
		components:{
			"my-head":head
		},
		methods:{
			search(){
				this.songs = [];
				let v = this.val;
				this.$http.get('/akugou/api/v3/search/song?format=json&keyword=' + v + '&page=1&pagesize=30&showtype=1').then( (res) =>{
					// console.log(res)
					this.total = res.data.data.total
					if(!this.total){
						this.songs.push( {filename:'暂无你要找的结果'})
					}else{
						for(var i = 0; i < res.data.data.info.length; i++){
						this.songs.push(res.data.data.info[i])
					}
					}
					
				})
			},
			clear(){
				this.val = '';
				this.songs = [];
				this.total = 0
			}
		}
	}
</script>

<style scoped>
	.songsList{
		display:block;
		text-decoration:none;
		padding:0.5rem;
		border-bottom:1px solid #e5e5e5;
	}
	.songsName{
		font-size:1.06rem;
		color:#333;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		height:3rem;
	}
	input{
		background:#ebecec;
		width:90%;
		line-height:1.87rem;
		font-size:0.87rem;
		text-align:center;
		border-radius:1rem;
		border:0;
	}
	input:focus{
		outline:0rem;
		outline-offset:0rem;
	}
	.box{
		padding:1rem 0rem;
		text-align:center;
		position:relative;
	}
	.box>span{
		position:absolute;
		top:31%;
		right:8%;
		z-index:10;
	}
	.total{
		background-color:#e6e6e6;
		padding-left:0.62rem;
		color:#5d5d5d;
		line-height:2rem;
	}
</style>