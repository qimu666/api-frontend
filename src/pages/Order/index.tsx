import {Card, message, QRCode, Radio, Spin, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {history} from '@umijs/max';

import wechat from "../../../public/assets/WeChat.jpg";
import WxPay from "@/components/Icon/WxPay";
import ProCard from "@ant-design/pro-card";
import Alipay from "@/components/Icon/Alipay";
import {valueLength} from "@/pages/User/UserInfo";
import {useParams} from "@@/exports";
import {createOrderUsingPOST, queryOrderStatusUsingPOST} from "@/services/qiApi-backend/orderController";

const PayOrder: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<API.ProductOrderVo>();
  const [total, setTotal] = useState<any>("0.00");
  const [status, setStatus] = useState<string>('active');
  const [payType, setPayType] = useState<string>('WX');

  const params = useParams()

  const createOrder = async () => {
    setLoading(true)
    setStatus("loading")
    // @ts-ignore
    const res = await createOrderUsingPOST({productId: params.id, payType: payType})
    if (res.code === 0 && res.data) {
      setOrder(res.data)
      // @ts-ignore
      setTotal((res.data.total) / 100)
      setStatus("active")
      setLoading(false)
    }
    if (res.code === 50001) {
      history.back()
    }
  }
  const queryOrderStatus = async () => {
    const currentTime = new Date();
    const expirationTime = new Date(order?.expirationTime as any);
    if (currentTime > expirationTime) {
      setStatus("expired")
    }
    return await queryOrderStatusUsingPOST({orderNo: order?.orderNo})
  }

  const toAlipay = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    const res = await createOrderUsingPOST({productId: params.id, payType: "ALIPAY"})
    setLoading(true)
    message.loading("正在前往收银台,请稍后....")
    setTimeout(() => {
      document.write(res?.data?.formData as string);
      setLoading(false)
    }, 2000)
  }

  const changePayType = (value: string) => {
    setPayType(value);
  };

  useEffect(() => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    createOrder()
  }, [])

  useEffect(() => {
    if (payType === "ALIPAY") {
      toAlipay()
    }
  }, [payType])

  useEffect(() => {
    if (order && order.orderNo && order.codeUrl) {
      const intervalId = setInterval(async () => {
        // 定时任务逻辑
        const res = await queryOrderStatus()
        if (res.data && res.code === 0) {
          setLoading(true)
          message.loading("支付成功,打款中....")
          clearInterval(intervalId);
          setTimeout(function () {
            setLoading(false)
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/account/center');
          }, 2000);
        } else {
          console.log("支付中...")
        }
      }, 3000);
      if (status === "expired") {
        clearInterval(intervalId);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [order, status])

  return (
    <>

      <Card style={{minWidth: 385}}>
        <Spin spinning={loading}>
          <Card title={<strong>商品信息</strong>}>
            <div style={{marginLeft: 10}}>
              <h3>{order?.productInfo?.name}</h3>
              <h4>{valueLength(order?.productInfo?.description) ? order?.productInfo?.description : "暂无商品描述信息"}</h4>
            </div>
          </Card>
          <br/>
          <ProCard
            bordered
            headerBordered
            layout={"center"}
            title={<strong>支付方式</strong>}
          >
            <Radio.Group name="payType" value={payType}>
              <ProCard wrap gutter={18}>
                <ProCard
                  onClick={() => {
                    changePayType("WX")
                  }}
                  hoverable
                  style={{
                    border: payType === "WX" ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                    maxWidth: 260,
                    minWidth: 210,
                    margin: 10,
                  }}
                  colSpan={
                    {
                      xs: 24,
                      sm: 12,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }
                  }>
                  <Radio value={"WX"} style={{fontSize: "1.12rem"}}>
                    <WxPay/> 微信支付
                  </Radio>
                </ProCard>
                <ProCard
                  onClick={() => {
                    changePayType("ALIPAY")
                  }}
                  hoverable
                  style={{
                    margin: 10,
                    maxWidth: 260,
                    minWidth: 210,
                    border: payType === "ALIPAY" ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                  }}
                  colSpan={
                    {
                      xs: 24,
                      sm: 12,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }
                  }
                >
                  <Radio value={"ALIPAY"} style={{fontSize: "1.2rem"}}>
                    <Alipay/> 支付宝
                  </Radio>
                </ProCard>
              </ProCard>
            </Radio.Group>
          </ProCard>
          <br/>
          <Card title={"支付二维码"}>
            <br/>
            <ProCard
              style={{marginTop: -30}}
              layout={"center"}>
              <QRCode
                errorLevel="H"
                size={240}
                value={order?.codeUrl || '-'}
                // @ts-ignore
                status={status}
                onRefresh={() => {
                  createOrder()
                }}
              />
            </ProCard>
            <ProCard style={{
              marginTop: -30,
              color: "#f55f4e",
              fontSize: 22,
              display: 'flex',
              fontWeight: "bold",
            }} layout={"center"}>
              ￥{total}
            </ProCard>
            <ProCard style={{marginTop: -20}} layout={"center"}>
              <span>本商品为虚拟内容，购买后不支持<strong
                style={{color: "red"}}>退换</strong>。确认支付表示您已阅读并接受<a
                target={"_blank"}
                href={"https://gitee.com/qimu6/statement/blob/master/%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.md#%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE"}
                rel="noreferrer"> 用户协议 </a>
          如付款成功后10分钟后未到账，请联系站长微信：
             <Tooltip placement="bottom" title={<img src={wechat} alt="微信 code_nav" width="120"/>}>
               <a>aqimu66</a>
             </Tooltip>
            </span>
            </ProCard>
          </Card>
        </Spin>
      </Card>

    </>
  )
}

export default PayOrder;
