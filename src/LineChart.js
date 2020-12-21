// import React,{Fragment} from 'react';
// import PropTypes from 'prop-types'
// import Plot from 'react-plotly.js';

// const LineChart = ({symbolData, color}) => {
//     return (
//         <Fragment>
//             <Plot
//                 data={[
//                     {
//                         x: symbolData.stock_symbol,
//                         y: financialItem.timeValues,
//                         type: 'scatter',
//                         mode: 'lines+markers',
//                         marker: {color: color},
//                     }
//                 ]}
//                 layout={{width: 720, height: 440, title: symbolData.stock_symbol}}
//                 options ={ {displaylogo: 'false'} }
//             />
//         </Fragment>
//     );
// };


// export default LineChart;
import React,{Fragment} from 'react';
import PropTypes from 'prop-types'
import Plot from 'react-plotly.js';

const LineChart = ({financialItem,financialItemName,color}) => {
    return (
        <Fragment>
            <Plot
                data={[
                    {
                        x: financialItem.financialChartXValues,
                        y: financialItem.financialChartCloseValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: color},
                    }
                ]}
                layout={{width: 720, height: 440, title: financialItemName}}
                options ={ {displaylogo: 'false'} }
            />
        </Fragment>
    );
};

LineChart.propTypes = {
    financialItem: PropTypes.object.isRequired,
    financialItemName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default LineChart;