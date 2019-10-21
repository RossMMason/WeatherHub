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
import { debounce } from 'ts-debounce';

const svgns = 'http://www.w3.org/2000/svg';

export default class TimeSeriesChart {

    private seriesData: DataLookup<SeriesData>;

    private showHours: number;
    private chartSvg: SVGSVGElement;
    private yAxisSvg: SVGSVGElement;
    private container: HTMLElement;

    private viewBoxHeight = 250; 
    private viewBoxWidth24HourWidth = 700;
    private viewBoxMinX = 0;
    private xPerMinute: number;
    private chartTotalMinutes: number;
    private drawXAxisForPreviousHours: number = 24;

    private chartIntervals: ChartInterval[];
    private series: SeriesInfo[];
    private numSeries: number;
    private zeroXDate: Date;
    private minorTickInterval: number;
    private timeTickInterval: number;

    private dateLabelHeight = 14;
    private timeLabelHeight = 14;
    private xAxisTickHeight = 10;
    private yAxisLabelWidth = 18;
    private yAxisTickWidth = 5;
    private yPaddingTop = 10;
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
    private yPixelsPerUnit: number = 0;
    private yAxisLabelRightPos: number;
    private debouncedScaleYAxis: () => void;
    private calculatedMaxY: number;
    private calculatedTickInterval: number;


    constructor(
        container: HTMLElement,
        showHours: number,
        series: SeriesInfo[],
        tickColor: string,
        autoScaleYAxis: boolean,
        yAxisLabels?: YAxisLabel[]) {
        this.debouncedScaleYAxis = debounce(this.scaleYAxis, 100);
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
        this.scheduleNextViewBoxMove();
    }

    private getViewBoxWidth(): number {
        return this.viewBoxWidth24HourWidth / 24 * this.showHours;
    }

    private scaleYAxis() {
        if (!this.autoScaleYAxis) {
            this.redrawYAxisTicksAndLabels();
            this.reRenderSeriesData();
            return;
        }

        // Get maximum y within viewport
        let viewStartDate = this.getDateForXVal(this.viewBoxMinX);
        let viewEndDate = this.getDateForXVal(this.viewBoxMinX + this.getViewBoxWidth());

        let inViewSeriesData = this.seriesData.getBetweenDates(viewStartDate, viewEndDate);

        let thisMaxY = 0; 
        for (let i = 0; i < inViewSeriesData.length; i++) {

            for (let j = 0; j < inViewSeriesData[i].seriesData.length; j++) {
                if (inViewSeriesData[i].seriesData[j] > thisMaxY) {
                    thisMaxY = inViewSeriesData[i].seriesData[j];
                }
            }
        }

        while (thisMaxY % 10 !== 0) {
            thisMaxY++;
        }

        if (thisMaxY === this.calculatedMaxY) {
            return;
        }

        this.calculatedMaxY = thisMaxY;

        this.calculatedTickInterval = 0; 

        if (thisMaxY <= 100) {
            let intervalOptions = [2, 5, 10, 20]
            for (let i = 0; i < intervalOptions.length; i++) {
                if ((thisMaxY / intervalOptions[i]) <= 8) {
                    this.calculatedTickInterval = intervalOptions[i];
                    break;
                } 
            }
        } else {
            let intervalOption = 10;
            while ((thisMaxY / intervalOption) > 8) {
                intervalOption += 10; 
            }
            this.calculatedTickInterval = intervalOption;
        }

        this.redrawYAxisTicksAndLabels();
        this.reRenderSeriesData();
    }

    public addDataPoint(dataPoint: DataPoint) {

        if (dataPoint.seriesData.length != this.numSeries) {
            throw ('Wrong number of series datapoints!');
        }

        if (this.seriesData.hasDataForDate(dataPoint.when)) {
            let existingSeriesData = this.seriesData.getData(dataPoint.when);
            existingSeriesData.seriesData = dataPoint.seriesData;

            let graphics = this.renderDataPoint(dataPoint);
            existingSeriesData.seriesGraphics = graphics;
        } else {
            let graphics = this.renderDataPoint(dataPoint);

            let newSeriesData: SeriesData = {
                when: dataPoint.when,
                seriesData: dataPoint.seriesData,
                seriesGraphics: graphics
            };

            this.seriesData.addData(newSeriesData);
        }

        this.debouncedScaleYAxis();
    }

    private reRenderDataPoints() {

        let currentSeriesData = this.seriesData.getValues();

        for (let s = 0; s < currentSeriesData.length; s++) {

            let dataPoint: DataPoint = {
                when: currentSeriesData[s].when,
                seriesData: currentSeriesData[s].seriesData
            }

            this.addDataPoint(dataPoint);
        }
    }

