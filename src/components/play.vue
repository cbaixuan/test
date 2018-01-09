<template>
	<div id="play">
		<img :src="picUrl" class="backImg">
		<div class='smallImg' id='rotateImg' :class="[ isplay ? 'animation' : '']">
			<img src='../assets/img/dis.png'>
			<img :src="picUrl" class='songImg'/>
		</div>
		<audio :src="songSrc" autoplay='autoplay' ref='aud' id='audio' @timeupdate="change()" @ended="complate()"></audio>
		<!-- <div>{{time}}</div> -->
		<div class='box'>
			<div style='transition: -webkit-transform 0.3s ease-out;transform-origin:0rem 0rem 0rem;'
				:style="{'transform':'translate3d(0rem,'+lrcOffset+'rem,0rem)'}" class='boxlist'>
			<p v-for='(item,index) in lrc.lrcText' :class="[lrcIndex == index ? '' : '']" :key="index" >
			 {{item}}
			</p>
		</div>
		</div>
		<div class='jindutiao'>
			<div class='jindu'></div>
			<div class='lishi'><div class='jindu2' :style="{'width':durationTime+ '%'}"></div></div>
		</div>
		<div class='controls'>
			<div @click='play' :class="[isplay ? 'play' : 'pause']"></div>
		</div>
		
	</div>
</template>

<script>
	import api from '../api'
	export default{
		data(){
			return{
				routeId:'',
				lrc:{
					lrcText:[],
					lrcTime:[]
				},
				songSrc:'',
				picUrl:'',
				lrcIndex:0,
				time:0,
				isplay:true,
				durationTime:0
			}
		},
		created(){
			this.picUrl = this.$store.getters.picUrl
			if(this.picUrl){
				window.localStorage.setItem("picUrl",this.$store.getters.picUrl)
			}
			if(!this.picUrl){
				var obj = window.localStorage.getItem("picUrl")
				this.picUrl = obj
			}
			this.routeId = this.$route.params.id
			this.$http.get(api.getLrc(this.routeId))
			.then( (res) =>{
				// console.log(res.data)
				if(res.data.nolyric){
					this.lrc.lrcText.push('纯音乐')
				}else{
					var lyric = res.data.lrc.lyric;
					var reg = /\[.*?\]/g
					var str = lyric.replace(reg,'').split('\n')
					var time = lyric.match(reg)
					// console.log(time)
					this.lrc.lrcText = str
					// console.log(time[0].match(/:\d{2}/))
					for(var i = 0; i < time.length; i++){
						if(!time[i].match(/\d{2}/i)) continue
      					var min = time[i].match(/\d{2}/i)[0]
      					var sec = time[i].match(/:\d{2}/i)[0].slice(1)
						// if(!sec) continue
						this.lrc.lrcTime.push(Number(min) *60 + Number(sec))
					}
					// console.log(this.lrc.lrcTime)
				}
			})
			this.$http.get(api.getSong(this.routeId))
			.then( (res) =>{
				this.songSrc = res.data.data[0].url
				// console.log(res)
			}).catch( (res) =>{
				console.log('请求错误')
				this.isplay = false
			})
			
		},
		mounted(){
			if(this.lrc.lrcText.length == 0){
				this.lrc.lrcText.push('歌词加载错误')
			}
		},	
		methods:{
			play(){
				this.isplay = !this.isplay
				var audio = document.querySelector('#audio')
				// var rotateImg = document.querySelector('#rotateImg')
				if(this.isplay){
					audio.play()
					// rotateImg.style.animationPlayState="running"	
				}else{
					audio.pause()
					// rotateImg.style.animationPlayState="paused"
				}
			},
			change(){
				var currentTime = document.querySelector('audio').currentTime
				this.time = Math.round(currentTime)
			},
			complate(){
				// console.log('播放完成')
				this.isplay = false
			}
		},
		computed:{
			lrcOffset(){
				if(this.lrc){
					var current = this.time
						for(var i = 0; i < this.lrc.lrcText.length; i++){
						if(this.lrc.lrcTime[i] === current){
							this.lrcIndex = i
						} 
					}
					return -(this.lrcIndex) * 2.31
				}
			},
			width(){
				var dur = document.querySelector('#audio').duration;
				var d = (this.time / dur) * 100;
				this.durationTime = d.toFixed(2);
				return this.durationTime 
			}
		}
	}
</script>

<style scoped>
	@keyframes rotate{
		0%{transform:rotate(0deg);}
		100%{transform:rotate(360deg);}
	}
	#play{
		min-height:46rem;
		overflow:hidden;
		position:relative;
	}
	.backImg{
		position:fixed;
		transform:scale(2);
		z-index:-1;
		opacity:.5;
	}
	.box{
		text-align:center;
		height:5.19rem;
		overflow:hidden;
		padding-top:3.62rem;
		color:#111;
	}
	.controls{
		text-align:center;
	}
	.play{
		display:inline-block;
		width:4rem;
		height:4rem;
		background:url('../assets/img/stop.png') no-repeat 0rem;
	}
	.pause{
		display:inline-block;
		width:4rem;
		height:4rem;
		background:url('../assets/img/play.png') no-repeat 0rem;
	}
	#player1{
		display:none;
	}
	.smallImg{
		width:100%;
		text-align:center;
		position:relative;
		animation-play-state: paused;
	}
	.animation{
		animation-name:rotate;
		animation-duration:10s;
		animation-timing-function:linear;
		animation-iteration-count:infinite;
		animation-play-state: running;
		animation-fill-mode:forwards;
		/*animation: rotate 6s linear infinite ;*/
	}
	.smallImg>img{
		width:20rem;
		height:20rem;
		border-radius:50%;
	}
	.smallImg>.songImg{
		position:absolute;
		top:50%;
		left:50%;
		margin-top:-6.5rem;
		margin-left:-6.5rem;
		border-radius:50%;
		width:13rem;
		height:13rem;
	}
	.bColor{
		color:blue;
	}
	.jindutiao{
		position:relative;
		padding:1rem 15%;
	}
	.jindu{
		height:0.3rem;
		margin:0rem auto;
		background-color:#999;
	}
	.jindu2{
		height:0.3rem;
		background-color:red;
		z-index:10;
	}
	.lishi{
		position:absolute;
		top:1rem;
		width:70%;
	}
</style>