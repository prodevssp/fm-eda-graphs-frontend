import { Button, Col, Drawer, Input, Modal, Row, Space, Tabs } from 'antd';
import Features from './components/Features';
import Chart from './components/Chart';
import { useState } from 'react';

import './App.css';
import { Pairplot } from './components/Pairplot';
import TextArea from 'antd/es/input/TextArea';

function App() {
  // const [data, setData] = useState([]);
  // const [columns, setColumns] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [method, setMethod] = useState('Pearson');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [heatMapData, setHeatMapData] = useState([]);
  const [pairPlotData, setPairPlotData] = useState([]);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const showDrawer = () => {
    setDrawer(true);
  };

  const onClose = () => {
    setDrawer(false);
  };

  const items = [
    {
      key: '1',
      label: 'Correlation map',
      children: (
        <Chart
          data={heatMapData}
          // method={method}
          // setMethod={setMethod}
          // setData={setData}
          // selectedColumns={selectedColumns}
        />
      ),
    },
    {
      key: '2',
      label: 'Correlation Pairplot',
      children: (
        <Pairplot selectedColumns={selectedColumns} data={pairPlotData} />
      ),
    },
  ];

  const onChangeHeatMapData = (e) => {
    const pastedData = e.target.value;

    try {
      const parsedData = JSON.parse(pastedData);

      // Check if it's an array of objects
      if (
        Array.isArray(parsedData) &&
        parsedData.every((item) => typeof item === 'object')
      ) {
        setHeatMapData(parsedData); // Update the state with the parsed data
      } else {
        // Handle the case where the data is not an array of objects
        console.error('Pasted data is not an array of objects');
      }
    } catch (error) {
      // Handle parsing error
      console.error('Failed to parse pasted data as JSON:', error);
    }
  };

  const onChangePairPlotData = (e) => {
    const pastedData = e.target.value;

    try {
      const parsedData = JSON.parse(pastedData);

      // Check if it's an array of objects
      if (
        Array.isArray(parsedData) &&
        parsedData.every((item) => typeof item === 'object')
      ) {
        setPairPlotData(parsedData); // Update the state with the parsed data
      } else {
        // Handle the case where the data is not an array of objects
        console.error('Pasted data is not an array of objects');
      }
    } catch (error) {
      // Handle parsing error
      console.error('Failed to parse pasted data as JSON:', error);
    }
  };

  return (
    <>
      {/* <Row justify="center">
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
      </Row> */}

      <Col span={8}>
        <Drawer
          title="Input Chart Data"
          placement={'left'}
          width={500}
          open={drawer}
          onClose={onClose}
        >
          <h2>Data for HeatMap</h2>
          <TextArea
            autoSize
            showCount
            onChange={onChangeHeatMapData}
            placeholder="can resize"
          />

          <h2>Data for Pairplot</h2>
          <TextArea
            autoSize
            showCount
            onChange={onChangePairPlotData}
            placeholder="can resize"
          />
        </Drawer>
      </Col>

      <Button
        type="primary"
        style={{
          position: 'fixed',
          left: -18,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)', // Added rotation and adjusted position
          backgroundColor: 'blueviolet',
          zIndex: 10,
        }}
        onClick={showDrawer}
      >
        Open
      </Button>

      {/* <Modal
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        width={'100%'}
        height={'100%'}
        open={open}
        footer={null}
        onCancel={handleClose}
      > */}
      <Tabs defaultActiveKey="1" type="card" size={'middle'} items={items} />
      {/* </Modal> */}
    </>
  );
}

export default App;
