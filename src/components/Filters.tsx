import { useContext, useState } from 'react';
import { Stack, Button, TextInput, Group  } from '@mantine/core';
import { useField } from '@mantine/form';
import { StateContext } from '../State';
import { useTimeout } from '@mantine/hooks';


export default function Filters() {
  const appState = useContext(StateContext);
  const { start, clear } = useTimeout((value: string) => {
    console.log("Setting search filter to: ", value.toString());
    appState?.setSearchFilter({...appState.searchFilter, 'query': value.toString()});
    appState?.setSearchActive(true);
  }, 1000);
  
  const field = useField({
    initialValue: '',
    onValueChange: (value) => {
      clear();
      start(value);
    },
  });

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
      <TextInput {...field.getInputProps()} label="Search" placeholder="enter keywords here" mb="md" />
    </Stack>
  );
}