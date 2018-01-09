<template>
	<div id='playlist'>
		<div class='playlistHead'>
			<img :src="mix.coverImgUrl" class='backImg'>
			<div class='smallImg'>
				<img :src="mix.coverImgUrl" alt="">
			</div>
			<div class='imgRight'>							
				<div>{{mix.name}}</div>
				<div>作者:{{mix.nickname}}</div>
			</div>					
		</div>
		<div>
			<div class='tags'>
				标签：<span v-for="item in mix.tags">{{item}}</span>
			</div>					
			<div class='desc'>
				简介：{{mix.desc}}
			</div>					
		</div>
		<div class='playlistMain'>
			<div>歌曲列表</div>
			<ul>
				<li v-for="(item,index) in tracks" v-if="index < offset">
					<div @click='change(item.id,item.al.picUrl)' >
						<div class='number'>{{index + 1}}</div>
						<div class='sheet'>
							<div class='nowrap'>{{item.name}}</div>
							<div class='nowrap'>
								<span v-for="(item2,index2) in item.ar">
									{{item2.name}}
								</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '../api'
	export default{
		data(){
			return{
				tracks:[],
				mix:{tags:[]},
				offset:10
			}
		},
		created(){
			this.$http.get(api.getPlayListDetail(this.$route.params.id))
			.then( (res) =>{
				// console.log(res.data)
				this.mix.coverImgUrl = res.data.playlist.coverImgUrl;
				this.mix.name = res.data.playlist.name
				this.mix.nickname = res.data.playlist.creator.nickname
				for(var i = 0; i < res.data.playlist.tags.length; i++){
					this.mix.tags.push(res.data.playlist.tags[i])
				}
				this.mix.desc = res.data.playlist.description
				for(var i = 0; i < res.data.playlist.tracks.length; i++){
					this.tracks.push(res.data.playlist.tracks[i])
				}
			})
			this.add()
		},
		methods:{
			change(f,i){
				this.$store.commit('getPicUrl',i)
				this.$router.push('/play/'+f)
			},
			add(){
				var self = this;
				window.onscroll=function(){
					//取网页卷上去的高度
					var h1=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
					//取网页中能看到高
					var h2=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight
					//取网页正文高，包含被卷上去的内容
					var h3=document.documentElement.scrollHeight?document.documentElement.scrollHeight:document.body.scrollHeight;
					if((h1+h2)==h3){
					//	console.log('滚动条已经到最下面啦');
					 	self.offset += 10;
					}
				}
			}
		}
	}
</script>

<style scoped>
	.playlistHead{
		height:12.5rem;
		padding:0.93rem;
		overflow:hidden;
		position:relative;
	}
	.backImg{
		position:absolute;
		z-index:-1;
		transform:scale(8);
		opacity:0.8;
		
	}
	.smallImg{
		width:9.37rem;
		height:9.37rem;
		float:left;
		margin-top:1.56rem;
	}
	.smallImg>img{
		width:100%;
		height:100%;
	}
	.imgRight{
		float:left;
		margin-left:0.93rem;
		padding-top:2rem;
		width:11rem;
	}
	.imgRight :nth-child(1){
		font-size:1.06rem;
		color:#fefefe;
		height:4rem;
		overflow:hidden;
	}
	.imgRight :nth-child(2){
		color:#fefefe;
	}
	.desc{
		display:-webkit-box;
		-webkit-line-clamp:4;
		-webkit-box-orient:vertical;
		overflow:hidden;
		font-size:0.75rem;
		color:#666;
	}
	.tags{
		color:#666;
		padding:0.5rem 0.5rem;
		font-size:0.87rem;
	}
	.tags>span{
		border:1px solid #666;
		padding:0.06rem 0.2rem;
		border-radius:0.62rem;
		margin-right:0.62rem;
	}
	.playlistMain{
		margin-top:0.62rem;
	}
	.playlistMain>div{
		background-color:#eeeff0;
		font-size:0.75rem;
		line-height:1.43rem;
		padding-left:0.62rem;
		margin-bottom:0.62rem;
	}
	.playlistMain a{
		color:#888;
		text-decoration: none;
	}
	.playlistMain li{
		width:100%;
		height:3.43rem;
		border-bottom:1px solid #ddd;
	}
	.number{
		float:left;
		height:100%;
		width:10%;
		text-align:center;
		line-height:3.43rem;
		border-bottom:1px solid #fff;
	}
	.sheet{
		float:left;
		width:90%;
	}
	.sheet>div:nth-child(1){
		font-size:1.06rem;
		color:#333;
	}
	.sheet span{
		font-size:0.87rem;
		color:#888;
	}
	.nowrap{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>