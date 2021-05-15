<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy">相关性矩阵</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-select v-model="compareValue" multiple size="medium" placeholder="请选择需要的对比的变量">
                            <el-option
                                v-for="item in compareOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" plain icon="el-icon-search" v-on:click="showCompare">对比</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="container">
            <div class="comparePic">
                <img :src="this.filteCompareData"/>
            </div>
        </div>
    </div>
</template>


<script>
import { filteComparevalue } from '../../api/index';
    export default {
        name: 'tabs',
        data() {
            return {
               compareValue:'',
               compareOption:[
                   {
                        value:"type",
                        label:"type",
                   },
                   {
                       value:"phases",
                       label:"phases",
                   },
                   {
                       value:"hip_pos_x",
                       label:"hip_pos_x",
                   },
                   {
                       value:"hip_pos_y",
                       label:"hip_pos_y",
                   },
                   {
                       value:"hip_pos_z",
                       label:"hip_pos_z",
                   },
                   {
                       value:"hip_rot_x",
                       label:"hip_rot_x",
                   },
                   {
                       value:"hip_rot_y",
                       label:"hip_rot_y",
                   },
                   {
                       value:"hip_rot_z",
                       label:"hip_rot_z",
                   },
                   {
                       value:"leftshoulder_pos_x",
                       label:"leftshoulder_pos_x",
                   },
                   {
                       value:"leftshoulder_pos_y",
                       label:"leftshoulder_pos_y",
                   },
                   {
                       value:"leftshoulder_pos_z",
                       label:"leftshoulder_pos_z",
                   },
                   {
                       value:"leftshoulder_rot_x",
                       label:"leftshoulder_rot_x",
                   },
                   {
                       value:"leftshoulder_rot_y",
                       label:"leftshoulder_rot_y",
                   },
                   {
                       value:"leftshoulder_rot_z",
                       label:"leftshoulder_rot_z",
                   },
                   {
                       value:"leftarm_pos_x",
                       label:"leftarm_pos_x",
                   },
                   {
                       value:"leftarm_pos_y",
                       label:"leftarm_pos_y",
                   },
                   {
                       value:"leftarm_pos_z",
                       label:"leftarm_pos_z",
                   },
                   {
                       value:"leftarm_rot_x",
                       label:"leftarm_rot_x",
                   },
                   {
                       value:"leftarm_rot_y",
                       label:"leftarm_rot_y",
                   },
                   {
                       value:"leftarm_rot_z",
                       label:"leftarm_rot_z",
                   },
                   {
                       value:"rightshoulder_pos_x",
                       label:"rightshoulder_pos_x",
                   },
                   {
                       value:"rightshoulder_pos_y",
                       label:"rightshoulder_pos_y",
                   },
                   {
                       value:"rightshoulder_pos_z",
                       label:"rightshoulder_pos_z",
                   },
                   {
                       value:"rightshoulder_rot_x",
                       label:"rightshoulder_rot_x",
                   },
                   {
                       value:"rightshoulder_rot_y",
                       label:"rightshoulder_rot_y",
                   },
                   {
                       value:"rightshoulder_rot_z",
                       label:"rightshoulder_rot_z",
                   },
                   {
                       value:"rightarm_pos_x",
                       label:"rightarm_pos_x",
                   },
                   {
                       value:"rightarm_pos_y",
                       label:"rightarm_pos_y",
                   },
                   {
                       value:"rightarm_pos_z",
                       label:"rightarm_pos_z",
                   },
                   {
                       value:"rightarm_rot_x",
                       label:"rightarm_rot_x",
                   },
                   {
                       value:"rightarm_rot_y",
                       label:"rightarm_rot_y",
                   },
                   {
                       value:"rightarm_rot_z",
                       label:"rightarm_rot_z",
                   },
                   {
                       value:"leftleg_pos_x",
                       label:"leftleg_pos_x",
                   },
                   {
                       value:"leftleg_pos_y",
                       label:"leftleg_pos_y",
                   },
                   {
                       value:"leftleg_pos_z",
                       label:"leftleg_pos_z",
                   },
                   {
                       value:"leftleg_rot_x",
                       label:"leftleg_rot_x",
                   },
                   {
                       value:"leftfoot_pos_x",
                       label:"leftfoot_pos_x",
                   },
                   {
                       value:"leftfoot_pos_y",
                       label:"leftfoot_pos_y",
                   },
                   {
                       value:"leftfoot_pos_z",
                       label:"leftfoot_pos_z",
                   },
                   {
                       value:"leftfoot_rot_x",
                       label:"leftfoot_rot_x",
                   },
                   {
                       value:"leftfoot_rot_y",
                       label:"leftfoot_rot_y",
                   },
                   {
                       value:"leftfoot_rot_z",
                       label:"leftfoot_rot_z",
                   },
                   {
                       value:"rightleg_pos_x",
                       label:"rightleg_pos_x",
                   },
                   {
                       value:"rightleg_pos_y",
                       label:"rightleg_pos_y",
                   },
                   {
                       value:"rightleg_pos_z",
                       label:"rightleg_pos_z",
                   },
                   {
                       value:"rightleg_rot_x",
                       label:"rightleg_rot_x",
                   },
                   {
                       value:"rightfoot_pos_x",
                       label:"rightfoot_pos_x",
                   },
                   {
                       value:"rightfoot_pos_y",
                       label:"rightfoot_pos_y",
                   },
                   {
                       value:"rightfoot_pos_z",
                       label:"rightfoot_pos_z",
                   },
                   {
                       value:"rightfoot_rot_x",
                       label:"rightfoot_rot_x",
                   },
                   {
                       value:"rightfoot_rot_y",
                       label:"rightfoot_rot_y",
                   },
               ],
               filteComparevalue:{},
               filteCompareData:[],
            }
        },
        methods: {
            showCompare(){
               this.filteComparevalue = {
                   alist: this.compareValue.join(",")
               }
               console.log(this.filteComparevalue);
               console.log(JSON.stringify(this.filteComparevalue));
               filteComparevalue(this.filteComparevalue).then(res => {
                   this.filteCompareData = res.pic_path
                   console.log(this.filteCompareData);
               })
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