    public setDisplayNumberOfHours(numberOfHours: number) {
        this.showHours = numberOfHours;
        this.calculateKeyFigures();
        this.render();
        this.calculatedMaxY = undefined;
        this.scaleYAxis();
        this.redrawExistingIntervals();
        this.reRenderDataPoints();
    }

    private renderDataPoint(dataPoint: DataPoint): SeriesDatapointGraphics[] {

        let timeSeriesChart = this;

        let x = this.getXPosForDate(dataPoint.when);

        let gPoints = dataPoint.seriesData.map(function (seriesDataPoint, seriesIndex) {

            let y = timeSeriesChart.getYUnitsForValue(seriesDataPoint);

            let gPoint = document.createElementNS(svgns, 'circle') as SVGCircleElement;
            gPoint.setAttribute('cx', x.toString());
            gPoint.setAttribute('cy', timeSeriesChart.yZeroPosition.toString());
            gPoint.setAttribute('r', '2');
            gPoint.setAttribute('style', 'stroke:' + timeSeriesChart.series[seriesIndex].color + ';stroke-width:2; fill: none;');

            let gPointAnimation  = document.createElementNS(svgns, 'animateTransform') as SVGElement;
            gPointAnimation.setAttribute('attributeName', 'transform');
            gPointAnimation.setAttribute('attributeType', 'XML');
            gPointAnimation.setAttribute('type', 'translate');
            gPointAnimation.setAttribute('from', '0,0');
            gPointAnimation.setAttribute('to', '0,' + -y.toString());
            gPointAnimation.setAttribute('dur', '2s');
            gPointAnimation.setAttribute('repeatCount', '1');
            gPoint.appendChild(gPointAnimation);

            gPoint.setAttribute('transform', 'translate(' + 0 + ', ' + -y.toString() + ')');

            timeSeriesChart.chartSvg.appendChild(gPoint);

            let graphics: SeriesDatapointGraphics = {
                gPoint: gPoint,
                gAnimation: gPointAnimation
            }

            return graphics
        });

        return gPoints;
    }

    private reRenderSeriesData() {

        let seriesData = this.seriesData.getValues();

        for (let i = 0; i < seriesData.length; i++) {

            for (let j = 0; j < seriesData[i].seriesGraphics.length; j++) {
                let graphics = seriesData[i].seriesGraphics[j];

                let y = this.getYUnitsForValue(seriesData[i].seriesData[j]);

                let previousYTranslation = graphics.gAnimation.getAttribute('to');
                graphics.gAnimation.setAttribute('from', previousYTranslation);
                graphics.gAnimation.setAttribute('to', '0,' + -y.toString());

                graphics.gPoint.setAttribute('transform', 'translate(' + 0 + ', ' + -y.toString() + ')');
            }
        }     
    }

    private calculateKeyFigures() {
        this.xPerMinute = this.getViewBoxWidth() / (this.showHours * 60);
        this.chartTotalMinutes = this.drawXAxisForPreviousHours * 60;
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

    private redrawExistingIntervals() {
        for (let i = 0; i < this.chartIntervals.length; i++) {
            this.drawXAxisTickAndLabel(this.chartIntervals[i].when);
        }
    }


    private getXPosForDate(date: Date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }

    private getDateForXVal(xVal: number): Date {
        let diffInMinutes = xVal / this.xPerMinute;
        return addMinutes(this.zeroXDate, diffInMinutes);
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
            dateLabel.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + ';font-weight: bold');
            this.chartSvg.appendChild(dateLabel);
        }

