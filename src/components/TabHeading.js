import React from "react";

const TabHeading = ({heading}) => {
    return (
        <h2 className={"col-header"}>{heading.toUpperCase()}</h2>
    );
};

export default TabHeading;