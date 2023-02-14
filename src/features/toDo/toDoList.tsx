import { ActionIcon, Checkbox, Group, Image, Stack } from "@mantine/core";
import X from "../../path-copy.svg";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectToDos, updateToDoStatus, deleteToDo } from "./toDoSlice";

interface IToDo {
  id: number;
  content: string;
  completed: boolean;
}

export function ToDoList(props: any) {
  const toDos = useAppSelector(selectToDos);
  const dispatch = useAppDispatch();

  const handleStatusChange = (id: number) => {
    dispatch(updateToDoStatus(id));
  };
  const deleteToDoElement = (id: number) => {
    dispatch(deleteToDo(id));
  };

  return (
    <Stack>
      {toDos
        ?.filter((toDo: IToDo) => toDo.completed !== props.filter)
        .sort((a: any, b: any) => b.completed - a.completed)
        .map((toDo: IToDo) => (
          <Group position="apart">
            <Checkbox
              checked={toDo.completed}
              label={toDo.content}
              onChange={() => handleStatusChange(toDo.id)}
            />
            <ActionIcon
              size={11}
              color="red"
              onClick={() => deleteToDoElement(toDo.id)}
            >
              <Image src={X} />
            </ActionIcon>
          </Group>
        ))}
    </Stack>
  );
}
