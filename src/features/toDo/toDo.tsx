import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  Image,
  Stack,
  TextInput,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import imageSrc from "../../logo.png";
import X from "../../path-copy.svg";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getToDos,
  selectToDos,
  addNewToDo,
  updateToDoStatus,
  deleteToDo,
} from "./toDoSlice";
import { ToDoList } from "./toDoList";

export function ToDo() {
  const toDos = useAppSelector(selectToDos);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(getToDos());
  }, []);

  const handleStatusChange = (id: number) => {
    dispatch(updateToDoStatus(id));
  };
  const setNewToDo = (content: string) => {
    dispatch(addNewToDo(content));
  };
  const deleteToDoElement = (id: number) => {
    dispatch(deleteToDo(id));
  };
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setNewToDo(value);
      setValue("");
    }
  };
  return (
    <Container w={440}>
      <Card
        px={30}
        py={35}
        h={440}
        shadow="0 2px 16px 0 rgba(0, 0, 0, 0.1)"
        radius={5}
        withBorder
      >
        <Stack justify="space-between" h="100%">
          <Stack spacing={25}>
            <Image alt="logo" width={30} src={imageSrc} />
            <Title align="left" size={22} weight="bold" color="#1f2a4b">
              Todo List
            </Title>
            <TextInput
              sx={{
                borderBottom: "solid 1px #d7dae0",
              }}
              placeholder="Add a new todo"
              variant="unstyled"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <ToDoList filter={filter} />
          </Stack>
          <Group spacing={5}>
            <Text size={14} color="#1f2a4b" weight={500}>
              Show:{" "}
            </Text>
            <Anchor
              variant={filter !== null ? "link" : "text"}
              component="button"
              type="button"
              onClick={() => setFilter(null)}
              underline={filter !== null}
            >
              <Text size={14} weight={"normal"}>
                All
              </Text>
            </Anchor>
            <Anchor
              variant={filter !== false ? "link" : "text"}
              component="button"
              type="button"
              onClick={() => setFilter(false)}
              underline={filter !== false}
            >
              <Text size={14} weight={"normal"}>
                Completed
              </Text>
            </Anchor>
            <Anchor
              variant={filter !== true ? "link" : "text"}
              component="button"
              type="button"
              onClick={() => setFilter(true)}
              underline={filter !== true}
            >
              <Text size={14} weight={"normal"}>
                Incompleted
              </Text>
            </Anchor>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
}
