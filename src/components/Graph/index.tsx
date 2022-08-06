import React from 'react';
import { Graph } from "freezeman-d3-graph";

import {
    transform,
} from '../../lib/transformer';

import graphConfig from './graphConfig';

export function Relationships(props: object) {
    const data = transform(props.svc);

    const onClickNode = function(nodeId) {
        window.alert('/kaluzagraph/svc/' + nodeId);
    };

    return (
        <Graph
            id="relationships"
            data={data}
            config={graphConfig}
            onClickNode={onClickNode}
        />
    );
}
