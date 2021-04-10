import request from '../utils/request';

//获取数据
export const fetchData = query => {
    return request({
        url: './analysis/',
        method: 'get',
        params: query
    });
};

//条件选择
export const filteData = filter => {
    return request({
        url: './analysis/',
        method: 'get',
        params: filter
    });
};

//运动员姓名

export const fetchAthlete = athlete => {
    return request({
        url: './athlete/',//http://106.14.115.123:8080/athlete/
        method: 'get',
        params: athlete
    });
};

//前端分页接口
export const fetchALLData = query => {
    return request({
        url: './analysis/?format=json&page=1&size=999',
        method: 'get',
        // params: [
        //     page = 1,
        //     size = 9999,
        // ]
    });
};