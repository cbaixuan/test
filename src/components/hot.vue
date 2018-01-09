<template>
	<div id='hot'>
		<my-head></my-head>

		<div class='headImg'><img :src="headImg" alt=""><div class='none' v-if='headImg'></div></div>
		<div v-for='(item,index) in hotList' class='hotlist' @click='gotosong(item.hash)' :key='index'>
			{{item.filename}}
		</div>
	</div>
	
</template>

<script>
	import head from './head'
	export default{
		data(){
			return{
				hotList:[],
				headImg:''
			}
		},	
		components:{
			"my-head":head
		},
		created(){
			this.$http.get('/kugou/rank/info/?rankid=23784&page=1&json=true')
			.then( (res) =>{
				// console.log(res.data)
				this.headImg = res.data.info.banner7url.replace('{size}','400')
				this.hotList = res.data.songs.list
				// this.hotList = res.data.rank.list
			})
		},
		methods:{
			gotosong(hash){
				this.$router.push('/song/'+hash)
			}
		}
	}
</script>

<style scoped>
	.headImg{
		width:100%;
		height:12.5rem;
		overflow:hidden;
		position:relative;
	}
	.headImg>img{
		width:100%;
		height:100%;
	}
	.hotlist{
		padding:1rem 1rem;
		white-space: nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
		border-bottom:0.06rem solid #e8e8e8;
	}
	.none{
		width:100%;
		height:2rem;
		position:absolute;
		top:4.8rem;
		margin-top:-1rem;
		/*background-color:#fe6343;*/
		background:linear-gradient(to bottom right,#fe4e45,#fe9b36);
	}
</style>