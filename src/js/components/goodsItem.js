import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';


export default class GoodsItem extends React.Component{
    constructor(){
        super();
    }
    showGoodsList(){
        let showGoodsList ='1';
        let activeGoods = this.props.activeGoods;    //从父级获取过来
        this.props.handleshowGoodsList(showGoodsList,activeGoods);  //传值得方法，里面填要传的值，让套用他的上一层组件传上值
        
}
    render(){
        let activeGoods = this.props.activeGoods;      //从父级取值
        return(
            
            <div className="goods_item" onClick={this.showGoodsList.bind(this)} >           
            <img src = {activeGoods.imgurl[0]} alt=""/>       //展示每一个商品的第一个图片
            <div className = "goods_item_infor">
                <p className ="item_name">{activeGoods.name}</p>             //对应的商品名称
                <p className = "item_price">&#165;{activeGoods.spectList[0].price}</p>         //第一个商品的价格
            </div>
           
        </div>)
    }
}