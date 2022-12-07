import React, { useState } from 'react';
import { Divider, Radio, Table, Space, Pagination, Input } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
      {
        text: 'Sidney ',
        value: 'Sidney ',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Right',
    dataIndex: 'right',
    render: (_, record) => (
      <Space size="middle">{record.right ? '✅' : '⛔'}</Space>
    ),
    filters: [
      {
        text: '✅',
        value: true,
      },
      {
        text: '⛔',
        value: false,
      },
    ],
    onFilter: (value, record) => value === record.right,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    right: true,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    right: true,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    right: false,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User1',
    age: 99,
    right: false,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Disabled User2',
    age: 99,
    right: false,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Disabled User3',
    age: 99,
    right: false,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Disabled User4',
    age: 99,
    right: false,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const App = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [filterNameValue, setFilterNameValue] = useState('');
  const [filterAddressValue, setFilterAddressValue] = useState('');

  const onPaginationChange = (selectedPage, selectedPageSize) => {
    setCurrentPage(selectedPage);
    setPageSize(selectedPageSize);
  };
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data.filter(
          (singleData, index) =>
            index + 1 > (currentPage - 1) * pageSize &&
            index + 1 <= currentPage * pageSize &&
            singleData.name.indexOf(filterNameValue) === 0 &&
            singleData.address.indexOf(filterAddressValue) === 0
        )}
        pagination={false}
      />
      <Divider />
      <Pagination
        onChange={onPaginationChange}
        total={data.length}
        pageSize={pageSize}
        pageSizeOptions={[1, 2, 3, 4, 5]}
        showSizeChanger
        currentPage={currentPage}
      />

      <Divider />
      <Input
        placeholder="filter on change name"
        value={filterNameValue}
        onChange={(e) => setFilterNameValue(e.target.value)}
      />

      <Divider />
      <Input
        placeholder="filter on change address"
        value={filterAddressValue}
        onChange={(e) => setFilterAddressValue(e.target.value)}
      />
    </div>
  );
};
export default App;
