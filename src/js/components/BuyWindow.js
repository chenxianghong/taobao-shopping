import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

export default class BuyWindow extends React.Component{
    constructor(){
        super();
        this.state={
            activePrice: '',
            activeQuantity: '',
            number:1,
            spectIsOk:'0',
            activeSpect: '',
           

        }
    }
    closeBuyWindow(){
        let showBuyWindow ='0';
        this.props.handlecloseBuyWindow(showBuyWindow);       //向父组件传值
    }
    choiceSpect(e){  
        this.setState({
            spectIsOk:"1",
        })
        $(".buy_spect_li").removeClass("buy_spect_active");        //点击的当前li背景变成红色
        $(e.target).addClass("buy_spect_active");
        this.props.spectList.forEach((item,index) =>{
            if($(e.target).text() == item.spect){
                this.setState({
                    activePrice:item.price,
                    activeQuantity:item.quantity,
                    activeSpect:item.spect,
                })
            }
        })
    }
    decrease(){
        if(this.state.number > 1){
             let number = this.state.number;
        this.setState({
            number :number-1,
        })
        }
       
    }
    add(){
        if(this.state.number <this.state.activeQuantity){
            let number =this.state.number;
            this.setState({
                number:number+1,
            })
        }
    }
    sureSpect(){         //向GoodsInfor传值，点击确认，隐藏BuyWindow组件
        if(this.state.spectIsOk == '1'){
             let showBuyWindow = '0';
             let spect = this.state.activeSpect;
             let price = this.state.activePrice;
             let number = this.state.number;

        this.props.handlesureSpect(showBuyWindow,spect,price,number);
        }
       

    }
    render(){
         let spectList = this.props.spectList;
         let minMax = this.props.minMax;
         console.log(spectList);
         const spectListArr = [];
         spectList.forEach((item,index) =>{
             if(item.quantity > 0){
                  spectListArr.push(<li className="buy_spect_li" onClick={this.choiceSpect.bind(this)} key={index}>{item.spect}</li>)
             }else{
                  spectListArr.push(<li  className="buy_spect_gray" key={index}>{item.spect}</li>)
             }
            
         })
         let  activePrice =this.state.activePrice;
         if(this.state.activePrice ==''){
             activePrice=minMax;
         }
        return(
           
            <div className="buy_wrap">
            <div className="buy_gray" onClick={this.closeBuyWindow.bind(this)} ></div>
              <div className="buy_content">
               <div className="buy_content_item buy_price">
                 <div className=" buy_left buy_price_title">单价</div>
                  <div className="buy_price_wrap">
                    <span className = "price_value">&#165;{activePrice }</span>
                    <span className = "price_quantity">{this.state.activeQuantity}</span>
                  </div>
               </div>
                <div className="buy_content_item buy_spect">
                    <div className = "buy_left buy_spect_title">规格</div>
                    <div className = "buy_spect_wrap">
                        <ul>
                           { spectListArr}
                        </ul>
                    </div>
                </div>
                 <div className="buy_content_item buy_number">
                    <div className = "buy_left buy_number_title">数量</div>
                    <div className = "buy_number_wrap">
                        <ul>
                            <li className = "buy_number_decrease" onClick={this.decrease.bind(this)}>-</li>
                            <li className="buy_number_value">{this.state.number}</li>
                            <li className = "buy_number_add" onClick={this.add.bind(this)}>+</li>
                        </ul>
                    </div>
            
                 
                 </div>
                  <div className="buy_ok" onClick ={this.sureSpect.bind(this)}>
                    <a href="javascript:;">确认</a>
                  </div>
                  </div>
            </div>
            
        )
    }
}
