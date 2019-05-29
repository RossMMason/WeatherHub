import {
    addHours,
    addMinutes,
    differenceInMilliseconds,
    differenceInMinutes,
    format,
    isPast,
    startOfMinute,
    getHours,
    getMinutes
} from 'date-fns';
import DataLookup from './DataLookup';

const svgns = 'http://www.w3.org/2000/svg';

export default class TimeSeriesChart {

    private seriesData: DataLookup<SeriesData>;

    private showHours: number;
    private chartSvg: SVGSVGElement;
    private yAxisSvg: SVGSVGElement;
    private container: HTMLElement;

    private viewBoxHeight =  300; 
    private viewBoxWidth = 900;
    private xPerMinute: number;
    private chartTotalMinutes: number;

    private chartIntervals: ChartInterval[];
    private series: SeriesInfo[];
    private numSeries: number;
    private zeroXDate: Date;
    private minorTickInterval: number;
    private timeTickInterval: number;

    private dateLabelHeight = 14;
    private timeLabelHeight = 14;
    private xAxisTickHeight = 10;
    private yAxisLabelWidth = 15;
    private yAxisTickWidth = 5;
    private yPaddingTop = 5;
    private minorXTickY1: number;
    private minorXTickY2: number;
    private timeCentreY: number;
    private dateCentreY: number;
    private tickColor: string;
    private labelColor: string;
    private autoScaleYAxis: boolean;
    private yAxisLabels: YAxisLabel[];

    private yAxisSvgTicks: SVGLineElement[] = [];
    private yAxisSvgLabels: SVGElement[] = [];
    
    private yAxisXPos: number;
    private yAxisTickX1: number;
    private yAxisTickX2: number;

    private yZeroPosition: number;
    private yPixelsPerUnit: number;
    yAxisLabelRightPos: number;


    constructor(
        container: HTMLElement,
        showHours: number,
        series: SeriesInfo[],
        tickColor: string,
        autoScaleYAxis: boolean,
        yAxisLabels?: YAxisLabel[]) {
        this.seriesData = new DataLookup<SeriesData>();
        this.autoScaleYAxis = autoScaleYAxis;
        this.yAxisLabels = yAxisLabels;
        this.container = container;
        this.showHours = showHours;
        this.series = series;
        this.numSeries = series.length;
        this.tickColor = tickColor;
        this.labelColor = tickColor;
        this.calculateKeyFigures();
        this.render();
        this.createMissingIntervals();
        this.scheduleNextUpdate();
    }

    public addDataPoint(dataPoint: DataPoint) {

        if (dataPoint.seriesData.length != this.numSeries) {
            throw ('Wrong number of series datapoints!');
        }

        if (this.seriesData.hasDataForDate(dataPoint.when)) {
            // update dataPoint and redraw. 
            // todo

        } else {
            let gPoints = this.renderDataPoint(dataPoint);

            let newSeriesData: SeriesData = {
                when: dataPoint.when,
                seriesData: dataPoint.seriesData,
                gPoints: gPoints
            };

            this.seriesData.addData(newSeriesData);
        }

    }

    private renderDataPoint(dataPoint: DataPoint): SVGElement[] {

        let timeSeriesChart = this;

        let x = this.getXPosForDate(dataPoint.when);

        let gPoints = dataPoint.seriesData.map(function (seriesDataPoint, seriesIndex) {

            let y = timeSeriesChart.getYPosForValue(seriesDataPoint);

            let gPoint = document.createElementNS(svgns, 'circle') as SVGCircleElement;
            gPoint.setAttribute('cx', x.toString());
            gPoint.setAttribute('cy', timeSeriesChart.yZeroPosition.toString());
            gPoint.setAttribute('r', '4');
            gPoint.setAttribute('style', 'stroke:' + timeSeriesChart.series[seriesIndex].color + ';stroke-width:2; fill: none;');

            let gPointAnimation = document.createElementNS(svgns, 'animate') as SVGElement;
            gPointAnimation.setAttribute('attributeName', 'cy');
            gPointAnimation.setAttribute('attributeType', 'XML');
            gPointAnimation.setAttribute('from', timeSeriesChart.yZeroPosition.toString());
            gPointAnimation.setAttribute('to', y.toString());
            gPointAnimation.setAttribute('begin', '0');
            gPointAnimation.setAttribute('dur', '0.6s');
            gPointAnimation.setAttribute('repeatCount', '1');
            gPoint.append(gPointAnimation);

            gPoint.setAttribute('cy', y.toString());

            timeSeriesChart.chartSvg.appendChild(gPoint);

            return gPoint as SVGElement;
        });

        return gPoints;
    }

