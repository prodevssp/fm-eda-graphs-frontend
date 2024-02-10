import { UploadOutlined } from '@ant-design/icons';
import {
  Upload,
  Button,
  Card,
  message,
  Checkbox,
  List,
  Form,
  Spin,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';

const CSVUploader = ({ setColumns, setFile }) => {
  const props = {
    name: 'file',
    accept: '.csv',
    action: `${process.env.REACT_APP_API_BASE_URL}api/upload/`,
    maxCount: 1,
    onChange(info) {
      if (info.file.status === 'done') {
        setColumns(info.file.response.columns);
        setFile(info.file.response.file);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button type="primary" icon={<UploadOutlined />}>
        Upload CSV
      </Button>
    </Upload>
  );
};

const CSVColumns = ({ columns, file, setData }) => {
  const [spinning, setSpinning] = useState(false);

  const onFinish = (values) => {
    if (values.columns === undefined || values.columns.length === 0) {
      message.error('Please select columns.');
    } else {
      setSpinning(true);
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}api/calc/`, {
          file: file,
          columns: values.columns,
        })
        .then((res) => {
          setData(res.data);
          setSpinning(false);
        });
    }
  };

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item name="columns">
          <Checkbox.Group style={{ width: '100%' }}>
            <List
              style={{
                width: '100%',
              }}
              header={<h3>Select Columns</h3>}
              dataSource={columns}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox value={item}>{item}</Checkbox>
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </Form.Item>
        {columns.length ? (
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        ) : (
          ''
        )}
      </Form>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};

const CSVLoader = ({ setData }) => {
  const [columns, setColumns] = useState([]);
  const [file, setFile] = useState('');

  return (
    <Card
      title={<h2>Load CSV</h2>}
      style={{
        width: '100%',
        marginTop: '60px',
        marginBottom: '60px',
      }}
    >
      <CSVUploader setColumns={setColumns} setFile={setFile} />
      <CSVColumns columns={columns} file={file} setData={setData} />
    </Card>
  );
};

export default CSVLoader;
