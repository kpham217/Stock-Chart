
// import React from "react";
// import PropTypes from "prop-types";

// import { scaleTime } from "d3-scale";
// import { curveMonotoneX } from "d3-shape";
// import { format } from "d3-format";
import classes from './Canvas.module.css';
// import { ChartCanvas, Chart } from "react-stockcharts";
// import { AreaSeries } from "react-stockcharts/lib/series";
// import { XAxis, YAxis } from "react-stockcharts/lib/axes";
// import { fitWidth } from "react-stockcharts/lib/helper";
// import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
// import {
// 	CrossHairCursor,
// 	MouseCoordinateX,
// 	MouseCoordinateY
// } from "react-stockcharts/lib/coordinates";
// const canvasGradient = createVerticalLinearGradient([
// 	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
// 	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
// 	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
// ]);

// class AreaChart extends React.Component {
// 	render() {
//         const { data, type, width, ratio } = this.props;
//         console.log(ratio +" " + width);
// 		return (
// 			<ChartCanvas className={classes.canvas} ratio={ratio} width={width} height={500}
// 				margin={{ left: 50, right: 50, top: 100, bottom: 30 }}
// 				// display='block'
// 				seriesName="MSFT"
// 				data={data} type={type}
// 				xAccessor={d => d.date}
// 				xScale={scaleTime()}

// 				// xExtents={[new Date(2020, 11, 19), new Date(2020, 12, 21)]}
// 			>
// 				<Chart id={0} yExtents={d => d.close}>
// 					<defs>
// 						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
// 							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
// 							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
// 							<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
// 						</linearGradient>
// 					</defs>
// 					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
// 					<YAxis axisAt="left" orient="left" />
// 					<MouseCoordinateY
// 						at="right"
// 						orient="right"
// 						displayFormat={format(".2f")}
// 					/>
// 					<AreaSeries
// 						yAccessor={d => d.close}
// 						fill="url(#MyGradient)"
// 						strokeWidth={2}
// 						interpolation={curveMonotoneX}
// 						canvasGradient={canvasGradient}
// 					/>
// 				</Chart>
// 			</ChartCanvas>
// 		);
// 	}
// }


// AreaChart.propTypes = {
// 	data: PropTypes.array.isRequired,
// 	width: PropTypes.number.isRequired,
// 	ratio: PropTypes.number.isRequired,
// 	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
// };

// AreaChart.defaultProps = {
// 	type: "svg",
// };
// AreaChart = fitWidth(AreaChart);

// export default AreaChart;
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickChartWithCHMousePointer extends React.Component {
	render() {
		const { type, data: initialData, width, ratio } = this.props;

		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			d => d.date
		);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			initialData
		);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas
				height={400}
				ratio={ratio}
				width={width}
				className={classes.canvas}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} yExtents={[d => [d.high, d.low]]} style={{position:'absolute'}}>
					<XAxis axisAt="bottom" orient="bottom" />
					<YAxis axisAt="right" orient="right" ticks={5} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")}
					/>
					<CandlestickSeries />
					<OHLCTooltip forChart={1} origin={[-40, 0]} />
				</Chart>
				{/* <Chart
					id={2}
					height={150}
					yExtents={d => d.volume}
					origin={(w, h) => [0, h - 150]}
				>
					<YAxis
						axisAt="left"
						orient="left"
						ticks={6}
						tickFormat={format(".0s")}
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")}
					/>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")}
					/>

					<BarSeries
						yAccessor={d => d.volume}
						fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
					/>
				</Chart> */}
				<Chart id={2} yExtents={d => d.volume}>
        <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
        <BarSeries yAccessor={d => d.volume} />
    </Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithCHMousePointer.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithCHMousePointer.defaultProps = {
	type: "svg"
};
CandleStickChartWithCHMousePointer = fitWidth(
	CandleStickChartWithCHMousePointer
);

export default CandleStickChartWithCHMousePointer;