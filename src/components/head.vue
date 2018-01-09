<template>
	<div id='head'>
		<div class='indexHead'>
			<span>我的音乐</span>
			<!-- <i>下载APP</i> -->
		</div>
		<div class='indexRoute'>
			<ul>
				<li><router-link to='/'>推荐</router-link></li>
				<li><router-link to='/songlist'>歌单</router-link></li>
				<li><router-link to='/search'>搜索</router-link></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.indexHead{
		height:4rem;
		background:#2ca2f9;
		text-align:center;
		line-height:4rem;
		color:#fff;
		font-size:1.75rem;
	}
	.indexRoute{
		width:100%;
		height:2.5rem;
		line-height:2.5rem;
		text-align:center;
	}
	.indexRoute a{
		text-decoration:none;
		color:#333;
		padding-bottom:0.45rem;
	}
	.indexRoute>ul{
		overflow:hidden;
		border-bottom:0.06rem solid #ddd;
	}
	.indexRoute>ul>li{
		float:left;
		width:33%;
	}
	.indexRoute .router-link-exact-active{
		color:#2ca2f9;
		border-bottom:0.2rem solid #2ca2f9;
	}
</style>