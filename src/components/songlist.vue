<template>
	<div id="songlist">
		<my-head></my-head>
		<ul>
			<li v-for="(item,index) in songlist" :key="index" class='songlist'>
				<router-link :to="{name:'listinfo',params:{id:item.specialid}}">
				<div class='pull-left' style="width:40%"><img :src="item.imgurl.replace('{size}','150')" alt=""></div>
				<div class='pull-left' style="width:60%">
					<div>{{item.specialname}}</div>
					<span>
						<i class='icon'></i>
						{{item.playcount}}
					</span>
				</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import head from './head'
	export default{
		data(){
			return{
				songlist:[]
			}
		},
		components:{
			"my-head":head
		},
		created(){
			this.$http.get('/kugou/plist/index&json=true')
			.then( (res) =>{
				for(var i = 0; i < res.data.plist.list.info.length; i++){
					this.songlist.push(res.data.plist.list.info[i])
				}
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.songlist{
		overflow:hidden;
		padding:0.62rem 0rem 0.62rem 0.62rem;
	}
	.pull-left:nth-child(2){
		padding-top:2rem;
		font-size:1.12rem;
		display:-webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
		overflow:hidden;
	}
	.pull-left>span{
		color:#9b9b9b;
	}
	.icon{
		width: 1.2em;
		height:1.12rem;
		display:inline-block;
		background: url('../assets/img/icon_music.png')
	}
</style>