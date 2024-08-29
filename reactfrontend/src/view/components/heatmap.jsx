import React from 'react'
// import React from 'react';
// import { Chart, Heatmap } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS,  registerables } from 'chart.js';
import { Legend,Title ,Tooltip } from 'chart.js';
import { MatrixController ,MatrixElement} from 'chartjs-chart-matrix';
// import { Chart as ChartJS, registerables } from 'chart.js';


ChartJS.register(...registerables,MatrixController,MatrixElement, Legend, Title, Tooltip)
const Heatmapchart = ({data,selectedtypes}) => {
 
  const labels = Array.from(new Set(data.map(item => item.date_range)));
  const materialTypes = Array.from(new Set([...data.map(item => item.material_type), ...selectedtypes]));

  const matrixData = materialTypes.map(material => {
    return labels.map(label => {
      const found = data.find(item => item.material_type === material && item.date_range === label);
      return found ? found.predicted_quality : 0;
    });
  });

  const heatmapData = {
    labels: labels,
    datasets: materialTypes.map((material, index) => ({
      label: material,
      data: matrixData[index],
      backgroundColor: (context) => {
        const value = context.raw;
        const alpha = value / 100;
        return `rgba(255, 99, 132, ${alpha})`;
      },
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: labels,
        title: {
          display: true,
          text: 'Date Range'
        }
      },
      y: {
        type: 'category',
        labels: materialTypes,
        title: {
          display: true,
          text: 'Material Type'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Predicted Quality: ${context.raw}`
        }
      }
    }
  };
  
  return (
    <div className='h-48 bg-gray-300 
    mt-2 flex items-center justify-center pt-1 mb-4'>
          <Chart type='matrix' data={heatmapData} options={options} />
    </div>
  )
}

export default Heatmapchart