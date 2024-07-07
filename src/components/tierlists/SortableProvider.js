// "use client";
// import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

// import { ListEditItem } from "./ListEditPopup";

export default function SortableProvider({ items, setItems, type, children }) {
  // const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // function handleDragStart(event) {
  //   setActiveId(event.active.id);
  // }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((prevItems) => {
        const newItems = { ...prevItems };

        const array = newItems[type];

        const oldIndex = array.findIndex((item) => item.id === active.id);
        const newIndex = array.findIndex((item) => item.id === over.id);

        newItems[type] = arrayMove(array, oldIndex, newIndex);

        return newItems;
      });
    }
    // setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // onDragStart={handleDragStart}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      {/* <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeId ? (
          <ListEditItem
            item={items.find((el) => el.id === activeId)}
            onChange={() => null}
            checked={false}
          />
        ) : null}
      </DragOverlay> */}
    </DndContext>
  );
}
