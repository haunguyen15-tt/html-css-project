import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {sendEvent} from '../../../slices/events';
import {Col, Form, Input, Row, Button} from "antd";
import {VALIDATE_MESSAGES} from '../../../ultis/constant';

const { TextArea } = Input;

export default function SendSmsContent(props) {
  const {t} = useTranslation();
  const {setVisibleModalSms, eventId} = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const customerId = useSelector((state) => state.customerCare.customerId);

  const sendEmail = (values) => {
    values.type = "sms";
    values.customerId = customerId;
    values.eventId = eventId;
    dispatch(sendEvent(values))
  }

  return <Form layout="vertical" form={form} validateMessages={VALIDATE_MESSAGES} onFinish={sendEmail}>
    <Row gutter={[8, 23]}>
      <Col span={24}>
        <Form.Item
          label={t('customer care.sms content')}
          name="content"
          rules={[{required: true}]}>
          <TextArea rows={4} placeholder={t('common.input')} className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModalSms(false)}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" className="btn-primary" htmlType="submit" type="primary">
            {t('customer care.sms title')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
