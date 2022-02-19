import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../constants/types";
import { listHeaders } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { UpdatePlaylist } from "../redux/actions";

const DropWrapper = ({children, headId }) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.data);

    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = listHeaders.findIndex(si => si.id === item.header_id);
            const headIndex = listHeaders.findIndex(si => si.id === headId);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(headIndex);
        },
        drop: (item, monitor) => {
            dispatch(UpdatePlaylist(item, headId,playlists));
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;