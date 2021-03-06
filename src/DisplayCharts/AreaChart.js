
import React from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import classes from '../styles/Canvas.module.css';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";
const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {
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
			<ChartCanvas ratio={ratio} width={width} height={400}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				seriesName="MSFT"
                data={data} type={type}
                className={classes.canvas}
				xAccessor={xAccessor}
				xScale={xScale}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={0} yExtents={d => d.close}>
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="right" orient="right" />
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")}
					/>
					<AreaSeries
						yAccessor={d => d.close}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>
				</Chart>
				
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}


AreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;