<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 折线图区 -->
        <div class="container">
            <div class="handle-box">
                <!-- 头部位置 根据需求以后加 -->
                <!-- 运动员选择器 单选 -->
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- 动作选择器 -->
                <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- 时间日期选择器 -->
                <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                stripe
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="athlete" label="运动员" align="center"></el-table-column>
                <el-table-column prop="action" label="击球动作" align="center"></el-table-column>
                <el-table-column prop="mark" label="测试序号" align="center"></el-table-column>
                <el-table-column prop="testid" label="测试ID" align="center"></el-table-column>
                <el-table-column prop="testdate" label="测试时间" align="center">
                    <!-- <template slot-scope="scope">￥{{scope.row.money}}</template> -->
                </el-table-column>
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column prop="speedx" label="线速度X"></el-table-column>
                <el-table-column prop="speedy" label="线速度Y"></el-table-column>
                <el-table-column prop="speedz" label="线速度Z"></el-table-column>
                <el-table-column prop="displacementx" label="位移x"></el-table-column>
                <el-table-column prop="displacementy" label="位移Y"></el-table-column>
                <el-table-column prop="displacementz" label="位移Z"></el-table-column>
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 分页位置 -->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal"
                    background
                ></el-pagination>
            </div>
        </div>
        <div class="container">
            <div id="echart_test" style=" width:100%; height:400px; align: center "></div>
        </div>
        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { fetchALLData } from '../../api/index';
import echarts from 'echarts';
export default {
    name: 'basetable',
    data() {
        return {
            // 总条数，根据接口获取数据长度
            pageTotal: 1,
            // 默认每页显示的条数（可修改）
            pageSize:15,
            // 默认显示第几页
            currentPage: 1,
            // // 总数据
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            form: {},
            idx: -1,
            id: -1,
            //绘图数据
            testdateList:[],
            sportworkXList:[],
            sportworkYList:[],
            sportworkZList:[],
            //运动员选择器
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, 
                {
                value: '选项2',
                label: '双皮奶'
                }, 
                {
                value: '选项3',
                label: '蚵仔煎'
                }, 
                {
                value: '选项4',
                label: '龙须面'
                }, 
                {
                value: '选项5',
                label: '北京烤鸭'
                }],
        };
    },
    created() {
        this.getData();
    },
    mounted(){
        this.darwChart();
    },
    methods: {
        //异步通过axios获取数据
        getData() {
            fetchALLData(this.query).then(res => {
                console.log(res);
                // this.pageTotal = res.pageTotal || 50;
                this.tableData = res.results;
                this.pageTotal = res.count;
                // this.page = this.query.page;
                // this.size = this.query.size;
                //console.log(this.tableData);

            });
        },
        //echart画图
        darwChart(){
            //异步取数
            fetchData(this.query).then(res => {
                console.log(res);
                for(var i = 0; i < res.results.length; i++){
                    this.testdateList[i] = res.results[i].testdate;
                };
                console.log(this.testdateList);
                
                for(var i = 0; i < res.results.length; i++){
                    this.sportworkXList[i] = res.results[i].sportworkx;
                };
                console.log(this.sportworkXList);
                
                for(var i = 0; i < res.results.length; i++){
                    this.sportworkYList[i] = res.results[i].sportworky;
                };
                console.log(this.sportworkYList);
                
                for(var i = 0; i < res.results.length; i++){
                    this.sportworkZList[i] = res.results[i].sportworkz;
                };
                console.log(this.sportworkZList);
                //引入echarts
                let echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('echart_test'));
                // 指定图表的配置项和数据
                myChart.setOption({
                    title: {
                        text: '异步折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['功X','功Y','功Z']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.testdateList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '功X',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: this.sportworkXList
                        },
                        {
                            name: '功Y',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: this.sportworkYList
                        },
                        {
                            name: '功Z',
                            type: 'line',
                            smooth: true,
                            stack: '总量',
                            data: this.sportworkZList
                        }
                    ]
                });
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // // 编辑操作
        // handleEdit(index, row) {
        //     this.idx = index;
        //     this.form = row;
        //     this.editVisible = true;
        // },
        // // 保存编辑
        // saveEdit() {
        //     this.editVisible = false;
        //     this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        //     this.$set(this.tableData, this.idx, this.form);
        // },
        // 分页
        // 分页导航
        handleCurrentChange(val) {
            
            this.currentPage = val;
            
        },
          // 每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val ;
            
        },
        // //数据总条数
        //  totalPageNum(){
        //          fetchData(this.query).then(res=>{
        //             this.pageTotal =res.results[0].count;//总信息条数从数据库获取;
        //         }).catch(error=>{
        //             console.log(error);
        //         })
        //     },
        // handleCurrentChange(val) {
        //     this.currentPage = query.page;
        //     console.log(`当前页: ${currentPage}`);
        // },
        // handlePageChange(){}
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
