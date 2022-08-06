export function transform(svc: object) {
    let graph = {
        links: [],
        nodes: [],
    };

    const base = svc['Service.name'];
    graph.nodes.push({id: base, isa: 'service', isRoot: true});
    graph.focusModeId = base;

    // get any readsFrom topics
    if (svc['Service.readsFrom']) {
        const topic = svc['Service.readsFrom'];

        graph.nodes.push({id: topic['Queue.topic'], isa: 'topic'});
        graph.links.push({source: topic['Queue.topic'], target: base});

        if (topic['Queue.writer']) {
            graph.nodes.push({id: topic['Queue.writer']['Service.name'], isa: 'service'});
            graph.links.push({source: topic['Queue.writer']['Service.name'], target: topic['Queue.topic']});
        }
    }

    // get any writesTo topics
    if (svc['Service.writesTo']) {
        const topic = svc['Service.writesTo'];

        graph.nodes.push({id: topic['Queue.topic'], isa: 'topic'});
        graph.links.push({source: base, target: topic['Queue.topic']});

        if (topic['Queue.reader']) {
            topic['Queue.reader'].map(s => {
                graph.nodes.push({id: s['Service.name'], isa: 'service'});
                graph.links.push({source: topic['Queue.topic'], target: s['Service.name']});
            });
        }
    }

    // calls
    if (svc['Service.calls'] && svc['Service.calls'].length > 0) {
        svc['Service.calls'].map(s => {
            graph.nodes.push({id: s['Service.name'], isa: 'service'});
            graph.links.push({source: base, target: s['Service.name']});
        });
    }

    // called by
    if (svc['Service.calledBy'] && svc['Service.calledBy'].length > 0) {
        svc['Service.calledBy'].map(s => {
            graph.nodes.push({id: s['Service.name'], isa: 'service'});
            graph.links.push({source: s['Service.name'], target: base});
        });
    }

    // entrypoint
    if (svc['Service.hasEntrypoint']) {
        const ep = svc['Service.hasEntrypoint'];

        graph.nodes.push({id: ep['Entrypoint.uri'], isa: ep['Entrypoint.type']});
        graph.links.push({source: ep['Entrypoint.uri'], target: base});
    }

    // trigger
    if (svc['Service.trigger']) {
        const t = svc['Service.trigger'];

        graph.nodes.push({id: t['Trigger.spec'], isa: t['Trigger.type']});
        graph.links.push({source: t['Trigger.spec'], target: base});
    }

    // persistence
    if (svc['Service.storesIn'] && svc['Service.storesIn'].length > 0) {
        svc['Service.storesIn'].map(s => {
            graph.nodes.push({id: s['Persistence.uri'], isa: s['Persistence.type']});
            graph.links.push({source: base, target: s['Persistence.uri']});
        });
    }

    // external urls
    if (svc['Service.loads'] && svc['Service.loads'].length > 0) {
        svc['Service.loads'].map(s => {
            graph.nodes.push({id: s['External.uri'], isa: 'external'});
            graph.links.push({source: base, target: s['External.uri']});
        });
    }

    return graph;
}
