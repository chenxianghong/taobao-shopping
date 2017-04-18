import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';


export default class Adderss extends React.Component{
    constructor() {
        super();
    }
    closeAdderss() {          //向父组件传值 ，back按钮，0返回父组件
        let showAdderss = '0';
        this.props.handlecloseAdderss(showAdderss)
    }
    choiceAdd(item, e) {               //圆点点击事件，点击关闭，并向父组件传回选择的地址，选择的圆点增加class属性，变红，并删掉已有的红色按钮

        $(".adderss_radius").removeClass('active_radius');
        $(e.target).addClass('active_radius');
        let closeAdderss = '0';
        this.props.handlechoiceAdd(closeAdderss, item);
    }

    render() {
        let userInfor = this.props.userInfor;        //从父组件拿到的值
        console.log(userInfor);
        const adderssArr = [];
        userInfor.forEach((item, index) => {          //遍历userInfor,有多个地址，怎么多少个地址栏
            adderssArr.push(<div className="adderss_item" key={index}>
                <div className="adderss_radius" onClick={this.choiceAdd.bind(this, item)}></div>
                <div className="adderss_right">
                    <p className="adderss_n_p">
                        <span className="adderss_name">{item.name}</span>
                        <span className="adderss_phone">{item.mobile}</span>
                    </p>
                    <p className="adderss_more">{item.orderAdderss}</p>
                </div>
            </div>)
        
        })
        
        return(<div className="adderss_wrap">
                <div className="adderss_header">
                    <div className="back" onClick={this.closeAdderss.bind(this)}>back</div>
                    <p className="adderss_title">收货地址</p>
                </div>
                <div className="adderss_content">
                    {adderssArr}

                </div>
            </div>)
        }

}