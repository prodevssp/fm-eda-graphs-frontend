import { Col, Modal, Row, Tabs } from 'antd';
import Features from './components/Features';
import Chart from './components/Chart';
import { useState } from 'react';

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('Pearson');
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const items = [
    {
      key: '1',
      label: 'Correlation map',
      children: (
        <Chart
          data={data}
          method={method}
          setMethod={setMethod}
          setData={setData}
          selectedColumns={selectedColumns}
        />
      ),
    },
    {
      key: '2',
      label: 'Correlation Pairplot',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <>
      <Row justify="center">
        <Col span={8}>
          <Features
            setData={setData}
            handleOpen={handleOpen}
            method={method}
            columns={columns}
            setColumns={setColumns}
            setSelectedColumns={setSelectedColumns}
            selectedColumns={selectedColumns}
          />
        </Col>
      </Row>

      <Modal
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        width={'100%'}
        open={open}
        footer={null}
        onCancel={handleClose}
      >
        <Tabs defaultActiveKey="1" type="card" size={'middle'} items={items} />
      </Modal>
    </>
  );
}

export default App;
