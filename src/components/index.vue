<template>
	<div id="index">
		<my-head></my-head>
		<!-- <div> 					//api失效
			<h2>推荐歌单</h2>
			<ul>
				<li v-for="item in list" class='indexLi'>
					<router-link :to="{name:'playlist',params:{id:item.id}}">
						<div class='img'>
							<img :src="item.coverImgUrl+'?param=132y136'" alt="">
						</div>
						<div class='indexTest'>{{item.name}}</div>
						<div class='indexCount'>{{item.playCount}}</div>
					</router-link>
				</li>
			</ul>
		</div> -->
		<my-newsong></my-newsong>
	</div>
</template>

<script>
	import api from '../api'
	import head from './head'
	import newSong from './newsong'
	export default{
		data(){
			return{
				list:[]
			}
		},
		components:{
			"my-head":head,
			"my-newsong":newSong
		},
		created(){
			// this.$http.get(api.getPlayListByWhere('全部','hot',0,true,6))
			// .then( (res) =>{
			// 	// console.log(res.data)
			// 	for(var i = 0; i < res.data.playlists.length; i++){
			// 		this.list.push(res.data.playlists[i])
			// 	}
			// })
		}
	}
</script>

<style scoped>
	ul,li{
		padding:0;
		margin:0;
		list-style:none;
	}
	.indexLi{
		width:32%;
		float:left;
		position:relative;
	}
	.indexLi>a{
		text-decoration:none;
		color:#333;
	}
	.indexLi .img>img{
		width:100%;
		height:100%;
	}
	.indexTest{
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		font-size:0.81rem;
		height:2.12rem;
	}
	.indexLi:nth-child(2),.indexLi:nth-child(5){
		margin:0 2%;
	}
	.indexCount{
		width:100%;
		position:absolute;
		top:0rem;
		color:#fff;
		background-color:rgba(0,0,0,.1);
		text-align:right;
	}
</style>