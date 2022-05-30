import React, { useState } from 'react';
import {
    Typography,
    Grid,
    CircularProgress,
} from '@material-ui/core';

import {
    InfoCard,
    Header,
    Page,
    Content,
    ContentHeader,
    HeaderLabel,
    SupportButton,
    Table,
    TableColumn,
} from '@backstage/core-components';

import { Link } from 'react-router-dom';

import {
    GetService,
} from '../lib/dgraph';

import Error from './Error';

function toTitle(s: string): string {
    if (!s || s === '') {
        return s
    }

    return s.replace('-', ' ').split(' ')
            .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(' ');
}

function toStr(o: object): string {
    let seen = [];

    return JSON.stringify(o, function(key, val) {
        if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    }, 2);
}

export function ServiceComponent(props: object) {
    const svc = props.svc;

    const [service,setService] = useState(<CircularProgress />);
    const [repo,setRepo] = useState(<CircularProgress />);
    const [team,setTeam] = useState(<CircularProgress />);

    const [err,setErr] = useState();

    React.useEffect(() => {
        GetService(svc)
            .then(res => {
                let svcData = res.data.data.Service;
                if (svcData.length == 0) {
                    setErr(<Error error='Service ${svc} is unrecognised yo' />);
                    return;
                }

                console.log(svcData[0]);

                let svc = svcData[0];

                setService(svc);
                setRepo('https://' + svc['Service.hasRepo'][0]['Repository.uri']);
                setTeam(svc['Service.owner']);
            })
            .catch(error => {
                console.log(error);

                setErr([<Error error={error} />]);
            });
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Page themeId="tool">
            <Header title="Service Information" subtitle="See some bullshit about some service">
                <HeaderLabel label="Owner" value="DevEx" />
                <HeaderLabel label="Lifecycle" value="Alpha" />
            </Header>
            <Content>
                <ContentHeader title={'Service: ' + toTitle(service['Service.name'])}>
                    <SupportButton>See some bullshit about the {toTitle(service['Service.name'])} service</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="column">
                    <Grid item >
                        <Typography variant='body1'>
                            <p>
                                Repo: <a href={repo} target="_blank">{repo}</a>
                            </p>

                            <p>
                                Owner: {team}
                            </p>

                            <pre>
                                {toStr(service)}
                            </pre>
                        </Typography>
                    </Grid>

                    <Grid item>
                        {err}
                    </Grid>

                </Grid>
            </Content>
        </Page>
    );
}
