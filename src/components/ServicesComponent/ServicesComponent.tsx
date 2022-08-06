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
import Moment from 'react-moment';

import {
    GetServices,
} from '../../lib/dgraph';

import { ServiceComponent } from '../ServiceComponent';

import Error from '../Error';

function ServiceTable(props: object) {
    console.log(props.svc);

    const columns: TableColumn[] = [
        {
            title: 'Service',
            field: 'Service.name',
            render: (row: Partial<TableData>) => (
                <>
                    <Link to={"/kaluzagraph/svc/" + row['Service.name']}>{row['Service.name']}</Link>
                    <Typography variant="body2">{row.hash}</Typography>
                </>
            ),
        },
        {
            title: 'Owner',
            field: 'Service.owner',
            render: (row: Partial<TableData>) => (
                <>
                    <Link to={"/kaluzagraph/team/" + row['Service.name']['Team.name']}>{row['Service.name']['Team.name']}</Link>
                    <Typography variant="body2">{row.hash}</Typography>
                </>
            ),
        },
        { title: 'Version', field: 'Service.version' },
        {
            title: 'Last Deployed',
            field: 'Service.date',
            render: (row: Partial<TableData>) => (
                <Moment unix>{row['Service.date']}</Moment>
            ),
        },
    ];

    return (
        <Table
            title="Services yo"
            options={{ search: true, paging: false }}
            columns={columns}
            data={props.svc}
        />
    );
}

export function ServicesComponent(props: object) {
    const route = window.location.pathname.split('/');

    if (route.length == 4) {
        switch (route[2]) {
            case 'svc':
                return <ServiceComponent svc={route[3]} />;
                break;

            case 'team':
                return <TeamComponent team={route[3]} />;
                break;
        }
    }

    const [services,setServices] = useState(<CircularProgress />);
    const [err,setErr] = useState();

    React.useEffect(() => {
        GetServices()
            .then(res => {
                console.log(res.data.data.q);

                setServices(<ServiceTable svc={res.data.data.q} />);
            })
            .catch(error => {
                console.log(error);

                setErr([<Error error={error} />]);
            });
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Page themeId="tool">
            <Header title="Services" subtitle="See some services? I dunno">
                <HeaderLabel label="Owner" value="DevEx" />
                <HeaderLabel label="Lifecycle" value="Alpha" />
            </Header>
            <Content>
                <ContentHeader title="Kaluza Graph Services">
                    <SupportButton>A list of services, as taken from the DevEx services model</SupportButton>
                </ContentHeader>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        {services}
                        {err}
                    </Grid>

                </Grid>
            </Content>
        </Page>
    );
}
