import axios from 'axios';

let endpoint = 'http://localhost:8080/query?timeout=20s';

async function query(query: object) {
    return axios.post(endpoint, query, {headers: {'Content-Type': 'application/json'}});
}

export function GetServices() {
    return query({'query':queries.services,'variables':{}});
}

export function GetService(svc: string) {
    return query({'query':queries.service,'variables':{'$service':svc}});
}

const queries = {
    services: `{q(func: has(Service.name)) {
        Service.name
        Service.date
        Service.owner {
            Team.name
        }
        Service.version
    }}`,
    service: `query Service($service: string) {
    Service(func: eq(Service.name, $service)) {
        Service.name
        Service.date
        Service.version
        Service.owner {
            Team.name
        }

        Service.hasRepo {
            Repository.uri
        }

        Service.hasMonitoring {
            Monitoring.type
            Monitoring.uri
        }

        Service.loads {
            External.uri
        }

        Service.trigger {
            Trigger.spec
            Trigger.type
        }

        Service.readsFrom {
            Queue.topic
            Queue.writer {
                Service.name
            }
        }

        Service.writesTo {
            Queue.topic
            Queue.reader {
                Service.name
            }
        }

        Service.storesIn {
            Persistence.type
            Persistence.uri
        }

        Service.calls {
            Service.name
        }

        Service.calledBy {
            Service.name
        }

        Service.hasEntrypoint {
            Entrypoint.type
            Entrypoint.uri
        }
    }}
    `
}
