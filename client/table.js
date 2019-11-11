/*
 * @Author: za-wangxuezhong
 * @Date: 2019-11-10 20:16:22
 * @LastEditors: za-wangxuezhong
 * @LastEditTime: 2019-11-10 23:53:28
 * @Description: file content
 */
import React from 'react';
import {Table, Divider, Tag} from 'antd';

class table extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'gp_name',
                // key: 'gp_name',
                width: 150,
                fixed: 'left',
                // render: text => <a>{text}</a>,
            },
            {
                title: '代码',
                dataIndex: 'gp_code',
                width: 150,
                // key: 'gp_code',
            },
            {
                title: '今日开盘',
                dataIndex: 'open_jg',
                width: 150,
                // key: 'open_jg',
            },
            {
                title: '昨日收盘',
                dataIndex: 'zrsp_jg',
                width: 150,
                // key: 'zrsp_jg',
            },
            {
                title: '当前价格',
                dataIndex: 'dqjg_jg',
                width: 150,
                // key: 'dqjg_jg',
            },
            {
                title: '今日最高价',
                dataIndex: 'high_jg',
                width: 150,
                // key: 'high_jg',
            },
            {
                title: '今日最低价',
                dataIndex: 'low_jg',
                width: 150,
                // key: 'low_jg',
            },
            {
                title: '竞价买',
                dataIndex: 'buyjj_jg',
                width: 150,
                // key: 'buyjj_jg',
            },
            {
                title: '竞价卖',
                dataIndex: 'selljj_jg',
                width: 150,
                // key: 'selljj_jg',
            },
            {
                title: '成交量',
                dataIndex: 'cjl',
                width: 150,
                // key: 'cjl',
            },
            {
                title: '成交额',
                dataIndex: 'cje',
                width: 150,
                // key: 'cjl',
            },
            {
                title: '买一数量',
                dataIndex: 'buy1_ss',
                width: 150,
                // key: 'buy1_ss',
            },
            {
                title: '买一价格',
                dataIndex: 'buy1_jg',
                width: 150,
                // key: 'buy1_jg',
            },
            {
                title: '买二数量',
                dataIndex: 'buy2_ss',
                width: 150,
                // key: 'buy2_ss',
            },
            {
                title: '买二价格',
                dataIndex: 'buy2_jg',
                width: 150,
                // key: 'buy2_jg',
            },
            {
                title: '买三数量',
                dataIndex: 'buy3_ss',
                width: 150,
                // key: 'buy3_ss',
            },
            {
                title: '买三价格',
                dataIndex: 'buy3_jg',
                width: 150,
                // key: 'buy3_jg',
            },
            {
                title: '买四数量',
                dataIndex: 'buy4_ss',
                width: 150,
                // key: 'buy4_ss',
            },
            {
                title: '买四价格',
                dataIndex: 'buy4_jg',
                width: 150,
                // key: 'buy4_jg',
            },
            {
                title: '买五数量',
                dataIndex: 'buy5_ss',
                width: 150,
                // key: 'buy5_ss',
            },
            {
                title: '买五价格',
                dataIndex: 'buy5_jg',
                width: 150,
                // key: 'buy5_jg',
            },
            {
                title: '卖一数量',
                dataIndex: 'sell1_ss',
                width: 150,
                // key: 'sell1_ss',
            },
            {
                title: '卖一价格',
                dataIndex: 'sell1_jg',
                width: 150,
                // key: 'sell1_jg',
            },
            {
                title: '卖二数量',
                dataIndex: 'sell2_ss',
                width: 150,
                // key: 'sell2_ss',
            },
            {
                title: '卖二价格',
                dataIndex: 'sell2_jg',
                width: 150,
                // key: 'sell2_jg',
            },
            {
                title: '卖三数量',
                dataIndex: 'sell3_ss',
                width: 150,
                // key: 'sell1_ss',
            },
            {
                title: '卖三价格',
                dataIndex: 'sell3_jg',
                width: 150,
                // key: 'sell3_jg',
            },
            {
                title: '卖四数量',
                dataIndex: 'sell4_ss',
                width: 150,
                // key: 'sell4_ss',
            },
            {
                title: '卖四价格',
                dataIndex: 'sell4_jg',
                width: 150,
                // key: 'sell4_jg',
            },
            {
                title: '卖五数量',
                dataIndex: 'sell5_ss',
                width: 150,
                // key: 'sell5_ss',
            },
            {
                title: '卖五价格',
                dataIndex: 'sell5_jg',
                width: 150,
                // key: 'sell5_jg',
            },
            {
                title: '日期',
                dataIndex: 'rq',
                // fixed: 'right',
                width: 150,
                // key: 'rq',
            },
            {
                title: '时间',
                dataIndex: 'time',
                fixed: 'right',
                width: 150,
                // key: 'time',
            },
            // {
            //     title: 'Tags',
            //     key: 'tags',
            //     dataIndex: 'tags',
            //     render: tags => (
            //         <span>
            //             {tags.map(tag => {
            //                 let color = tag.length > 5 ? 'geekblue' : 'green';
            //                 if (tag === 'loser') {
            //                     color = 'volcano';
            //                 }
            //                 return (
            //                     <Tag color={color} key={tag}>
            //                         {tag.toUpperCase()}
            //                     </Tag>
            //                 );
            //             })}
            //         </span>
            //     ),
            // },
            // {
            //     title: 'Action',
            //     key: 'action',
            //     render: (text, record) => (
            //         <span>
            //             <a>Invite {record.name}</a>
            //             <Divider type="vertical" />
            //             <a>Delete</a>
            //         </span>
            //     ),
            // },
        ];

        // const data = [
        //     {
        //         key: '1',
        //         name: 'John Brown',
        //         age: 32,
        //         address: 'New York No. 1 Lake Park',
        //         tags: ['nice', 'developer'],
        //     },
        //     {
        //         key: '2',
        //         name: 'Jim Green',
        //         age: 42,
        //         address: 'London No. 1 Lake Park',
        //         tags: ['loser'],
        //     },
        //     {
        //         key: '3',
        //         name: 'Joe Black',
        //         age: 32,
        //         address: 'Sidney No. 1 Lake Park',
        //         tags: ['cool', 'teacher'],
        //     },
        // ];
        console.log(this.props.option)
        return (
            <Table columns={columns} dataSource={this.props.option.gggjxx} scroll={{x: 4500, y: 300}}/>
        )
    }
}
export default table;
