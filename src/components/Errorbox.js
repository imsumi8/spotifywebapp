import React from "react";

const Errorbox = ({message,type}) => {
    return (
        <div className={"row"}>
            <p className={`text-${type}`}>{message}</p>
        </div>
    );
};

export default Errorbox;