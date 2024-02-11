import { Button, Card, Checkbox, Form, message, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HEAT_MAP_FEATURES_LIMIT = process.env.REACT_APP_HEAT_MAP_FEATURES_LIMIT;

export const fetchCalc = async (columns, method, startDate, endDate) => {
  return axios
    .post(`${process.env.REACT_APP_API_BASE_URL}api/calc/`, {
      columns: columns,
      method: method.toLowerCase(),
      startDate: startDate,
      endDate: endDate,
      featuresLimit: HEAT_MAP_FEATURES_LIMIT,
    })
    .then((res) => {
      return res.data;
    });
};

const FetchFeatures = async (table) => {
  return await axios
    .get(`${process.env.REACT_APP_API_BASE_URL}api/features/`, {
      table: table,
    })
    .then((res) => {
      return res.data.features;
    });
};

const CSVColumns = ({
  columns,
  setData,
  handleOpen,
  method,
  selectedColumns,
  setSelectedColumns,
}) => {
  const [spinning, setSpinning] = useState(false);

  const onFinish = async () => {
    if (selectedColumns === undefined || selectedColumns.length === 0) {
      message.error('Please select columns.');
    } else {
      setSpinning(true);

      const data = await fetchCalc(selectedColumns, method);

      setData(data);
      setSpinning(false);
      handleOpen();
    }
  };

  const onChange = (e) => {
    const value = e.target.value;

    setSelectedColumns((prevSelectedColumns) => {
      // Check if the value is already in the array
      if (prevSelectedColumns.includes(value)) {
        // If the value is already selected, remove it
        return prevSelectedColumns.filter((column) => column !== value);
      } else {
        // If the value is not selected and the array length is less than 20, add it
        if (prevSelectedColumns.length <= HEAT_MAP_FEATURES_LIMIT) {
          return [...prevSelectedColumns, value];
        } else {
          // Optionally, show a message if the array already contains 20 items
          message.error('You can select a maximum of 20 features.');
          return prevSelectedColumns;
        }
      }
    });
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            marginBottom: 18,
          }}
        >
          {columns.map((item) => (
            <Checkbox
              style={{
                gap: '6px',
                fontSize: '20px',
              }}
              onChange={onChange}
              checked={selectedColumns.includes(item)}
              value={item}
            >
              {item}
            </Checkbox>
          ))}
        </div>

        <Button
          type="default"
          htmlType="submit"
          size="large"
          style={{
            width: '100%',
          }}
        >
          Submit
        </Button>
      </Form>

      <Spin spinning={spinning} fullscreen />
    </>
  );
};

const Features = ({
  setData,
  handleOpen,
  method,
  columns,
  setColumns,
  setSelectedColumns,
  selectedColumns,
}) => {
  useEffect(() => {
    const fetch = async () => {
      const features = await FetchFeatures();

      setColumns(features || []);
    };

    fetch().then((r) => {});
  }, []);

  return (
    <Card
      title={<h2>Select features</h2>}
      style={{
        width: '100%',
        marginTop: '60px',
        marginBottom: '60px',
      }}
    >
      <CSVColumns
        columns={columns}
        setData={setData}
        handleOpen={handleOpen}
        method={method}
        setSelectedColumns={setSelectedColumns}
        selectedColumns={selectedColumns}
      />
    </Card>
  );
};

export default Features;
