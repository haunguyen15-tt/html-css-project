import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {DatePicker, Select, Col, Form, Input, Row, Button} from "antd";
import {VALIDATE_MESSAGES, FORMAT_DATE} from '../../../../ultis/constant';
import {useTranslation} from 'react-i18next';
import {getData, createData, updateData} from '../../../../slices/events';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

export default function AddEventContent(props) {
  const {t} = useTranslation();
  const {detailData, isTemplate, setVisibleModalAddEvent} = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSaveEvent = (values) => {
    values.date = moment(values.date)
    if (Object.keys(detailData).length > 0) {
      values.id = detailData.id
      dispatch(updateData(values))
    } else {
      dispatch(createData(values))
    }
  }

  // const getTemplate = (val) => {
  //   dispatch(getData({isTemplate: 1, date: moment(val).toISOString()}))
  // }

  useEffect(() => {
    if (Object.keys(detailData).length > 0) {
      form.setFieldsValue({...detailData, ...{date: moment(detailData.date)}})
    } else {
      form.resetFields()
    }
  }, [detailData])

  return <Form layout="vertical" form={form} validateMessages={VALIDATE_MESSAGES} onFinish={handleSaveEvent}>
    <Row gutter={[6, 13]}>
      <Col span={6}>
        <Form.Item
          label={t('common.date')}
          name="date"
          rules={[{required: true}]}>
          <DatePicker className="input-item-outline" format={FORMAT_DATE} />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          label={t('common.type')}
          name="type"
        >
          <Select placeholder={t('common.select')} className="select-item-outline">
            <Option value="Hằng năm">Hằng năm</Option>
            <Option value="Một lần">Một lần</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label={t('common.event')}
          name="name"
          rules={[{required: true}]}>
          <Input className='input-item-outline' placeholder="Nhập" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label={t('customer care.event template')}
          name="isTemplate"
          rules={[{required: true}]}>
          <Select placeholder={t('common.select')} className="select-item-outline">
            <Option value={true}>Có</Option>
            <Option value={false}>Không</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label={t('customer care.sms template')}
          name="smsTemplate"
          rules={[{required: true}]}>
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24} className="m-b-10">
        <Form.Item
          label={t('customer care.email template')}
          name="emailTemplate"
          rules={[{required: true}]}>
          <TextArea rows={4} placeholder="Nhập" className="input-item-outline"/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item className="footer-modal">
          <Button key="back" className="btn-danger" onClick={() => setVisibleModalAddEvent(false)}>
            {t('common.cancel')}
          </Button>
          <Button key="submit" className="btn-primary" htmlType="submit" type="primary">
            {Object.keys(detailData).length > 0 ? t('common.save') : t('common.create')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
}