    private reRenderDataPoint(dataPoint) {

    }

    private calculateKeyFigures() {
        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);
        this.chartTotalMinutes = this.showHours * 60;
        this.zeroXDate = addHours(addMinutes(startOfMinute(new Date()), 1), -this.showHours);

        // At least 10 units per tick.
        this.minorTickInterval = 0;
        while (this.xPerMinute * this.minorTickInterval < 10) {
            this.minorTickInterval += 10
        }

        // Atleast 100 pixels per time tick.
        this.timeTickInterval = 0;
        while (this.xPerMinute * this.timeTickInterval < 100) {
            this.timeTickInterval += 15;
        }

        this.minorXTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.xAxisTickHeight;
        this.minorXTickY2 = this.minorXTickY1 + this.xAxisTickHeight;
        this.timeCentreY = this.viewBoxHeight - this.dateLabelHeight - (this.timeLabelHeight / 2);
        this.dateCentreY = this.viewBoxHeight - (this.dateLabelHeight / 2);

        this.yAxisXPos = this.yAxisLabelWidth + 2 + this.yAxisTickWidth;

        this.yAxisTickX1 = this.yAxisXPos - this.yAxisTickWidth;
        this.yAxisTickX2 = this.yAxisXPos;

        this.yAxisLabelRightPos = this.yAxisTickX1 - 2;

