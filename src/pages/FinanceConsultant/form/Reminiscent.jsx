import React from 'react';
import { Form } from 'antd';
import Input from '../../../components/common/Input';
import { Button } from '../../../components/styles';

const Reminiscent = ({ form, onOk, setReminiscent }) => {
  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <div className="financialConsultant-reminiscent">
      <span>Tên gợi nhớ</span>
      <Input placeholder="Nhập" onChange={(e) => setReminiscent(e.target.value)} />
      <div className="financialConsultant-reminiscent_button">
        <Button className="btn-danger" onClick={handleCancel}>
          Hủy
        </Button>
        <Button type="primary" onClick={() => onOk()}>
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default Reminiscent;
