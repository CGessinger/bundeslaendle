import statesSvg from "../assets/states.svg?raw";

function getSvgDom() {
    const svgText = statesSvg;
    const parser = new DOMParser();
    const svg = parser.parseFromString(svgText, "image/svg+xml");
    return svg;
}

export function getStateSvg(state) {
    const svgAllStates = getSvgDom();
    const path = svgAllStates.getElementById(state.name);
    const stateSvgElement = constructSvg(path);
    setSvgAttrbutes(stateSvgElement);
    return stateSvgElement;
}

function constructSvg(path) {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.appendChild(path);

    return svgElement;
}

function setSvgAttrbutes(svgElement) {
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    const boundingBox = svgBBox(svgElement);
    const viewBox = `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`;
    svgElement.setAttribute("viewBox", viewBox);
}

function svgBBox(svgEl) {
    let tempDiv = document.createElement('div')
    tempDiv.setAttribute('style', "position:absolute; visibility:hidden; width:0; height:0")
    document.body.appendChild(tempDiv)
    let tempSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    tempDiv.appendChild(tempSvg)
    let tempEl = svgEl.cloneNode(true)
    tempSvg.appendChild(tempEl)
    let bb = tempEl.getBBox()
    document.body.removeChild(tempDiv)
    return bb
}