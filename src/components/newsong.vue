<template>
	<div id="newsong">
		<div style='clear:both'></div>
		<div class='newsongHead'>最新音乐</div>
		<div v-for="(item,index) in newSong" @click='gotosong(item.hash)' class='newsongList'>
			{{item.filename}}
		</div>
	</div>
</template>

<script>
	import api from '../api'
	export default{
		data(){
			return{
				newSong:[]
			}
		},
		created(){
			this.$http.get('/kugou/?json=true')
			.then( (res) =>{
				// console.log(res)
				this.newSong = res.data.data
			})
			
		},
		methods:{
			gotosong(hash){
				this.$router.push('/song/' + hash)
			}
		}
	}
</script>

<style scoped>
	.newsongHead{
		font-size:1.12rem;
		margin:2rem 0rem;
		padding-left:1rem;
		border-left:0.2rem solid red;
	}
	.newsongList{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		border-bottom:0.06rem solid #f1f1f2;
		padding:0.37rem 0rem 0.37rem 0.62rem;
		height:2.43rem;
		color:rgb(51,51,51);
	}
</style>