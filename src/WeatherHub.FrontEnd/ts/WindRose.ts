const svgns = 'http://www.w3.org/2000/svg';
import { debounce } from 'ts-debounce';

export default class WindRose {
    private container: HTMLDivElement;
    private svg: SVGSVGElement;
    private renderSize = 300;
    private centre: number;
    private tickEndPos: number;

    private avgWindColour: string;
    private gustWindColour: string;

    private avgWindSpeedElement: SVGTextElement;
    private avgWindSpeedLabel: SVGTextElement;
    private gustWindSpeedElement: SVGTextElement;
    private gustWindSpeedLabel: SVGTextElement;
    private windDirectionElement: SVGTextElement;

    private currentPos = 0;

    private arrow: SVGPolygonElement;
    private arrowAnimation: SVGElement;
    private tickColor: string;
    private arrowColor: string;
    private labelColor: string;
    private windUnitLabel: string;

    private debouncedMoveToPosition: (degrees: number) => void;

    private mostRecentReading: Date | undefined = undefined;

    constructor(
        container: HTMLDivElement,
        tickColor: string,
        arrowColor: string, 
        labelColor: string,
        avgWindColour: string,
        gustWindColour: string,
        windUnitLabel: string
    ) {

        this.debouncedMoveToPosition = debounce(this.moveToPosition, 100);
        this.container = container;
        this.tickColor = tickColor;
        this.arrowColor = arrowColor;
        this.labelColor = labelColor;
        this.avgWindColour = avgWindColour;
        this.gustWindColour = gustWindColour;
        this.windUnitLabel = windUnitLabel;

        this.setKeyPoints();
        this.render();
    }

    public displayNewDataPoint(when: Date, windDegrees: number, avgWindSpeed: number, gustWindSpeed) {

        if (!this.mostRecentReading || this.mostRecentReading < when) {
            this.debouncedMoveToPosition(windDegrees);
            this.updateLabels(windDegrees, avgWindSpeed, gustWindSpeed);
            this.mostRecentReading = when;
        }
    }

    private updateLabels(windDegrees: number, avgWindSpeed: number, gustWindSpeed: number) {
        this.avgWindSpeedElement.innerHTML = Math.round(avgWindSpeed).toString() + ' ' + this.windUnitLabel;
        this.gustWindSpeedElement.innerHTML = Math.round(gustWindSpeed).toString() + ' ' + this.windUnitLabel;
        this.windDirectionElement.innerHTML = Math.round(windDegrees).toString() + '&deg;';
    }

    private moveToPosition(degrees: number) {
        if (this.arrowAnimation) {

            this.arrowAnimation.setAttribute('type', 'rotate');
            this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
            this.arrowAnimation.setAttribute('to', degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
            this.arrow.setAttribute('transform', 'rotate(' + degrees.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString() + ')');
            this.currentPos = degrees;
        }
    }

    private setKeyPoints() {
        this.centre = this.renderSize / 2;
        this.tickEndPos = this.renderSize / 10;
    }

    private render() {

        this.svg = document.createElementNS(svgns, 'svg');

        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + this.renderSize.toString() + ' ' + this.renderSize.toString());
        this.svg.style.width = '100%';
        this.svg.style.height = 'auto';
        this.container.appendChild(this.svg);

        this.drawTicks(10, 2, 45);
        this.drawTicks(7, 1, 5);
        this.drawTickLabels();
        this.drawArrow();
        this.drawCentreLabels();
    }

    private drawCentreLabels() {

        let labelSize = Math.round(this.renderSize / 24);
        let avgWindSpeedSize = Math.round(this.renderSize / 12);
        let maxWindSpeedSize = Math.round(this.renderSize / 12);
        let directionSize = Math.round(this.renderSize / 20);

        let speedOffset = ((directionSize * 1.3) + (avgWindSpeedSize * 1.3)) / 2; 
        let speedLabelOffset = ((directionSize * 1.3) + (avgWindSpeedSize * 1.3) + (labelSize * 0.5) / 2);

        this.gustWindSpeedElement = document.createElementNS(svgns, 'text') as SVGTextElement;
        this.gustWindSpeedElement.setAttribute('style', 'font: bold ' + maxWindSpeedSize.toString() + 'px sans-serif; fill: ' + this.gustWindColour + ';');
        this.gustWindSpeedElement.setAttribute('x', this.centre.toString());
        this.gustWindSpeedElement.setAttribute('y', (this.centre + speedOffset).toString());
        this.gustWindSpeedElement.setAttribute('text-anchor', 'middle');
        this.gustWindSpeedElement.setAttribute('dominant-baseline', 'middle');
        this.svg.appendChild(this.gustWindSpeedElement);

        this.gustWindSpeedLabel = document.createElementNS(svgns, 'text') as SVGTextElement;
        this.gustWindSpeedLabel.setAttribute('style', 'font: bold ' + labelSize.toString() + 'px sans-serif; fill: ' + this.gustWindColour + ';');
        this.gustWindSpeedLabel.setAttribute('x', this.centre.toString());
        this.gustWindSpeedLabel.setAttribute('y', (this.centre + speedLabelOffset).toString());
        this.gustWindSpeedLabel.setAttribute('text-anchor', 'middle');
        this.gustWindSpeedLabel.setAttribute('dominant-baseline', 'middle');
        this.gustWindSpeedLabel.innerHTML = "GUST";
        this.svg.appendChild(this.gustWindSpeedLabel);

        this.avgWindSpeedElement = document.createElementNS(svgns, 'text') as SVGTextElement;
        this.avgWindSpeedElement.setAttribute('style', 'font: bold ' + avgWindSpeedSize.toString() + 'px sans-serif; fill: ' + this.avgWindColour + ';');
        this.avgWindSpeedElement.setAttribute('x', this.centre.toString());
        this.avgWindSpeedElement.setAttribute('y', (this.centre - speedOffset).toString());
        this.avgWindSpeedElement.setAttribute('text-anchor', 'middle');
        this.avgWindSpeedElement.setAttribute('dominant-baseline', 'middle');
        this.svg.appendChild(this.avgWindSpeedElement);

        this.avgWindSpeedLabel = document.createElementNS(svgns, 'text') as SVGTextElement;
        this.avgWindSpeedLabel.setAttribute('style', 'font: bold ' + labelSize.toString() + 'px sans-serif; fill: ' + this.avgWindColour + ';');
        this.avgWindSpeedLabel.setAttribute('x', this.centre.toString());
        this.avgWindSpeedLabel.setAttribute('y', (this.centre - speedLabelOffset).toString());
        this.avgWindSpeedLabel.setAttribute('text-anchor', 'middle');
        this.avgWindSpeedLabel.setAttribute('dominant-baseline', 'middle');
        this.avgWindSpeedLabel.innerHTML = "AVG";
        this.svg.appendChild(this.avgWindSpeedLabel);

        

        this.windDirectionElement = document.createElementNS(svgns, 'text') as SVGTextElement;
        this.windDirectionElement.setAttribute('style', 'font: bold ' + directionSize.toString() + 'px sans-serif; fill: ' + this.labelColor + ';');
        this.windDirectionElement.setAttribute('x', this.centre.toString());
        this.windDirectionElement.setAttribute('y', this.centre.toString());
        this.windDirectionElement.setAttribute('text-anchor', 'middle');
        this.windDirectionElement.setAttribute('dominant-baseline', 'middle');
        this.svg.appendChild(this.windDirectionElement);
    }

