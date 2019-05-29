const svgns = 'http://www.w3.org/2000/svg';
import { debounce } from 'ts-debounce';

export default class WindRose {
    private container: HTMLDivElement;
    private svg: SVGSVGElement;
    private renderSize = 600;
    private centre: number;
    private tickEndPos: number;

    private currentPos = 0;

    private arrow: SVGPolygonElement;
    private arrowAnimation: SVGElement;
    private tickColor: string;
    private arrowColor: string;
    private labelColor: string;

    private debouncedMoveToPosition: (degrees: number) => void;

    private mostRecentReading: Date | undefined = undefined;

    constructor(
        container: HTMLDivElement,
        tickColor: string,
        arrowColor: string, 
        labelColor: string,
    ) {

        this.debouncedMoveToPosition = debounce(this.moveToPosition, 100);
        this.container = container;
        this.tickColor = tickColor;
        this.arrowColor = arrowColor;
        this.labelColor = labelColor;

        this.setKeyPoints();
        this.render();
    }

    public displayNewDataPoint(when: Date, windDegrees: number) {

        if (!this.mostRecentReading || this.mostRecentReading < when) {
            this.debouncedMoveToPosition(windDegrees);
            this.mostRecentReading = when;
        }
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
        this.tickEndPos = 600 / 18;
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
        this.drawLabels();
        this.drawArrow();
    }

    private drawLabels() {

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
                thisLabel.setAttribute('style', 'font: bold 20px sans-serif; fill: ' + this.labelColor + ';');
            } else {
                thisLabel.setAttribute('style', 'font: bold 14px sans-serif; fill: ' + this.labelColor + ';');
            }
            thisLabel.setAttribute('x', '300');
            thisLabel.setAttribute('y', '15');
            thisLabel.setAttribute('text-anchor', 'middle');
            thisLabel.setAttribute('dominant-baseline', 'middle');
            thisLabel.innerHTML = labels[i].label;
            thisLabel.setAttribute('transform', 'rotate(' + labels[i].degrees.toString() + ', 300, 300)');
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

        let arrowEndPoint = this.tickEndPos + 15;
        let arrowSize = 25;
        let arrowStartY = arrowEndPoint + arrowSize;

        let points = (this.centre - 3).toString() + ' ' + this.centre.toString(); 
        points += ',' + (this.centre - 3).toString() + ' ' + arrowStartY.toString();
        points += ',' + (this.centre - (arrowSize / 2)).toString() + ' ' + arrowStartY.toString();
        points += ',' + this.centre.toString() + ' ' + arrowEndPoint.toString();
        points += ',' + (this.centre + (arrowSize / 2)).toString() + ' ' + arrowStartY.toString()
        points += ',' + (this.centre + 3).toString() + ' ' + arrowStartY.toString();
        points += ',' + (this.centre + 3).toString() + ' ' + this.centre.toString(); 

        this.arrow = document.createElementNS(svgns, 'polygon') as SVGPolygonElement;
        this.arrow.setAttribute('style', 'fill:' + this.arrowColor + ';');
        this.arrow.setAttribute('points', points);

        this.arrowAnimation = document.createElementNS(svgns, 'animateTransform') as SVGElement;
        this.arrowAnimation.setAttribute('attributeName', 'transform');
        this.arrowAnimation.setAttribute('attributeType', 'XML');
        this.arrowAnimation.setAttribute('type', 'rotate');
        this.arrowAnimation.setAttribute('from', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('to', this.currentPos.toString() + ' ' + this.centre.toString() + ' ' + this.centre.toString());
        this.arrowAnimation.setAttribute('dur', '0.5s');
        this.arrowAnimation.setAttribute('repeatCount', '1');
        this.arrow.appendChild(this.arrowAnimation);

        this.svg.appendChild(this.arrow);
    }
} 