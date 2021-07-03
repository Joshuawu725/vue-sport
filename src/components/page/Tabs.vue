<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy">击球力量与效果相关性</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row :gutter="12">
                    <el-col :span="6">
                        <el-select v-model="compareValueX" multiple size="medium" placeholder="请选择变量X轴">
                            <el-option
                                v-for="item in compareOptionX"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="compareValueY" multiple size="medium" placeholder="请选择变量Y轴">
                            <el-option
                                v-for="item in compareOptionY"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" plain icon="el-icon-search" v-on:click="showCompare">分析</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="container">
            <div id="echart_heatpoint" style=" width:100%; height:400px; align: center "></div>
        </div>
    </div>
</template>


<script>
import { filteComparevalue } from '../../api/index';
import * as echarts from 'echarts';
    export default {
        name: 'tabs',
        data() {
            return {
               compareValueX:'',
               compareOptionX:[
                   {
                        value:"ax",
                        label:"ax",
                   },
                   {
                       value:"ay",
                       label:"ay",
                   },
                   {
                       value:"az",
                       label:"az",
                   },
                   {
                       value:"anglex",
                       label:"anglex",
                   },
                   {
                       value:"angley",
                       label:"angley",
                   },
                   {
                       value:"anglez",
                       label:"anglez",
                   },
                   {
                       value:"avx",
                       label:"avx",
                   },
                   {
                       value:"avy",
                       label:"avy",
                   },
                   {
                       value:"avz",
                       label:"avz",
                   },
                //    {
                //        value:"magnetismx",
                //        label:"magnetismx",
                //    },
                //    {
                //        value:"magnetismy",
                //        label:"magnetismy",
                //    },
                //    {
                //        value:"magnetismz",
                //        label:"magnetismz",
                //    },
                //    {
                //        value:"temperature",
                //        label:"temperature",
                //    },
                //    {
                //        value:"spin",
                //        label:"spin",
                //    },
                //    {
                //        value:"speed",
                //        label:"speed",
                //    },
                //    {
                //        value:"point",
                //        label:"point",
                //    }
               ],
               compareValueY:'',
               compareOptionY:[
                //    {
                //         value:"ax",
                //         label:"ax",
                //    },
                //    {
                //        value:"ay",
                //        label:"ay",
                //    },
                //    {
                //        value:"az",
                //        label:"az",
                //    },
                //    {
                //        value:"anglex",
                //        label:"anglex",
                //    },
                //    {
                //        value:"angley",
                //        label:"angley",
                //    },
                //    {
                //        value:"anglez",
                //        label:"anglez",
                //    },
                //    {
                //        value:"avx",
                //        label:"avx",
                //    },
                //    {
                //        value:"avy",
                //        label:"avy",
                //    },
                //    {
                //        value:"avz",
                //        label:"avz",
                //    },
                //    {
                //        value:"magnetismx",
                //        label:"magnetismx",
                //    },
                //    {
                //        value:"magnetismy",
                //        label:"magnetismy",
                //    },
                //    {
                //        value:"magnetismz",
                //        label:"magnetismz",
                //    },
                //    {
                //        value:"temperature",
                //        label:"temperature",
                //    },
                   {
                       value:"spin",
                       label:"spin",
                   },
                   {
                       value:"speed",
                       label:"speed",
                   },
                   {
                       value:"point",
                       label:"point",
                   }
               ],
               filteComparevalue:{},
               filteCompareData:[],
               xlist:[],
               ylist:[],
               values:[],
            }
        },
        methods: {
            showCompare(){
                if(this.compareValueX == null || this.compareValueX == ''|| this.compareValueY == null || this.compareValueY == ''){
                this.$alert('请选择完整的过滤选项', '警告', {
                confirmButtonText: '确定',
                });
                }
                else{
                    this.filteComparevalue = {
                    xlist: this.compareValueX.join(","),
                    ylist: this.compareValueY.join(",")
                    }
                    console.log(this.filteComparevalue);
                    console.log(JSON.stringify(this.filteComparevalue));
                    filteComparevalue(this.filteComparevalue).then(res => {
                    this.filteCompareData = res;
                    console.log(this.filteCompareData);
                    this.xlist = this.filteCompareData.xlist;
                    this.ylist = this.filteCompareData.y_list;
                    this.values = this.filteCompareData.values;
                    this.darwChart();
                    });
                }
            },
            darwChart(){
                var chartDom = document.getElementById('echart_heatpoint');
                var myChart = echarts.init(chartDom);
                var option;

                var xlist = this.xlist;
                var ylist = this.ylist;

                var data = this.values;

                data = data.map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });

                option = {
                    tooltip: {
                        position: 'top'
                    },
                    grid: {
                        height: '50%',
                        top: '10%'
                    },
                    xAxis: {
                        type: 'category',
                        data: xlist,
                        splitArea: {
                            show: true
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ylist,
                        splitArea: {
                            show: true
                        }
                    },
                    visualMap: {
                        min: -1,
                        max: 1,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%'
                    },
                    series: [{
                        name: '相关系数',
                        type: 'heatmap',
                        data: data,
                        label: {
                            show: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 2,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };

                option && myChart.setOption(option);
            },
        },
    }

</script>
<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.comparePic {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

