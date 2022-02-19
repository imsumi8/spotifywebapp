import React, { Fragment, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ITEM_TYPE from "../constants/types";
import { useSelector, useDispatch } from "react-redux";
import { MoveItem } from "../redux/actions";

const Item = ({ item, index, status }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.data);

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(MoveItem(dragIndex, hoverIndex, playlists, status.id));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { ...item, index },
    type: ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Fragment>
      <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={"item"}>
        <div
          className={"color-bar"}
          style={{ backgroundColor: status.color }}
        />
        <p className={"item-title"}>{item?.name}</p>
        <p className={"item-status"}>{item?.description}</p>
      </div>
    </Fragment>
  );
};

export default Item;