        this.yZeroPosition = this.minorXTickY1;
    }

    private createMissingIntervals() {

        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);

        // Populate intervals for base view. 
        if (!this.chartIntervals) {
            this.chartIntervals = [];

            let currentDate = new Date(currentEndDate);

            while (differenceInMinutes(currentEndDate, currentDate) <= this.chartTotalMinutes) {

                let thisInterval: ChartInterval = {
                    when: currentDate,
                    datapoints: new Array(this.numSeries)
                }

                this.chartIntervals = [thisInterval, ...this.chartIntervals];
                this.drawXAxisTickAndLabel(thisInterval.when);

                currentDate = addMinutes(currentDate, -1);
            }
        }

        // Populate intervals going forward
        let currentDate = addMinutes(this.chartIntervals[this.chartIntervals.length-1].when, 1);
        while (currentEndDate >= currentDate) {

            let thisInterval: ChartInterval = {
                when: currentDate,
                datapoints: new Array(this.numSeries)
            }

            this.chartIntervals.push(thisInterval);
            this.drawXAxisTickAndLabel(thisInterval.when);

            currentDate = addMinutes(currentDate, 1);
        }
    }

    private getXPosForDate(date: Date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }

    private drawXAxisTickAndLabel(date: Date) {
        let x = this.getXPosForDate(date);

        if (getHours(date) === 0 && getMinutes(date) === 0) {

            let dateLabel = document.createElementNS(svgns, 'text') as SVGElement;
            dateLabel.setAttribute('x', x.toString());
            dateLabel.setAttribute('y', this.dateCentreY.toString());
            dateLabel.setAttribute('text-anchor', 'middle');
            dateLabel.setAttribute('dominant-baseline', 'middle');
            dateLabel.innerHTML = format(date, 'Do MMM YY')
            dateLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');
            this.chartSvg.appendChild(dateLabel);
        }

        if (getMinutes(date) % this.timeTickInterval === 0) {

            let timeLabel = document.createElementNS(svgns, 'text') as SVGElement;
            timeLabel.setAttribute('x', x.toString());
            timeLabel.setAttribute('y', this.timeCentreY.toString());
            timeLabel.setAttribute('text-anchor', 'middle');
            timeLabel.setAttribute('dominant-baseline', 'middle');
            timeLabel.innerHTML = format(date, 'HH')
            timeLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');
            this.chartSvg.appendChild(timeLabel);
        }

        if (getMinutes(date) % this.minorTickInterval === 0) {
            let tick = document.createElementNS(svgns, 'line') as SVGLineElement;
            tick.setAttribute('x1', x.toString());
            tick.setAttribute('y1', this.minorXTickY1.toString());
            tick.setAttribute('x2', x.toString());
            tick.setAttribute('y2', this.minorXTickY2.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1'); 
            this.chartSvg.appendChild(tick);
        }
    }

    private redrawYAxisTicksAndLabels() {
        if (this.yAxisSvgTicks) {
            this.yAxisSvgTicks.forEach(function(tick) { tick.remove();})
        }

        if (this.yAxisSvgLabels) {
            this.yAxisSvgLabels.forEach(function (label) { label.remove(); })
        }

        if (this.yAxisLabels && this.yAxisLabels.length > 0) {
            this.drawYAxisFromSuppliedLables();
            return;
        }

        this.drawYAxisBasedOnInViewData();
    }

    private drawYAxisFromSuppliedLables() {

        let maxY = Math.max(... this.yAxisLabels.map(function (label) { return label.y }));
        this.yPixelsPerUnit = (this.viewBoxHeight - (this.viewBoxHeight - this.yZeroPosition) - this.yPaddingTop) / maxY;

        for (let i = 0; i < this.yAxisLabels.length; i++) {

            //let yPos = this.yZeroPosition - (this.yAxisLabels[i].y * this.yPixelsPerUnit);
            let yPos = this.getYPosForValue(this.yAxisLabels[i].y);

            let tick = document.createElementNS(svgns, 'line') as SVGLineElement;
            tick.setAttribute('x1', this.yAxisTickX1.toString());
            tick.setAttribute('x2', this.yAxisTickX2.toString());
            tick.setAttribute('y1', yPos.toString());
            tick.setAttribute('y2', yPos.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');
            this.yAxisSvg.appendChild(tick);
            this.yAxisSvgTicks.push(tick);

            let label = document.createElementNS(svgns, 'text') as SVGElement;
            label.setAttribute('x', this.yAxisLabelRightPos.toString());
            label.setAttribute('y', yPos.toString());
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('dominant-baseline', 'middle');
            label.innerHTML = this.yAxisLabels[i].label;
            label.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';');
            this.yAxisSvg.appendChild(label);
            this.yAxisSvgLabels.push(label);
        }
    }

    private getYPosForValue(value: number) {
        return this.yZeroPosition - (value * this.yPixelsPerUnit);
    }

    private drawYAxisBasedOnInViewData() {
        // TODO
    }

    private render() {
        
        this.yAxisSvg = document.createElementNS(svgns, 'svg');
        this.yAxisSvg.style.width = '100%';
        this.yAxisSvg.style.height = 'auto';
        this.yAxisSvg.style.position = 'absolute';
        this.yAxisSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
        this.yAxisSvg.style.width = '100%';
        this.yAxisSvg.style.height = 'auto';
        this.yAxisSvg.style.zIndex = '100';
        this.container.appendChild(this.yAxisSvg);

        let yAxis = document.createElementNS(svgns, 'line') as SVGLineElement;
        yAxis.setAttribute('x1', this.yAxisXPos.toString());
        yAxis.setAttribute('x2', this.yAxisXPos.toString());
        yAxis.setAttribute('y1', this.yPaddingTop.toString());
        yAxis.setAttribute('y2', this.minorXTickY1.toString());
        yAxis.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:2');
        this.yAxisSvg.appendChild(yAxis);

        this.chartSvg = document.createElementNS(svgns, 'svg');
        this.chartSvg.style.width = '100%';
        this.chartSvg.style.height = 'auto';
        this.chartSvg.style.position = 'absolute';
        this.chartSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
        this.chartSvg.style.width = '100%';
        this.chartSvg.style.height = 'auto';
        this.container.appendChild(this.chartSvg);

        let xAxis = document.createElementNS(svgns, 'line') as SVGLineElement;
        xAxis.setAttribute('x1', '-99999');
        xAxis.setAttribute('x2', '99999');
        xAxis.setAttribute('y1', this.minorXTickY1.toString());
        xAxis.setAttribute('y2', this.minorXTickY1.toString());
        xAxis.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:2'); 
        this.chartSvg.appendChild(xAxis);

       

        this.redrawYAxisTicksAndLabels();
    }

    private scheduleNextUpdate() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let timeUntilUpdate = differenceInMilliseconds(currentEndDate, new Date());
        setTimeout(this.updateDisplay.bind(this), timeUntilUpdate);
    }

    private updateDisplay() {
        this.createMissingIntervals();
        this.moveToCurrentTime();
        this.scheduleNextUpdate();
    }

    private moveToCurrentTime() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let currentStartDate = addHours(currentEndDate, -this.showHours); 
        let xOffset = differenceInMinutes(currentStartDate, this.zeroXDate) * this.xPerMinute;
        this.chartSvg.setAttributeNS(null, 'viewBox', xOffset.toString() + ' 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
    }
}

type ChartInterval = {
    when: Date, 
    datapoints: (ChartDataPoint | undefined)[]
}

type ChartDataPoint = {
    value: number;
    element: SVGElement;
}

export type SeriesInfo = {
    color: string; 
    label: string;
}

export type YAxisLabel = {
    y: number;
    label: string;
}

export type DataPoint = {
    when: Date, 
    seriesData: number[]
}

type SeriesData = {

    when: Date,
    seriesData: number[],
    gPoints: SVGElement[]
}