import { Modal, Empty, Popover } from "antd";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Table from "../../../components/common/TableNormal";

export const HistoryModal = ({ historyList }) => {
  const { t } = useTranslation();
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    let arr = []
    historyList.map((item, index) => {
      arr.push({
        key: index,
        date: item.createdAt,
        name: item.hintName,
        total: item.sumInsured
      })
    })
    setDataTable(arr)
  }, [historyList])

  const columns = [
    {
      title: t("Date"),
      dataIndex: "date",
      key: "0",
    },
    {
      title: t("Name"),
      dataIndex: "name",
      key: "1",
    },
    {
      title: t("Total Amount"),
      dataIndex: "total",
      key: "2",
    },
  ];
  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return (
        <Table dataSource={dataTable} columnTable={columns}
          scroll={{
            y: 400,
          }}
        />
      );
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

  return (
    <div style={{width:'500px'}}>{table}</div>
  );
};
