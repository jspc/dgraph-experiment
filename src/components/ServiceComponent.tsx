import React, { useState } from 'react';

import {
    Typography,
    Grid,
    CircularProgress,
} from '@material-ui/core';

import GitHubIcon from '@mui/icons-material/GitHub';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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
import {
    Relationships,
} from './Graph';

import styles from './ServiceComponent.module.css';

function toTitle(s: string): string {
    if (!s || s === '') {
        return s
    }

    return s.replace('-', ' ').split(' ')
            .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(' ');
}

function monitoringIcon(t: string) {
    switch (t) {
        case 'RUNBOOK':
            return <BookIcon className={styles.icons} />;
        case 'ALERTING':
            return <NotificationsIcon className={styles.icons} />;
        case 'LOGGING':
            return <ManageSearchIcon className={styles.icons} />;
        case 'DASHBOARD':
            return <DashboardIcon className={styles.icons} />
    }

    return <QuestionMarkIcon className={styles.icons} />;
}

function Team(props: object) {
    return (
        <div className={styles.lineItem}>
            <GroupIcon className={styles.icons} />
            <Link to={"/kaluzagraph/team/" + props.team}>
                {toTitle(props.team)}
            </Link>

        </div>

    );
}

function Repo(props: object) {
    return (
        <div className={styles.lineItem}>
                <GitHubIcon className={styles.icons} />
                <a href={'https://' + props.repo} target='_blank' rel="noopener noreferrer">
                    {props.repo}
                </a>
            </div>
    );
}

function Repos(props: object) {
    return props.repos.map((object, i) => <Repo repo={object['Repository.uri']} key={i} />);
}

function Monitoring(props: object) {
    return (
        <div className={styles.lineItem}>
            {monitoringIcon(props.type)}

            <a href={'https://' + props.uri} target='_blank' rel="noopener noreferrer">
                {toTitle(props.type) + ': ' + props.uri}
            </a>
        </div>
    )
}

function Monitorings(props: object) {
    return props.mons.map((object, i) => <Monitoring type={object['Monitoring.type']} uri={object['Monitoring.uri']} key={i} />);
}

export function ServiceComponent(props: object) {
    const svc = props.svc;

    const [svcName, setSvcName] = useState();
    const [repos, setRepos] = useState();
    const [team, setTeam] = useState();
    const [monitoring, setMonitoring] = useState();
    const [infra,setInfra] = useState();

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

                setSvcName(toTitle(svc['Service.name']));
                setTeam(<Team team={svc['Service.owner']['Team.name']} />);
                setRepos(<Repos repos={svc['Service.hasRepo']} />);
                setMonitoring(<Monitorings mons={svc['Service.hasMonitoring']} />);
                setInfra(<Relationships svc={svc} />);
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
                <ContentHeader title={svcName}>
                    <SupportButton>See some bullshit about the {svcName} service</SupportButton>
                </ContentHeader>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <p>
                            The such and such service is a thing written in a language and deployed via some method.
                        </p>
                        <p>
                            TODO: load this information from dgraph.
                        </p>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3>
                            Details
                        </h3>

                        {team}
                        {repos}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <h3>
                            Learn More
                        </h3>

                        {monitoring}
                    </Grid>


                    <Grid item xs={12} >
                        <h3>
                            Relationships
                        </h3>

                        {infra}
                    </Grid>

                    <Grid item>
                        {err}
                    </Grid>

                </Grid>
            </Content>
        </Page>
    );
}
