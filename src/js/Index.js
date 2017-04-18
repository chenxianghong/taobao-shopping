import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import GoodsItem from './components/goodsItem';
import GoodsInfor from './components/GoodsInfor';

export default class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            loadInfor:'', // 登陆信息
            goodsList:'',  //商品列表
            showGoodsInfor:"0",  //是否显示商品详情1：显示，其他不显示
            activeGoods:'',
     }
       
    }

componentDidMount(){        //render渲染完成后执行
    this.getLoadInfor();
    this.getGoodsList();
}

getLoadInfor(){                //用户列表
    let  _url ='/api/loadInfor.json';
    const getLoadInfor = $.ajax({
        type:'GET',
        dataType:'json',
        asyc:true,
        url:_url,
        timeout:8000,
        success:((data)=>{
            console.log(data);
            this.setState({
                loadInfor : data.load,
            })
        }),
        error: (() =>{
            console.log('getLoadInfor-ajax 失败')
        })


    })
}
getGoodsList(){                     //商品列表
    let _url = '/api/goodsList.json';
   $.ajax({
        type:'GET',
        dataType:'json',
        asyc:true,
        url : _url,
        timeout:8000,
        success:((data) => {
            console.log(data);
            this.setState({
                goodsList : data.list,
            })
        }),
        error: (() => {
            console.log('getGoodsList ajax 失败');
        })


    })

} 
showGoodsList(val,val2){
         this.setState({
             showGoodsInfor:val,    //把sate状态编程传过来的val 值
             activeGoods:val2,
         })
     }
      
    render (){
      const goodsList = this.state.goodsList;   //获取商品值,因为并不知道有多少个<GoodsItem/>
      console.log(goodsList);              //是一个数组，可以直接遍历
      const goodsListArr = [];                  //存放GoodsItem的集合
      if(goodsList != ''){                      //只能forEach一个数组，最开始的this.state.goodsList是空值，这里判断是否为空
           goodsList.forEach((item,index) => {
          goodsListArr.push(<GoodsItem key ={index} activeGoods={item} handleshowGoodsList={this.showGoodsList.bind(this)}/>)     //key因为每个key值都是不相同的,拿到值后执行showGoodsList函数
      });
      }
    
        return(<div className = "wrap">
           <div className = "tab_header">
                <div className = "header_loader">Hi,{this.state.loadInfor.name}</div>            //用户名
                <div className = "header_btn">我的订单</div>
           </div>
           <div className = "tab_content">
           {goodsListArr}
               
            </div>
            {
                this.state.showGoodsInfor == "1"? <GoodsInfor activeGoods={this.state.activeGoods}/>:null   //判断为1显示，不为1 不显示
            }
        
        </div>)
    }
}