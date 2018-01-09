<template>
	<div id='song'>
		<img class='backImg' :src="img"></img>
		<audio :src="songUrl" @timeupdate='change()' @ended="end"  id='audio' autoplay></audio>
		<div class='songHead'>{{name}}</div>
		<div class='smallImg'>
			<img :src="img" alt='缺省'>
		</div>
		<div class='lrc'>
			<div style='transition:transform .3s ease-out'
				 :style="{'transform':'translateY('+setTime+'rem)'}">
				<p v-for="(item,index) in lrc.lrcText" class='line' :class="'line'+index" >
					{{item}}
				</p>
			</div>
		</div>
		<div class='bar'>
			<div class='bar-white'></div>
			<div class='bar-blue' :style="{'width': width + '%'}">
				<i class='icon'></i>
			</div>
		</div>
		<div style='text-align:center;margin-top:1rem;'>
			<div :class="[isplay ? 'stop' : 'play']" @click='control'></div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				songUrl:'',
				name:'',
				img:'',
				lrc:{lrcText:[],lrcTime:[]},
				time:0,
				lrcIndex:0,
				isplay:true,
			}
		},
		created(){
			this.$http.get('/bkugou/yy/index.php?r=play/getdata&hash='+this.$route.params.id)
			.then( (res) =>{
				// console.log(res.data)
				this.songUrl = res.data.data.play_url
				this.name = res.data.data.audio_name
				this.img = res.data.data.img
				var reg = /\[.*?\]/g
				var time = res.data.data.lyrics.match(reg)
				var lyricTime = []
				for(var i = 0; i < time.length; i++){
					var min = time[i].match(/\d{2}/)[0]
					var sec = time[i].match(/:\d{2}/)[0].slice(1)
					lyricTime.push(Number(min)*60+Number(sec))
				}
				var lyricText = []
				var lyric = res.data.data.lyrics.split('\n')
				for(var i = 0; i < lyric.length; i++){
					var n = lyric[i].replace(reg,'')
					lyricText.push(n)
				}
				this.lrc.lrcText = lyricText
				this.lrc.lrcTime = lyricTime
			})
		},
		mounted(){
			let audio = document.querySelector('#audio')
			// console.log(audio.paused)
		},
		methods:{
			end(){
				this.time = 0;
				this.lrcIndex = 0;
				this.isplay = false;
				// console.log('结束')
			},
			change(){
				if(this.isplay){
					let current = document.querySelector('#audio')
					this.time = Math.round(current.currentTime)
				}
				
			},
			control(){
				let audio = document.querySelector('#audio')
				this.isplay = !this.isplay
				if(this.isplay){
					audio.play()
				}else{
					audio.pause()
				}
			}
		},
		computed:{
			setTime(){
				if(this.lrc){
					var current = this.time
					for(var i = 0; i < this.lrc.lrcText.length; i++){
						if(this.lrc.lrcTime[i] === current){
							this.lrcIndex = i 
						}
					}
					return -(this.lrcIndex) * 2
				}
			},
			width(){
				if(this.songUrl){
					let dur = document.querySelector('#audio').duration;
					let d = (this.time / dur) * 100;
					let width = d.toFixed(2);
					return width
				}
			}
		},
		beforeRouteLeave(to,form,next){
			//console.log('路由离开')
			this.isplay = false
			next()
		}
	}
</script>

<style scoped>
	#song{
		position:relative;
	}
	.backImg{
		position:fixed;
		width:100%;
		transform:scale(2);
		z-index:-1;
		opacity:.5;
	}
	.songHead{
		text-align:center;
	}
	.smallImg{
		margin:1.87rem 0rem;
		width:100%;
		overflow:hidden;
		text-align:center;
	}
	.smallImg>img{
		width:50%;
	}
	.lrc{
		padding-top:1rem;
		height:5rem;
		overflow:hidden;
		text-align:center;
	}
	.line{
		font-size:0.87rem;
	}
	.stop{
		width:4rem;
		height:4rem;
		display:inline-block;
		background:url("../assets/img/stop.png") no-repeat 0rem;
	}
	.play{
		width:4rem;
		height:4rem;
		display:inline-block;
		background:url("../assets/img/play.png") no-repeat 0rem;
	}
	.bar{
		width:70%;
		margin:1rem auto;
		position:relative;
	}
	.bar-white{
		height:0.18rem;
		background-color:#6c6b70;
	}
	.bar-blue{
		height:0.18rem;
		background-color:#2ca2f9;
		position:absolute;
		top:0rem;
		left:0rem;
	}
	.icon{
		position:absolute;
		top:-0.2rem;
		right:-0.25rem;
		width:0.5rem;
		height:0.5rem;
		background-color:#2ca2f9;
		z-index:10;
		border-radius:50%;
	}
</style>