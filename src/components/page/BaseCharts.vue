<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 阶段对比
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row :gutter="12">
                    <el-col :span="4">
                        <el-select v-model="athleteListvalue" clearable placeholder="请选择运动员">
                            <el-option
                                v-for="item in athleteListOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="jointValue" clearable placeholder="请选择关节数据">
                            <el-option
                                v-for="item in jointOption"
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
                    <el-col :span="3" :offset="5">
                        <el-button type="primary" plain icon="el-icon-search" v-on:click="showFilter">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="container">
            <div id="echart_phases" style=" width:100%; height:400px; align: center "></div>
        </div>
    </div>
</template>

<script>
import { fetchAthlete } from '../../api/index';
import { fetchPhases } from '../../api/index';
export default {
    data(){
        return {
            athlete:{},
            athletepage:2,
            athleteList:[],
            athleteListOption:[],
            athleteListvalue:[],
            actionDatetime:'',
            //
            jointValue:'',
            jointOption:[
                {
                value:"rightshoulder_pos_x",
                label:"右肩X位移"
                },
                {
                value:"rightshoulder_pos_y",
                label:"右肩Y位移"
                },
                {
                value:"rightshoulder_pos_z",
                label:"右肩Z位移"
                },
                {
                value:"rightshoulder_rot_x",
                label:"右肩X角度"
                },
                {
                value:"rightshoulder_rot_y",
                label:"右肩Y角度"
                },
                {
                value:"rightshoulder_rot_z",
                label:"右肩Z角度"
                },
                {
                value:"rightarm_pos_x",
                label:"右臂X位移"
                },
                {
                value:"rightarm_pos_y",
                label:"右臂Y位移"
                },
                {
                value:"rightarm_pos_z",
                label:"右臂Z位移"
                },
                {
                value:"rightarm_rot_x",
                label:"右臂X角度"
                },
                {
                value:"rightarm_rot_y",
                label:"右臂Y角度"
                },
                {
                value:"rightarm_rot_z",
                label:"右臂Z角度"
                },

            ],
            //
            getPhases:{},
            // phasesData:{},
            //总数据
            resdata:[],
            // //action(series)名称
            // actionName:[],
            // //action(series)颜色
            // actionColor:[],
            // //action(series)分阶段竖线
            // seriesMarkLine:[],
            // //action(series)数据
            // seriesData:[],
            //X轴
            X_axis:[],
            //legend
            legendData:[],
            //
            seriesDataAll:[]
        }
    },
    created() {
        this.getAthlete();
    },
    methods:{
        //获取运动员数据
        getAthlete(){
            this.athlete = {
                format: "json",
                page: 1,
                size: 500
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
                console.log(this.athleteListOption);
            });
        },
        showFilter(){
            // this.jointValue = rightshoulder_pos_x
            //测试数据
            // this.getPhases = {
            //     athlete_id: 'G003',//this.athleteListvalue
            //     start_time: '1609938070000',// this.actionDatetime[0]
            //     end_time: '1610110870000',// this.actionDatetime[-1]
            //     //chosen_y: this.jointValue,
            //     chosen_y: 'rightshoulder_pos_x',
            // };
            //正常使用
            this.getPhases = {
                athlete_id: this.athleteListvalue,//
                start_time: this.actionDatetime[0],//
                end_time: this.actionDatetime[-1],// 
                //chosen_y: ,
                chosen_y: this.jointValue,
            };
            fetchPhases(this.getPhases).then( res =>{
                this.resdata = res
                // console.log(JSON.stringify(this.resdata));
                // console.log(JSON.stringify(this.resdata[0]));
                //取得每个series代表的一个动作的动作名+颜色
                for(var i in this.resdata){
                    // console.log(JSON.stringify(this.resdata[i]));
                    //action(series)名称
                    var actionName='';
                    //action(series)颜色
                    var actionColor='';
                    //action(series)分阶段竖线
                    var seriesMarkLine=[];
                    //action(series)数据
                    var seriesData=[];
                    actionName = this.resdata[i].action
                    actionColor = this.resdata[i].period[0].color
                    // console.log(JSON.stringify(this.actionName));
                    // console.log(JSON.stringify(this.actionColor));
                    // console.log(JSON.stringify(this.resdata[0].period));
                    //取每个series里代表阶段分界线的markline
                    for(var item_period in this.resdata[i].period){
                        // console.log(JSON.stringify(item_period));
                        // console.log(JSON.stringify(this.resdata[0].period[item_period].start));
                        // for (var item_)
                        // console.log(JSON.stringify(this.resdata[0].period.item[start]));
                        var start = '';
                        var end = '';
                        var marklineItem_1 = {};
                        var marklineItem_2 = {};
                        start = this.resdata[i].period[item_period].start
                        // console.log(JSON.stringify(start));
                        end = this.resdata[i].period[item_period].end
                        marklineItem_1 = {
                            "xAxis": start
                        }
                        // console.log(JSON.stringify(marklineItem_1));
                        marklineItem_2 = {
                            "xAxis": end
                        }
                        seriesMarkLine.push(marklineItem_1)
                        seriesMarkLine.push(marklineItem_2)
                    }
                    // console.log(JSON.stringify(this.seriesMarkLine));
                    // console.log(JSON.stringify(this.resdata[0].data));
                    for(var item_data in this.resdata[i].data){
                        // console.log(JSON.stringify(item_data));
                        
                        // console.log(JSON.stringify(this.resdata[0].data[item_data].rightshoulder_pos_x));
                        // console.log(JSON.stringify(this.resdata[0].data[item_data].pk));
                        var x = '';
                        var y = '';
                        var data = []
                        x = this.resdata[i].data[item_data].pk
                        y = this.resdata[i].data[item_data].chosen_y
                        data[0] = x.toString()
                        data[1] = y
                        this.X_axis.push(x)
                        // console.log(JSON.stringify(x));
                        seriesData.push(data)
                    }
                    // console.log(JSON.stringify(this.seriesData));
                    var item_serise = {   
                        name: actionName,
                        type: 'line',
                        sampling: 'lttb',
                        itemStyle: {
                            color: actionColor
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            label: {show: false},
                            data: seriesMarkLine
                            },
                        data: seriesData
                    }
                    // console.log(JSON.stringify(item_serise));
                    // this.actionName
                    // //action(series)颜色
                    // this.actionColor
                    // //action(series)分阶段竖线
                    // this.seriesMarkLine:[],
                    // //action(series)数据
                    // this.seriesData:[],
                    this.legendData.push(actionName)
                    this.seriesDataAll.push(item_serise)
                    console.log(JSON.stringify(seriesMarkLine));
                }
                // console.log(JSON.stringify(this.X_axis));
                // console.log(JSON.stringify(this.legendData));   
                console.log(JSON.stringify(this.seriesDataAll));
                this.darwChart();
            });
            
        },
        darwChart(){
            // console.log(JSON.stringify(this.athletenameList));
            // console.log(JSON.stringify(this.echartdata_X));
            // console.log(JSON.stringify(this.echartdata_series));
            let echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('echart_phases'));
            // 指定图表的配置项和数据
            var option
            // se ={
            // name: 'blue',
            // type: 'line',
            // sampling: 'lttb',
            // itemStyle: {
            //     color: 'red'
            // },
            // markLine: {
            //     symbol: ['none', 'none'],
            //     label: {show: false},
            //     data: [{"xAxis":1},{"xAxis":2},{"xAxis":3},]
            //     },
            // data: [['1',10],['2',11],['3',12],['4',12],['5',20],['6',12],['7',12]]
    
            // }

        //     se2 ={
        //         name: 'red',
        //         type: 'line',
        //         sampling: 'lttb',
        //         itemStyle: {
        //             color: 'blue'
        //         },
        //         markLine: {
        //             symbol: ['none', 'none'],
        //             label: {show: false},
        //             data: [{"xAxis":7},{"xAxis":8},{"xAxis":13},]
        //             },
        //         data: [['9',10],['10',11],['11',12],['12',12],['13',20],['14',12],['15',12]]
        //     }
        // se_list = [se, se2]

            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                legend: {
                    data: this.legendColor
                },
                title: {
                    left: 'center',
                    text: '',
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.X_axis
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 10
                }, {
                    start: 0,
                    end: 10
                }],
                // visualMap: {
                //     type: 'piecewise',
                //     show: false,
                //     dimension: 0,
                //     seriesIndex: 0,
                //     pieces: this.phasesStageData_pieces,
                // },
                series: this.seriesDataAll
            };
            option && myChart.setOption(option,true);
        }

    }
}
</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>