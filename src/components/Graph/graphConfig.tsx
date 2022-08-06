import React from 'react';

import {
    Node
} from './GraphNode';

export default {
    "automaticRearrangeAfterDropNode": false,
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "freezeAllDragEvents": false,
    "height": 300,
    "highlightDegree": 1,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 8,
    "minZoom": 0.1,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 1200,
    "d3": {
        "alphaTarget": 0.05,
        "gravity": -100,
        "linkLength": 150,
        "linkStrength": 1,
        "disableLinkForce": false
    },
    "node": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 18,
        "fontWeight": "normal",
        "highlightColor": "red",
        "highlightFontSize": 12,
        "highlightFontWeight": "bold",
        "highlightStrokeColor": "SAME",
        "highlightStrokeWidth": 1.5,
        "labelProperty": "id",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "size": {
            "width": 700,
            "height": 900
        },
        "strokeColor": "none",
        "strokeWidth": 1.5,
        viewGenerator: node => <Node node={node} />,
    },
    "link": {
        "color": "#d3d3d3",
        "fontColor": "black",
        "fontSize": 8,
        "fontWeight": "normal",
        "highlightColor": "blue",
        "highlightFontSize": 8,
        "highlightFontWeight": "normal",
        "labelProperty": "label",
        "mouseCursor": "pointer",
        "opacity": 1,
        "renderLabel": false,
        "semanticStrokeWidth": false,
        "strokeWidth": 4,
        "markerHeight": 6,
        "markerWidth": 6,
        "strokeDasharray": 0,
        "strokeDashoffset": 0,
    }
}
