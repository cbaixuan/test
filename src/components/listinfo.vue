<template>
	<div id="listinfo">
		<div>
			<div class='head'>
				<i class='icon' @click="back"></i>
				<div>{{list.specialname}}</div>
			</div>
			<div class='img'>
				<img :src="list.imgurl.replace('{size}','400')" alt="">
			</div>
		</div>
		<div class='detail'>
			{{list.intro}}
		</div>
		<ul v-for="(item,index) in list.songs">
			<li class='songs'>
				<router-link :to="{name:'song',params:{id:item.hash}}">
					<div>{{item.filename}}</div>	
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:{imgurl:'',}
			}
		},
		created(){
			this.$http.get('/kugou/plist/index&json=true')
				.then( (res) =>{
					// console.log(res)
					// console.log(this.$route.params.id)
					for(var i = 0; i < res.data.plist.list.info.length; i++){
						if(this.$route.params.id == res.data.plist.list.info[i].specialid){
							this.list = res.data.plist.list.info[i]
							// console.log(i)
							break;
						}
					}
				})
		},
		methods:{
			back(){
				this.$router.back(-1)
			}
		}
	}
</script>

<style scoped>
	.head{
		width:100%;
		height:3.12rem;
		line-height:3.12rem;
		position:absolute;
		top:0rem;
		left:0rem;
		background-color:rgba(0,0,0,.3);
		z-index:2;
	}
	.head>div{
		text-align:center;
		color:#fff;
	}
	.icon{
		width:2rem;
		height:3rem;
		display:inline-block;
		float:left;
		background:url('../assets/img/goback.png') no-repeat 0.3rem 0.3rem;
	}
	.img{
		width:100%;
		height:15.62rem;
	}
	.img>img{
		width:100%;
		height:100%;
	}
	.detail{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		padding:1rem 0rem;
		border-bottom:0.12rem solid #e5e5e5;
	}
	.songs{
		height:3.75rem;
		line-height:3.75rem;
		padding-left:0.62rem;
		border-bottom:0.06rem solid #e5e5e5;
	}
</style>