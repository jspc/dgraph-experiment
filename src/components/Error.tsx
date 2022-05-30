import React from 'react';

const Error = (props) => {
    const e = props.error;

    let msg = "an error occured";
    if (e.response && e.response.data !== null) {
        const data = e.response.data;

        if (data.msg) {
            msg = data.msg;
        }
    }

    return (
        <p key={msg}>
          {msg}
        </p>
    );
};

export default Error;
