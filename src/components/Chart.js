import { ResponsiveHeatMap } from '@nivo/heatmap';
// import { fetchCalc } from './Features';
// import { Button, Form, DatePicker, Modal } from 'antd';
import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

// const labelStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '16px',
//   gap: '6px',
// };

// const inputStyle = {
//   width: 26,
//   height: 26,
// };

// const dateFormat = process.env.REACT_APP_DATE_FORMAT;

const Chart = ({ data, method, setMethod, selectedColumns, setData }) => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const [open, setOpen] = useState(false);

  // const methods = ['Pearson', 'Spearman', 'Kendall'];

  // const onChange = async (event) => {
  //   const localMethod = event.target.value;

  //   setMethod(localMethod);

  //   const data = await fetchCalc(selectedColumns, localMethod);

  //   setData(data);
  // };

  // const handleDateChange = async (event) => {
  //   const localStartDate = dayjs(event[0]).format(dateFormat);
  //   const localEndDate = dayjs(event[1]).format(dateFormat);

  //   let data;

  //   if (localStartDate || localEndDate) {
  //     data = await fetchCalc(
  //       selectedColumns,
  //       method,
  //       localStartDate,
  //       localEndDate
  //     );
  //   } else {
  //     data = await fetchCalc(selectedColumns, method);
  //   }

  //   setData(data);
  // };

  return (
    <div style={{ height: screenHeight * 0.9 }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 100, left: 200, right: 150, bottom: 100 }}
        valueFormat=">-.2f"
        axisTop={{
          tickSize: 8,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 8,
          tickPadding: 5,
        }}
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: '>-.2f',
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 4,
          },
        ]}
        colors={{
          type: 'sequential',
          scheme: 'yellow_orange_red',
          minValue: -1,
          maxValue: 1,
        }}
      />
    </div>
  );

  // if (data.length > 0) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: screenHeight - 170,
  //         marginTop: 28,
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: 'flex',
  //           alignItems: 'center',
  //           gap: '84px',
  //           marginBottom: '30px',
  //         }}
  //       >
  //         <div
  //           style={{
  //             display: 'flex',
  //             gap: '8px',
  //           }}
  //         >
  //           {methods.map((item) => (
  //             <label style={labelStyle}>
  //               <input
  //                 style={inputStyle}
  //                 type="radio"
  //                 value={item}
  //                 onChange={onChange}
  //                 checked={method === item}
  //               />
  //               {item}
  //             </label>
  //           ))}
  //         </div>

  //         <RangePicker
  //           size={'large'}
  //           format={dateFormat}
  //           onChange={handleDateChange}
  //         />
  //       </div>

  //       <ResponsiveHeatMap
  //         data={data}
  //         margin={{ top: 100, left: 200, right: 150, bottom: 100 }}
  //         valueFormat=">-.2f"
  //         axisTop={{
  //           tickSize: 5,
  //           tickPadding: 5,
  //           tickRotation: -45,
  //           legend: '',
  //           legendOffset: 46,
  //         }}
  //         legends={[
  //           {
  //             anchor: 'bottom',
  //             translateX: 0,
  //             translateY: 30,
  //             length: 400,
  //             thickness: 8,
  //             direction: 'row',
  //             tickPosition: 'after',
  //             tickSize: 3,
  //             tickSpacing: 4,
  //             tickOverlap: false,
  //             tickFormat: '>-.2f',
  //             title: 'Value →',
  //             titleAlign: 'start',
  //             titleOffset: 4,
  //           },
  //         ]}
  //         colors={{
  //           type: 'sequential',
  //           scheme: 'yellow_orange_red',
  //           minValue: -1,
  //           maxValue: 1,
  //         }}
  //       />

  //       <Button
  //         style={{
  //           position: 'absolute',
  //           bottom: 0,
  //           right: '200px',
  //           background: 'red',
  //         }}
  //         size="large"
  //         onClick={() => setOpen(!open)}
  //         type="primary"
  //       >
  //         Review Features
  //       </Button>

  //       <Modal
  //         title={<h2>Review Features</h2>}
  //         width={600}
  //         height={500}
  //         open={open}
  //         footer={null}
  //         onCancel={() => {
  //           setOpen(false);
  //         }}
  //       >
  //         <Form>
  //           <Form.Item name="columns">
  //             <div
  //               style={{
  //                 display: 'flex',
  //                 gap: '8px',
  //                 flexDirection: 'column',
  //                 alignItems: 'start',
  //               }}
  //             >
  //               {selectedColumns.map((item) => (
  //                 <label
  //                   style={{
  //                     display: 'flex',
  //                     gap: '6px',
  //                     alignItems: 'center',
  //                     justifyContent: 'center',
  //                     fontSize: '18px',
  //                   }}
  //                 >
  //                   <input
  //                     style={{
  //                       width: 20,
  //                       height: 20,
  //                     }}
  //                     type="checkbox"
  //                     value={item}
  //                     checked
  //                     disabled
  //                   />
  //                   {item}
  //                 </label>
  //               ))}
  //             </div>
  //           </Form.Item>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // }
};

export default Chart;
