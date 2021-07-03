<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                   曲线相似度对比
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row :gutter="12">
                    <el-col :span="4">
                        <el-select v-model="athleteListvalue" multiple placeholder="请选择运动员">
                            <el-option
                                v-for="item in athleteListOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="movementValue" clearable placeholder="请选择动作">
                            <el-option
                                v-for="item in movementOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="phasesValue" clearable placeholder="请选择阶段">
                            <el-option
                                v-for="item in phasesOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="jointValue" clearable placeholder="请选择关节">
                            <el-option
                                v-for="item in jointOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" plain icon="el-icon-search" v-on:click="showFilter">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="container">
            <div id="echart_test" style=" width:100%; height:400px; align: center "></div>
        </div>
    </div>
</template>

<script>
import { fetchAthlete } from '../../api/index';
import { filteDataDraw } from '../../api/index';
export default {
    data(){
        return {
            //选择器
            athlete:{},
            athletepage:2,
            athleteList:[],
            athleteListOption:[],
            athleteListvalue:[],
            movementValue:'',
            movementOption:[
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
            phasesValue:'',
            phasesOption:[
                {
                    value:"1",
                    label:"引拍"
                },
                {
                    value:"2",
                    label:"挥拍击球"
                },
                {
                    value:"3",
                    label:"还原"
                },
            ],
            jointValue:'',
            jointOption:[
                // {
                //     value:"rightshoulder_pos_x",
                //     label:"右肩X位移"
                // },
                {
                    value:"hip_pos_x",
                    label:"髋关节X位移"
                },
                {
                    value:"hip_pos_y",
                    label:"髋关节Y位移"
                },
                {
                    value:"hip_pos_z",
                    label:"髋关节Z位移"
                },
                {
                    value:"hip_rot_x",
                    label:"髋关节X角度"
                },
                {
                    value:"hip_rot_y",
                    label:"髋关节Y角度"
                },
                {
                    value:"hip_rot_z",
                    label:"髋关节Z角度"
                },
                {
                    value:"leftshoulder_pos_x",
                    label:"左肩X位移"
                },
                {
                    value:"leftshoulder_pos_y",
                    label:"左肩Y位移"
                },
                {
                    value:"leftshoulder_pos_z",
                    label:"左肩Z位移"
                },
                {
                    value:"leftshoulder_rot_x",
                    label:"左肩X角度"
                },
                {
                    value:"leftshoulder_rot_y",
                    label:"左肩Y角度"
                },
                {
                    value:"leftshoulder_rot_z",
                    label:"左肩Z角度"
                },
                {
                    value:"leftarm_pos_x",
                    label:"左臂X位移"
                },
                {
                    value:"leftarm_pos_y",
                    label:"左臂Y位移"
                },
                {
                    value:"leftarm_pos_z",
                    label:"左臂Z位移"
                },
                {
                    value:"leftarm_rot_x",
                    label:"左臂X角度"
                },
                {
                    value:"leftarm_rot_y",
                    label:"左臂Y角度"
                },
                {
                    value:"leftarm_rot_z",
                    label:"左臂Z角度"
                },
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
                {
                    value:"leftleg_pos_x",
                    label:"左腿X位移"
                },
                {
                    value:"leftleg_pos_y",
                    label:"左腿Y位移"
                },
                {
                    value:"leftleg_pos_z",
                    label:"左腿Z位移"
                },
                {
                    value:"leftleg_rot_x",
                    label:"左腿X角度"
                },
                {
                    value:"leftleg_rot_y",
                    label:"左腿Y角度"
                },
                {
                    value:"leftleg_rot_z",
                    label:"左腿Z角度"
                },
                {
                    value:"leftfoot_pos_x",
                    label:"左脚X位移"
                },
                {
                    value:"leftfoot_pos_y",
                    label:"左脚Y位移"
                },
                {
                    value:"leftfoot_pos_z",
                    label:"左脚Z位移"
                },
                {
                    value:"leftfoot_rot_x",
                    label:"左脚X角度"
                },
                {
                    value:"leftfoot_rot_y",
                    label:"左脚Y角度"
                },
                {
                    value:"leftfoot_rot_z",
                    label:"左脚Z角度"
                },

                {
                    value:"rightleg_pos_x",
                    label:"右腿X位移"
                },
                {
                    value:"rightleg_pos_y",
                    label:"右腿Y位移"
                },
                {
                    value:"rightleg_pos_z",
                    label:"右腿Z位移"
                },
                {
                    value:"rightleg_rot_x",
                    label:"右腿X角度"
                },
                {
                    value:"rightleg_rot_y",
                    label:"右腿Y角度"
                },
                {
                    value:"rightleg_rot_z",
                    label:"右腿Z角度"
                },
                {
                    value:"rightfoot_pos_x",
                    label:"右脚X位移"
                },
                {
                    value:"rightfoot_pos_y",
                    label:"右脚Y位移"
                },
                {
                    value:"rightfoot_pos_z",
                    label:"右脚Z位移"
                },
                {
                    value:"rightfoot_rot_x",
                    label:"右脚X角度"
                },
                {
                    value:"rightfoot_rot_y",
                    label:"右脚Y角度"
                },
                {
                    value:"rightfoot_rot_z",
                    label:"右脚Z角度"
                },

            ],
            filterDraw:{},
            filterData:[],
            athleteidValue:'',
            //绘图数据
            athletenameList:[],
            echartdata_X:[],
            // echartdata_Y:[],
            echartdata_Y_item:{},
            echartdata_series:[],
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
                // console.log(this.athleteListOption);
            });
        },
        //过滤
        showFilter(){
            this.echartdata_series = []
            this.echartdata_X = []
            // console.log(this.athleteListvalue);
            this.athleteidValue = this.athleteListvalue.join(",");
            console.log(this.athleteListvalue.length);
            if(this.athleteListvalue.length < 2 || this.athleteidValue == null || this.athleteidValue == ''|| this.movementValue == null || this.movementValue == '' || this.phasesValue == null || this.phasesValue == '' || this.jointValue == null || this.jointValue == ''){
                this.$alert('请选择完整的过滤选项', '警告', {
                confirmButtonText: '确定',
                });
            } 
            else{
                this.filterDraw = {
                    // athleteid: 'S008,S007',
                    athleteid: this.athleteidValue,
                    actionid: this.movementValue,
                    phasesid: this.phasesValue,
                    chosen_y: this.jointValue,
                };
                // console.log(this.filterDraw);
                filteDataDraw(this.filterDraw).then( res => {
                    if(JSON.stringify(res) === '{}'){
                        this.$alert('没有查找到相关数据', '警告', {
                        confirmButtonText: '确定',
                        });
                    }else{
                        this.filterData = res
                        this.echartdata_series = []
                        this.echartdata_X = []
                        // console.log(this.filterData);
                        // console.log(JSON.stringify(this.echartdata_series));
                        // this.athletenameList = this.filterData[0][0].name
                        for(var tuple in this.filterData){
                            var item = [];
                            item = this.filterData[tuple][0].name;
                            this.athletenameList.push(item)
                            // console.log(JSON.stringify(item));
                            var echartdata_Y = []
                            for(var x in this.filterData[tuple][1].data.chosen_y){
                                var data_Y_item = [];
                                data_Y_item = this.filterData[tuple][1].data.chosen_y[x];
                                echartdata_Y.push(data_Y_item)
                                // console.log(JSON.stringify(data_Y_item));
                                
                            };
                            // console.log(JSON.stringify(echartdata_Y
                            this.echartdata_Y_item = {
                                name: item,
                                type: 'line',
                                smooth: true,
                                data: echartdata_Y
                            }
                            this.echartdata_series[tuple] = this.echartdata_Y_item

                        }
                        // console.log(JSON.stringify(this.athletenameList));
                        // console.log(JSON.stringify(this.echartdata_series));
                        for(var x in this.filterData[0][1].data.id){
                            var item = [];
                            item = this.filterData[0][1].data.id[x];
                            this.echartdata_X.push(item)
                        };
                        // console.log(JSON.stringify(this.echartdata_X));
                        // console.log(JSON.stringify(this.echartdata_Y));
                    // console.log(JSON.stringify(this.athletenameList));
                    // console.log(JSON.stringify(this.echartdata_X));
                    // console.log(JSON.stringify(this.echartdata_series));
                        this.darwChart(); //在这里 异步的请求的函数里就行
                    }
                });
            }
            
            
        },
        //echart画图
        darwChart(){
            // console.log(JSON.stringify(this.athletenameList));
            // console.log(JSON.stringify(this.echartdata_X));
            // console.log(JSON.stringify(this.echartdata_series));
            let echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('echart_test'));
            // 指定图表的配置项和数据
            var option
            option = {
                title: {
                    text: '曲线相似度对比'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.athletenameList
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
                    data: this.echartdata_X
                },
                yAxis: {
                    type: 'value'
                },
                series: this.echartdata_series
                
            };
            // console.log(JSON.stringify(option));
            option && myChart.setOption(option,true);
        }
    }
}
</script>

<style>
</style>