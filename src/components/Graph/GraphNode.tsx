import React from 'react';

import { Link } from 'react-router-dom';

import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import PersonIcon from '@mui/icons-material/Person';
import TopicIcon from '@mui/icons-material/Topic';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import styles from './GraphNode.module.css';

function icon(isa: string) {
    switch(isa) {
        case 'service':
            return <ComputerIcon className={styles.icon} />;

        case 'topic':
            return <TopicIcon className={styles.icon} />;

        case 'HTTP':
        case 'GRPC':
            return <PersonIcon className={styles.icon} />;

        case 'CRON':
            return <AccessTimeIcon className={styles.icon} />;

        case 'CACHE':
        case 'DISK':
            return <StorageIcon className={styles.icon} />;

        case 'external':
            return <CloudIcon className={styles.icon} />;

        default:
            return <QuestionMark className={styles.icon} />;
    }
}

export function Node(props: object) {
    return (
        <div className={`node ${props.node.isa}`}>
            {icon(props.node.isa)}

            {props.node.id}
        </div>
    );
}
