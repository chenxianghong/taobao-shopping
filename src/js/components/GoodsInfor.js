import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import BuyWindow from './BuyWindow'

export default class GoodsInfor extends React.Component{
    constructor() {
        super();
        this.state = {
            showBuyWndow: '0',//是否展示BuyWindow1：展示；其他不展示
            activePrice: '',
            activeSpect: '商品规格',
            activeNumber: '',
            // toSubmit: '0', //1:提交
        }
    }
    showBuyWndow() {
        this.setState({
            showBuyWndow : '1',
        })
    }
    closeBuyWindow(val) {
        this.setState({
            showBuyWndow : val,
        })
    }
    sureSpect(val, spect, price, number) {
        this.setState({
            showBuyWndow: val,
            activeSpect: spect,
            activePrice: price,
            activeNumber: number,
        })
    }
    toSubmit() {
        if(this.state.activeNumber != '') {
            let name = encodeURIComponent(this.props.activeGoods.name);
            let price = this.state.activePrice;
            let spect = encodeURIComponent(this.state.activeSpect);
            let number = this.state.activeNumber;
            let img = this.props.activeGoods.imgurl[0];
            let url = '/submit.html?name=' + name + '&price=' + price + '&spect=' + spect + '&number=' + number + '&img=' + img;
            location.href = url;
        }
    }    
    render() {
        let activeGoods = this.props.activeGoods;
        const imgArr = [];
        activeGoods.imgurl.forEach((item, index) => {
            imgArr.push(<img src={item} alt="" key={index} />)
        })
        var mixPrice = activeGoods.spectList[0].price;
        var maxPrice = activeGoods.spectList[0].price;
        activeGoods.spectList.forEach((item, index) => {
            if(mixPrice > item.price) {
                mixPrice = item.price;
            }
            if(maxPrice < item.price) {
                maxPrice = item.price;
            };
        })
        const minMax = mixPrice + "~" + maxPrice;
        let activePrice = this.state.activePrice;
        if(activePrice == '') {
            activePrice = minMax;
        }
        return (<div className="goods_infor_wrap">
            <div className="infor_wrap infor_one">
                <img src={activeGoods.imgurl[0]} alt="" />
                <div className="one_wrap">
                    <h3 className="one_name">{activeGoods.name}</h3>
                    <p className="one_price">&#165;{activePrice}</p>
                </div>
            </div>
            <div className="infor_wrap infor_two" onClick={this.showBuyWndow.bind(this)}>
                <p>选择&nbsp;{this.state.activeSpect}
                    <span>></span>
                </p>
                
            </div>
            <div className="infor_wrap infor_th">
                <h2>商品详情</h2>
                <p>{activeGoods.name}</p>
                {imgArr}
            </div>
            <div className="infor_wrap infor_fo" onClick={this.toSubmit.bind(this)}>
                <a href="javascript:;">立即购买</a>
            </div>
            {
                this.state.showBuyWndow == '1'? <BuyWindow spectList={activeGoods.spectList} minMax={minMax} handlecloseBuyWindow={this.closeBuyWindow.bind(this)} handlesureSpect={this.sureSpect.bind(this)}/> : null
            }
            
            </div>)
    }
}