        if (getMinutes(date) % this.timeTickInterval === 0) {

            let timeLabel = document.createElementNS(svgns, 'text') as SVGElement;
            timeLabel.setAttribute('x', x.toString());
            timeLabel.setAttribute('y', this.timeCentreY.toString());
            timeLabel.setAttribute('text-anchor', 'middle');
            timeLabel.setAttribute('dominant-baseline', 'middle');
            timeLabel.innerHTML = format(date, 'HH')
            timeLabel.setAttribute('style', 'font: 11px sans-serif; fill: ' + this.labelColor + '; font-weight: bold');
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

    private getYPosForValue(value: number) {
        return this.yZeroPosition - (value * this.yPixelsPerUnit);
    }

    private getYUnitsForValue(value: number) {
        return (value * this.yPixelsPerUnit);
    }

    private drawYAxisFromSuppliedLables() {
        let maxY = Math.max(... this.yAxisLabels.map(function (label) { return label.y }));
        this.drawYAxis(maxY, this.yAxisLabels);
    }

    private drawYAxisBasedOnInViewData() {

        let labels: YAxisLabel[] = [];

        let val = this.calculatedTickInterval; 

        while (val <= this.calculatedMaxY) {
            labels.push(
                {
                    y: val,
                    label: val.toString()
                });
            val += this.calculatedTickInterval;
        }

        this.drawYAxis(this.calculatedMaxY, labels);
    }

    private drawYAxis(maxY: number, labels: YAxisLabel[]) {
        this.yPixelsPerUnit = (this.viewBoxHeight - (this.viewBoxHeight - this.yZeroPosition) - this.yPaddingTop) / maxY;

        for (let i = 0; i < labels.length; i++) {

            //let yPos = this.yZeroPosition - (this.yAxisLabels[i].y * this.yPixelsPerUnit);
            let yPos = this.getYPosForValue(labels[i].y);

            let tick = document.createElementNS(svgns, 'line') as SVGLineElement;
            tick.setAttribute('x1', this.yAxisTickX1.toString());
            tick.setAttribute('x2', this.yAxisTickX2.toString());
            tick.setAttribute('y1', yPos.toString());
            tick.setAttribute('y2', yPos.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');
            this.yAxisSvg.appendChild(tick);
            this.yAxisSvgTicks.push(tick);

            let fullScreenTick = document.createElementNS(svgns, 'line') as SVGLineElement;
            fullScreenTick.setAttribute('x1', '-9999');
            fullScreenTick.setAttribute('x2', '9999');
            fullScreenTick.setAttribute('y1', yPos.toString());
            fullScreenTick.setAttribute('y2', yPos.toString());
            fullScreenTick.setAttribute('style', 'stroke:' + '#aaaaaa' + ';stroke-width:1');
            this.chartSvg.appendChild(fullScreenTick);
            this.yAxisSvgTicks.push(fullScreenTick);

            let label = document.createElementNS(svgns, 'text') as SVGElement;
            label.setAttribute('x', this.yAxisLabelRightPos.toString());
            label.setAttribute('y', yPos.toString());
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('dominant-baseline', 'middle');
            label.innerHTML = labels[i].label;
            label.setAttribute('style', 'font: 10px sans-serif; fill: ' + this.labelColor + '; font-weight:bold');
            this.yAxisSvg.appendChild(label);
            this.yAxisSvgLabels.push(label);
        }
    }

    private render() {
        if (this.yAxisSvg) {
            this.yAxisSvg.remove();
        }

        if (this.chartSvg) {
            this.chartSvg.remove();
        }

        this.yAxisSvg = document.createElementNS(svgns, 'svg');
        this.yAxisSvg.style.width = '100%';
        this.yAxisSvg.style.height = 'auto';
        this.yAxisSvg.style.position = 'absolute';
        this.yAxisSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.getViewBoxWidth() + ' ' + this.viewBoxHeight);
        this.yAxisSvg.style.width = '100%';
        this.yAxisSvg.style.height = 'auto';
        this.yAxisSvg.style.zIndex = '100';
        this.container.appendChild(this.yAxisSvg);

        let yAxisBg = document.createElementNS(svgns, 'rect') as SVGRectElement;
        yAxisBg.setAttribute('x', '0');
        yAxisBg.setAttribute('y', '0');
        yAxisBg.setAttribute('width', this.yAxisXPos.toString());
        yAxisBg.setAttribute('height', this.viewBoxHeight.toString());
        yAxisBg.setAttribute('style', 'fill:#ffffff;fill-opacity:0.5;stroke-width:0');
        this.yAxisSvg.appendChild(yAxisBg);

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
        this.chartSvg.style.position = 'relative';
        this.chartSvg.setAttributeNS(null, 'viewBox', '0 0 ' + this.getViewBoxWidth() + ' ' + this.viewBoxHeight);
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
    }

    private scheduleNextViewBoxMove() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let timeUntilUpdate = differenceInMilliseconds(currentEndDate, new Date());
        setTimeout(this.drawXIntervalsAndMoveViewbox.bind(this), timeUntilUpdate);
    }

    private drawXIntervalsAndMoveViewbox() {
        this.createMissingIntervals();
        this.moveViewBoxToCurrentTime();
        this.scheduleNextViewBoxMove();
    }

    private moveViewBoxToCurrentTime() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        let currentStartDate = addHours(currentEndDate, -this.showHours); 
        let xOffset = differenceInMinutes(currentStartDate, this.zeroXDate) * this.xPerMinute;
        this.chartSvg.setAttributeNS(null, 'viewBox', xOffset.toString() + ' 0 ' + this.getViewBoxWidth() + ' ' + this.viewBoxHeight);
        this.scaleYAxis();
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
    seriesGraphics: SeriesDatapointGraphics[]
}

type SeriesDatapointGraphics = {
    gPoint: SVGElement;
    gAnimation: SVGElement
}