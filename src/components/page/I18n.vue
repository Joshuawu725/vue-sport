<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 运动员信息查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <el-select v-model="athleteListvalue" clearable placeholder="请选择">
                            <el-option
                                v-for="item in athleteListOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="movementValue" clearable placeholder="请选择">
                            <el-option
                                v-for="item in optionMovement"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-date-picker
                            v-model="actionDatetime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3" :offset="6">
                        <el-button type="primary" plain icon="el-icon-search" v-on:click="showFilter">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            
            <el-table
                :data="eviLists.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                ></el-pagination>
            </div>
        </div>
    </section>
</template>

<script>
// import { fetchData } from '../../api/index';
import { fetchAthlete } from '../../api/index';
import { filteData } from '../../api/index';
export default {
    data(){
        return {
            query:{},
            currentPage:1,
            total:null,
            pagesize:15,
            //
            limit:15,
            list:[],
            // page:1,
            eviLists:[],
            //运动员选择器
            athlete:{},
            athletepage:2,
            athleteList:[],
            athleteListOption:[],
            athleteListvalue:'',
            movementValue:'',
            optionMovement:[
                {
                value:"1",
                label:"正手拉球"
                },
                {
                    value:"2",
                    label:"反手拉球"
                },
                {
                    value:"3",
                    label:"正手搓球"
                },
                {
                    value:"4",
                    label:"反手搓球"
                },
                {
                    value:"5",
                    label:"正手攻球"
                },
                {
                    value:"6",
                    label:"反手攻球"
                },
                {
                    value:"7",
                    label:"正手削球"
                },
                {
                    value:"8",
                    label:"反手削球"
                },
                {
                    value:"9",
                    label:"正手挑球"
                },
                {
                    value:"10",
                    label:"反手挑球"
                },
                {
                    value:"11",
                    label:"反手拧球"
                }
            ],
            actionDatetime:'',
            filter:{},
        }
    },
    created() {
        this.showFilter();
        this.getAthlete();
    },
    mounted(){
        // this.getinfoList()
    },
    methods:{
        handleSizeChange(size) {
            this.pagesize = size
            // this.showFilter()
            // this.showFilter()
            // console.log(`每页 ${size} 条`);
            // this.page = 1
            // console.log("强制第一页");
        },
        handleCurrentChange(currentPage) {
            this.currentPage  = currentPage
            // this.showFilter()
            // this.showFilter()
            // console.log(`当前页: ${currentPage}`);
            
        },
        //获取后端数据，后端已经进行了分页
        // getlist(){
        //     this.query = {//传给后端的参数
        //         page: this.currentPage,//后端已经分好了数据
        //         size: this.pagesize //条数
        //     };
        //     // console.log("页数："+ this.page + "条数：" + this.limit),
        //     fetchData(this.query).then( res => {
        //         this.eviLists = res.results //后端返回的数据
        //         this.total = res.count // 后端返回的总条数
        //         // this.getinfoList()  //获取数据之后进行分页
        //         console.log("请求数据")
        //     });
            
        // },

        // TransformDatatimeForData(time){
        //     if(time == null || time == ''){
        //         return ''
        //     }
        //     var date=new Date(parseInt(time));
        //     var Y = date.getFullYear() + '-';
        //     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        //     var D = date.getDate() + ' ';
        //     var h = date.getHours() + ':';
        //     var m = date.getMinutes() + ':';
        //     var s = date.getSeconds(); 
        //     var res = Y+M+D+h+m+s
        //     return res
        // },
        getAthlete(){
            this.athlete = {
                format: "json",
                page: 1,
                size: 100
            };
            fetchAthlete(this.athlete).then( res => {
                this.athleteList = res.results
                
                for(var i = 0; i < this.athleteList.length; i ++){
                    var item = {};
                    item.value = this.athleteList[i].athleteid
                    item.label = this.athleteList[i].name
                    // console.log(item);
                    this.athleteListOption.push(item)
                }
                // console.log(this.athleteListOption);
            });
        },
        showFilter(){
            // console.log(this.athleteListvalue);
            // console.log(this.movementValue);
            // console.log(this.actionDatetime);
            this.filter = {
                // page: this.currentPage,
                // size: this.pagesize,
                //
                athleteid: this.athleteListvalue,
                actionid: this.movementValue,
                start_time: this.actionDatetime[0],
                end_time: this.actionDatetime[1],
            };
            // console.log(this.filter);
            // console.log(this.movementValue);
            // console.log(this.actionDatetime);
            filteData(this.filter).then( res => {
                this.eviLists = res.data //后端返回的数据
                // console.log(this.eviLists);
                this.total = res.count // 后端返回的总条数
                // console.log(this.total);
                    
                // console.log(this.currentPage);
                    // this.getinfoList()  //获取数据之后进行分页
            });
            
        
        },
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