    private drawTickLabels() {

        let majorFontSize = Math.round(this.renderSize / 20);
        let minorFontSize = Math.round(this.renderSize / 30);

        let labels = [
            { label: 'N', degrees: 0, isMajor: true },
            { label: 'NE', degrees: 45, isMajor: false },
            { label: 'E', degrees: 90, isMajor: true },
            { label: 'SE', degrees: 135, isMajor: false },
            { label: 'S', degrees: 180, isMajor: true },
            { label: 'SW', degrees: 225, isMajor: false },
            { label: 'W', degrees: 270, isMajor: true },
            { label: 'NW', degrees: 315, isMajor: false },
        ]

        for (let i = 0; i < labels.length; i++) {
            let thisLabel = document.createElementNS(svgns, 'text') as SVGElement;
            if (labels[i].isMajor) {
                thisLabel.setAttribute('style', 'font: bold ' + majorFontSize.toString() + 'px sans-serif; fill: ' + this.labelColor + ';');
            } else {
                thisLabel.setAttribute('style', 'font: bold ' + minorFontSize.toString() + 'px sans-serif; fill: ' + this.labelColor + ';');
            }
            thisLabel.setAttribute('x', this.centre.toString());
            thisLabel.setAttribute('y', ((majorFontSize * 1.5) / 2).toString());
            thisLabel.setAttribute('text-anchor', 'middle');
            thisLabel.setAttribute('dominant-baseline', 'middle');
            thisLabel.innerHTML = labels[i].label;
            thisLabel.setAttribute('transform', 'rotate(' + labels[i].degrees.toString() + ',' + this.centre.toString() + ',' + this.centre.toString() + ')');
            this.svg.appendChild(thisLabel);
        }
    }

    private drawTicks(length: number, weight: number, intervalDegress: number) {
        let a = 0;     

        while (a < 360) {

            let thisTick = document.createElementNS(svgns, 'line');
            thisTick.setAttribute('x1', this.centre.toString());
            thisTick.setAttribute('y1', (this.tickEndPos - length).toString());
            thisTick.setAttribute('x2', this.centre.toString());
            thisTick.setAttribute('y2', this.tickEndPos.toString());
            thisTick.setAttribute('style', 'stroke:' + this.tickColor + ';stroke-width:' + weight);
            thisTick.setAttribute('transform', 'rotate(' + a + ',' + this.centre + ',' + this.centre + ')');
            this.svg.appendChild(thisTick);
            a += intervalDegress
        }
    }

    private drawArrow() {

        let arrowWidth = 30;
        let arrowHeight = 40;
        let arrowOuterPos = this.tickEndPos + 2;

        let points = (this.centre - (arrowWidth / 2)).toString() + ' ' + arrowOuterPos.toString();
        points += ',' + (this.centre + (arrowWidth / 2)).toString() + ' ' + arrowOuterPos.toString();
        points += ',' + (this.centre).toString() + ' ' + (arrowOuterPos + arrowHeight).toString();
        points += ',' + (this.centre - (arrowWidth / 2)).toString() + ' ' + arrowOuterPos.toString();

        this.arrow = document.createElementNS(svgns, 'polygon') as SVGPolygonElement;
        this.arrow.setAttribute('style', 'fill:' + this.arrowColor + ';');
        this.arrow.setAttribute('points', points);

        this.arrowAnimation = document.createElementNS(svgns, 'animateTransform') as SVGElement;
        this.arrowAnimation.setAttribute('attributeName', 'transform');
        this.arrowAnimation.setAttribute('attributeType', 'XML');
        this.arrowAnimation.setAttribute('type', 'rotate');
        this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('to', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('dur', '2s');
        this.arrowAnimation.setAttribute('repeatCount', '1');
        this.arrow.appendChild(this.arrowAnimation);

        this.svg.appendChild(this.arrow);
    }
} 