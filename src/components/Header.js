import React from "react";

const Header = ({message}) => {
    return (
        <div className={"row"}>
            <p className={"page-header"}>{message}</p>
        </div>
    );
};

export default Header;