import React, {Button, Checkbox} from 'antd';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import FilterIcon from '../../assets/images/icons/filter.svg';

export default function FilterCommon(props) {
  const {t} = useTranslation();
  const {options, setPayload} = props;
  const [isShowFilter, setIsShowFilter] = useState(false);

  const showListFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  const checkFilter = (checkedValues) => {
    setPayload(checkedValues);
  };

  return (
    <div className="filter">
      <Button onClick={showListFilter} className={`filter__btn ${isShowFilter && 'filter__btn--active'}`}>
        {t('common.filter')}
        <img src={FilterIcon} alt=""/>
      </Button>
      {
        isShowFilter && (
          <div className="filter__list">
            <div>
              <Checkbox.Group options={options} defaultValue={['Apple']} onChange={checkFilter} className="checkbox-item"/>
            </div>
          </div>
        )
      }
    </div>
  );
}
