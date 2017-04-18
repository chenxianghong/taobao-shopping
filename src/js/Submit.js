import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Adderss from './components/Adderss'


export default class Submit extends React.Component{
    constructor() {
        super();
        this.state = {
            userInfor: '',
            activeName: '',
            activePhone: '',
            activeAdderss: '',
            showAdderss: '0',
        }
    }

    componentDidMount() {
       this.getUserInfor();          //获取地址信息，在render后
    }


    getUserInfor() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/api/userInfor.json',
            success: ((data) => {          //默认为第一个收获地址信息
                this.setState({
                    userInfor: data.adderss,             //地址
                    activeName: data.adderss[0].name,         //姓名
                    activePhone: data.adderss[0].mobile,
                    activeAdderss: data.adderss[0].orderAdderss,
                })
            }),
            error: (() => {
                console.log('ajax getUserInfor 失败')
            })
        })
    }


    getQueryString(name) {

        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');         //正则匹配&开头或直接开头，&结尾或直接结尾的
        console.log(window.location.search);
        console.log(window.location.search.substr(1));         //?号之后的，第二位开始
        console.log(window.location.search.substr(1).match(reg)[2]);
        // encodeURIComponent

        var r = window.location.search.substr(1).match(reg);

        if (r != null) {                   //r若为空，说明没匹配到
            return r[2];
        }
        return null;
    }
    showAdd() {
        this.setState({
            showAdderss: '1',                //点击展示配送地址
        })
    }
    closeAdderss(val) {
        this.setState({                   //根据子组件传过来的值，关闭Adderss
            showAdderss: val,
        })
    }
    choiceAdd(closeAdderss, item) {              //根据子组件传过来选定的按钮，确定最终配送地址
        console.log(item)
        this.setState({
            activeName: item.name,
            activePhone: item.mobile,
            activeAdderss: item.orderAdderss,
            showAdderss: closeAdderss,
        })
    }
    toindex() {
        let _url = '/index.html';                 //点击到提交订单页面
        location.href = _url;
    }
    render() {
        let name = decodeURIComponent(this.getQueryString("name"));              //从userInfor传过来的值，decodeURIComponent可以将乱码转为汉字
        let spect = decodeURIComponent(this.getQueryString("spect"));
        let number = this.getQueryString("number");
        let img = this.getQueryString('img');
        let price = this.getQueryString('price');
        // let allPrice = number * price;
        console.log(name+spect+number+img+price);
        return (<div className="submit_wrap">
            <div className="content">
                <div className="content_one">
                    <p>配送信息</p>
                </div>
                <div className="content_two" onClick={this.showAdd.bind(this)}>            
                    <p className="name_phone">                                        
                        <span className="name">{this.state.activeName}</span>
                        <span className="phone">{this.state.activePhone}</span>
                    </p>
                    <p className="address">{this.state.activeAdderss}</p>
                    <span className="icon">></span>
                </div>
                <div className="content_th">
                    <img src={img} alt=""/>
                    <div className="content_th_infor">
                        <p className="th_one">
                            <span className="th_one_name">{name}</span>
                            <span className="th_one_price">&#165;{price}</span>
                        </p>
                        <p className="th_two">
                            <span className="th_two_spect">{spect}</span>
                            <span className="th_two_number">x{number}</span>
                        </p>
                    </div>
                </div>
                <div className="content_fo">
                    <p>
                        <span className="pay_title">支付方式</span>
                        <span className="pay_money">现金支付</span>
                    </p>
                </div>
            </div>
            <div className="footer">
                <div className="total_price">
                    <span className="total_title">总价</span>
                    <span className="total_value">&#165;</span>
                
                </div>
                <div className="submit_btn" onClick={this.toindex.bind(this)}>提交订单</div>
            </div>
            {
                this.state.showAdderss == '1' ? <Adderss userInfor={this.state.userInfor} handlecloseAdderss={this.closeAdderss.bind(this)} handlechoiceAdd={this.choiceAdd.bind(this)}/> : null 
            }

                                            //传给Addersss组件，地址信息                                 back值返回页面                                                                                子组件传过来按钮的选择                                                                 
            </div>)
    }
}