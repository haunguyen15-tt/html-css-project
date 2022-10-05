import { Row, Col, Space, Checkbox } from 'antd';
import { LeftOutlined, RightOutlined, CopyOutlined, FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Link, useParams } from 'react-router-dom';

import { getCustomerCallById } from '../../services/customerCalls';
import CallRecordInfo from './CallRecordInfo';
import CustomerSumaryInfo from './CustomerSumaryInfo';
import CustomerVoiceCall from './CustomerVoiceCall';


export default function CallDetails() {
  const [callData, setCallData] = useState({ callRecord: {}, customerInfo: {}, customerCall: {} })
  const params = useParams();
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerCall = await getCustomerCallById(params.customerCallId || 0);
        setCallData({
          ...callData,
          callRecord: customerCall?.latestCall,
          customerInfo: customerCall?.customerCall?.customer,
          customerCall: {
            noteCount: customerCall?.customerCall?.noteCount,
            id: customerCall?.customerCall?.id,
            isPotential: customerCall?.customerCall?.isPotential,
          }
        })
        // console.log('customerCall api', customerCall);
      } catch (error) {
        console.log('customerCall api err', error);
      }
    };

    fetchData();
  }, []);
  // console.log('callData', callData);

  if (!callData.callRecord) 
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 300 }}>
        <S.WrapText $color={S.gray200}>{`Không có cuộc gọi nào`}</S.WrapText>
      </div>
    )

  return (
    <div>
      <Space align="center" size={14} style={{ padding: '16px 0' }}>
        <Link to="/dashboard">
          <S.BtnIcon>
            <LeftOutlined />
          </S.BtnIcon>
        </Link>
        <S.WrapHeader>
          <h3>{`Gọi điện`}</h3>
        </S.WrapHeader>
      </Space>
      <Row gutter={[15, 15]}>
        <Col lg={8} md={24}>
          <Row gutter={[15, 15]} style={{ height: '100%' }}>
            <Col span={24}>
              <S.WrapContainer>
                <CallRecordInfo callrecordData={callData.callRecord} customerData={callData.customerInfo} customerCallData={callData.customerCall}/>
              </S.WrapContainer>
            </Col>
            <Col span={24}>
              <S.WrapContainer>
                <CustomerSumaryInfo customerData={callData.customerInfo} />
              </S.WrapContainer>
            </Col>
          </Row>
        </Col>
        <Col lg={16} md={24}>
          <S.WrapContainer>
            <CustomerVoiceCall />
          </S.WrapContainer>
        </Col>
      </Row>
    </div>
  );
}
