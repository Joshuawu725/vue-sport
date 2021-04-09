import request from '../utils/request';

//画图接口
export const fetchData = query => {
    return request({
        url: './analysis/',
        method: 'get',
        params: query
    });
};

//运动员姓名

export const fetchAthlete = athlete => {
    return request({
        url: './athlete/',
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