<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-global"></i> {{$t('i18n.breadcrumb')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span>后端分页测试</span>
            <el-table
                :data="eviLists"
                border
                stripe
                class="table"
                ref="multipleTable"
            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="athlete" label="运动员" align="center"></el-table-column>
                <el-table-column prop="action" label="击球动作" align="center"></el-table-column>
                <el-table-column prop="mark" label="测试序号" align="center"></el-table-column>
                <el-table-column prop="testid" label="测试ID" align="center"></el-table-column>
                <el-table-column prop="testdate" label="测试时间" align="center"></el-table-column>
                <el-table-column prop="speedx" label="线速度X"></el-table-column>
                <el-table-column prop="speedy" label="线速度Y"></el-table-column>
                <el-table-column prop="speedz" label="线速度Z"></el-table-column>
                <el-table-column prop="displacementx" label="位移x"></el-table-column>
                <el-table-column prop="displacementy" label="位移Y"></el-table-column>
                <el-table-column prop="displacementz" label="位移Z"></el-table-column>
            </el-table>
            <!-- 分页位置 -->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[15, 30, 50, 100, 200]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    data(){
        return {
            // query:{
            //     page : 1,
            //     size : 2
            // },
            query:{},
            currentPage:1,
            total:null,
            limit:15,
            list:[],
            page:1,
            eviLists:[],

        }
    },
    created() {
        this.getlist();
    },
    mounted(){
        // this.getinfoList()
    },
    methods:{
        // getData() {
        //     fetchData(this.query).then(res => {
        //         console.log(res);
        //         // this.pageTotal = res.pageTotal || 50;
        //         this.tableData = res.results;
        //         // this.page = this.query.page;
        //         // this.size = this.query.size;
        //         //console.log(this.tableData);

        //     });
        // },
        // getinfoList(){
        //     let fyData = this.eviLists
        //     this.list = fyData.filter((item, index) =>
        //         index < this.page * this.limit && index >= this.limit * (this.page - 1)
        //     )
        //     this.page = 1
        // },
        handleSizeChange(val) {
            this.limit = val
            this.getlist()
            console.log(`每页 ${val} 条`);
            this.page = 1
            console.log("强制第一页");
        },
        handleCurrentChange(val) {
            this.page = val
            this.getlist()
            console.log(`当前页: ${val}`);
            
        },
        //获取后端数据，后端已经进行了分页
        getlist(){
            this.query = {//传给后端的参数
                page: this.page,//后端已经分好了数据
                size: this.limit //条数
            };
            console.log("页数："+ this.page + "条数：" + this.limit),
            fetchData(this.query).then( res => {
                this.eviLists = res.results //后端返回的数据
                this.total = res.count // 后端返回的总条数
                // this.getinfoList()  //获取数据之后进行分页
            });
            
        }
    }
}
</script>

<style scoped>
.list{
    padding: 30px 0;
}
.list p{
    margin-bottom: 20px;
}
a{
    color: #409eff;
}
</style>
