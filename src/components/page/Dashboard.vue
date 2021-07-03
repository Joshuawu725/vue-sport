<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>系统首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="block">
                <el-carousel trigger="click" height="500px">
                <el-carousel-item v-for="(item, i) in images" :key="i">
                    <img v-bind:src="item.url"  height="100%" width="100%" alt="无图片"/>
                </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                images:[
                    {url: require("../../assets/img/1.jpg")},
                    {url: require("../../assets/img/2.jpg")},
                    {url: require("../../assets/img/3.jpg")},
                    {url: require("../../assets/img/4.jpg")},
                    {url: require("../../assets/img/5.jpg")},
                    {url: require("../../assets/img/6.jpg")},
                    {url: require("../../assets/img/7.jpg")},
                ]
            }
        },
        methods: {
        },
        computed: {
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>