import { addHours, addMinutes, differenceInMinutes, startOfMinute, getMinutes } from 'date-fns';
const svgns = 'http://www.w3.org/2000/svg';
class TimeSeriesChart {
    constructor(container, showHours, series, tickColor) {
        this.dateLabelHeight = 10;
        this.timeLabelHeight = 10;
        this.minorTickHeight = 10;
        this.container = container;
        this.showHours = showHours;
        this.series = series;
        this.numSeries = series.length;
        this.tickColor = tickColor;
        this.calculateKeyFigures();
    }
    calculateKeyFigures() {
        this.xPerMinute = this.viewBoxWidth / (this.showHours * 60);
        this.chartTotalMinutes = this.showHours * 60;
        this.zeroXDate = addHours(addMinutes(startOfMinute(new Date()), 1), -this.showHours);
        this.minorTickInterval = 0;
        while (this.xPerMinute * this.minorTickInterval < 5) {
            this.minorTickInterval += 5;
        }
        this.timeTickInterval = 0;
        while (this.xPerMinute * this.timeTickInterval < 100) {
            this.timeTickInterval += 15;
        }
        this.minorTickY1 = this.viewBoxHeight - this.dateLabelHeight - this.timeLabelHeight - this.minorTickHeight;
        this.minorTickY2 = this.minorTickY1 + this.minorTickHeight;
    }
    createMissingIntervals() {
        let currentEndDate = addMinutes(startOfMinute(new Date()), 1);
        if (!this.chartIntervals) {
            this.chartIntervals = [];
            let chartTotalMinutes = this.showHours * 60;
            let currentDate = new Date(currentEndDate);
            while (differenceInMinutes(currentEndDate, currentDate) <= this.chartTotalMinutes) {
                let thisInterval = {
                    when: currentDate,
                    datapoints: new Array(this.numSeries)
                };
                this.chartIntervals = [thisInterval, ...this.chartIntervals];
                currentDate = addMinutes(currentDate, -1);
            }
        }
        let currentDate = addMinutes(this.chartIntervals[this.chartIntervals.length].when, 1);
        while (currentEndDate >= currentDate) {
            let thisInterval = {
                when: currentDate,
                datapoints: new Array(this.numSeries)
            };
            this.chartIntervals.push(thisInterval);
            currentDate = addMinutes(currentDate, 1);
        }
    }
    getXPosForDate(date) {
        return differenceInMinutes(date, this.zeroXDate) * this.xPerMinute;
    }
    drawTickAndLabel(date) {
        let x = this.getXPosForDate(date);
        if (getMinutes(date) % this.minorTickInterval === 0) {
            let tick = document.createElementNS(svgns, 'line');
            tick.setAttribute('x1', x.toString());
            tick.setAttribute('y1', this.minorTickY1.toString());
            tick.setAttribute('x2', x.toString());
            tick.setAttribute('y2', this.minorTickY2.toString());
            tick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:1');
            this.svg.appendChild(tick);
        }
    }
    render() {
        this.svg = document.createElementNS(svgns, 'svg');
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.container.appendChild(this.svg);
    }
}
//# sourceMappingURL=TimeSeriesChart.js.map