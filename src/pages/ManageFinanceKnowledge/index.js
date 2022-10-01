import { Button, Col, Layout, List, Row, Segmented, Spin, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { options } from '../../assets/fake-data/data';
import { MANAGEMENT_CONTENT } from '../../ultis/constant';
import IconPlus from '../../assets/images/icons/plus.svg';
import Pagination from '../../components/common/Pagination';
import ModalConfirm from '../../components/ModalConfirm';
import Title from '../../components/Title';
import { createContent, deleteContent, retrieveData, updateContent } from '../../slices/managementContent';
import { DEFAULT_SIZE, LOADING_STATUS } from '../../ultis/constant';
import FinanceKnowledgeContent from './FinanceKnowledgeContent';
import QuestionAnswerContent from './QuestionAnswerContent';
import * as S from '../../components/styles';

const ManageFinanceKnowledge = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.managementContentReducer);
  const loading = useSelector((state) => state.loading.loading);

  const [itemContent, setItemContent] = useState(null);
  const [prevItem, setPrevItem] = useState(null);
  const [option, setOption] = useState('articles');
  const [paginate, setPaginate] = useState({
    limit: DEFAULT_SIZE,
    offset: 0,
  });
  const [fileList, setFileList] = useState(null);
  const [editDisabled, setEditDisabled] = useState(true);

  const handleChange = (e) => {
    let values;
    const name = e.target.name;
    values = { ...itemContent, [name]: e.target.value };
    setItemContent(values);
  };

  const handleFileList = ({ fileList: newFile }) => {
    if (newFile[0]?.originFileObj.size > 200000) {
      notification.error({
        message: 'Kích thước ảnh quá lớn',
        duration: 2,
        placement: 'topLeft',
        icon: false,
      });
      return;
    }
    setFileList(newFile);
    setItemContent({ ...itemContent, image: newFile[0]?.originFileObj });
  };

  const handleSave = (item) => {
    if (!item) {
      ModalConfirm({
        content: `Vui lòng nhập nội dung bài viết`,
        callApi: () => {
          return;
        },
      });
    } else {
      if (option !== MANAGEMENT_CONTENT[0].value) {
        if (!item.id) {
          dispatch(createContent({ type: option, payload: item }));
          setItemContent(null);
          setFileList([]);
          setEditDisabled(true);
        } else {
          dispatch(updateContent({ type: option, id: item.id, payload: item }));
          setItemContent(null);
          setFileList([]);
          setEditDisabled(true);
        }
      } else {
        const formData = new FormData();
        formData.append('image', item.image);
        formData.append('title', item.title);
        formData.append('subTitle', item.subTitle);
        formData.append('url', item.url);
        formData.append('body', item.body);
        if (!item.id) {
          dispatch(createContent({ type: option, payload: formData }));
          setItemContent(null);
          setFileList([]);
          setEditDisabled(true);
        } else {
          dispatch(updateContent({ type: option, id: item.id, payload: formData }));
          setItemContent(null);
          setFileList([]);
          setEditDisabled(true);
        }
      }
    }
  };

  const handleCancel = () => {
    setItemContent(prevItem);
    setEditDisabled(true);
    if (!prevItem) {
      setItemContent(null);
      setFileList(null);
    }
  };

  const handleDelete = (item) => {
    if (item) {
      ModalConfirm({
        content: `Xác nhận xóa nội dung`,
        callApi: () => {
          dispatch(deleteContent({ type: option, id: item.id })), setItemContent(null);
        },
      });
    } else {
      ModalConfirm({
        content: `Chọn nội dung cần xóa`,
        callApi: () => {
          return;
        },
      });
    }
  };

  const handleAddNew = () => {
    setEditDisabled(false);
    setItemContent(null);
    setFileList(null);
  };

  const handleChangeOption = (e) => {
    setEditDisabled(true);
    setItemContent(null);
    setFileList(null);
    setOption(e);
  };

  useEffect(() => {
    //fetch data
    dispatch(retrieveData({ type: option, params: paginate }));
  }, [option, contents.isReload, paginate]);

  return (
    <div className="manageFinanceKnowledge">
      <S.PageHeader
        className="site-page-header-responsive"
        backIcon={false}
        onBack={() => window.history.back()}
        title={t('manage content.title')}
      ></S.PageHeader>
      <Layout className="manageFinanceKnowledge-container">
        <Row gutter={[16, 10]} justify="start" align="stretch">
          <Col lg={7} md={24} sm={24} xs={24}>
            <Layout.Content>
              <div className="list-option">
                <Segmented
                  options={MANAGEMENT_CONTENT}
                  onChange={handleChangeOption}
                  defaultValue={option}
                  value={option}
                />
              </div>
              <Spin spinning={loading === LOADING_STATUS.pending}>
                <List
                  className="manageFinanceKnowledge-container_list"
                  size="small"
                  header={
                    <Title
                      title={
                        option !== MANAGEMENT_CONTENT[1].value
                          ? t('manage content.articles list title')
                          : t('manage content.q&a list title')
                      }
                    />
                  }
                  footer={
                    <Button
                      // type="primary"
                      className="btn-add-new "
                      icon={<img src={IconPlus} alt="" />}
                      onClick={handleAddNew}
                    >
                      Thêm mới
                    </Button>
                  }
                  dataSource={contents.data}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => {
                        setItemContent(item);
                        setPrevItem(item);
                        setFileList([{ url: item.image }]);
                        setEditDisabled(true);
                      }}
                      className={`${item.id === itemContent?.id ? 'active' : ''}`}
                    >
                      <Typography.Text ellipsis>{item.title || item.question}</Typography.Text>
                    </List.Item>
                  )}
                ></List>
              </Spin>
              <Pagination total={contents.totalItem} setPaginate={setPaginate} showSizeChanger={false}></Pagination>
            </Layout.Content>
          </Col>

          <Col xs={16} lg={17} flex={1}>
            <Layout.Content className="manageContent">
              {option !== MANAGEMENT_CONTENT[1].value ? (
                <FinanceKnowledgeContent
                  content={itemContent}
                  onChange={handleChange}
                  onUpload={handleFileList}
                  fileList={fileList}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onCancel={handleCancel}
                  isEdit={editDisabled}
                  setEdit={setEditDisabled}
                />
              ) : (
                <QuestionAnswerContent
                  onChange={handleChange}
                  content={itemContent}
                  onDelete={handleDelete}
                  onCancel={handleCancel}
                  onSave={handleSave}
                  isEdit={editDisabled}
                  setEdit={setEditDisabled}
                />
              )}
            </Layout.Content>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default ManageFinanceKnowledge;
