import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useQuery, useMutation, useQueryCache } from 'react-query';

interface IDoto {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Example: FC = () => {
  const classes = useStyles();
  const getTotos = () =>
    axios.get('https://jsonplaceholder.typicode.com/todos');
  const postTodo = (values: IDoto) =>
    axios.post('https://jsonplaceholder.typicode.com/todos', { ...values });
  // Cache
  const cache = useQueryCache();
  // Queries
  const todosQuery = useQuery('todos', getTotos);
  // Mutations
  const [addTodo] = useMutation((values: IDoto) => postTodo(values), {
    onSuccess: () => {
      // Query Invalidations
      cache.invalidateQueries('todos');
    },
  });
  useEffect(() => {
    console.log('todosQuery', todosQuery);
  }, [todosQuery]);

  if (todosQuery.isLoading) {
    return (
      <Container maxWidth="sm">
        <span>Loading...</span>
      </Container>
    );
  }

  if (todosQuery.isError) {
    return <span>Error: {todosQuery.error}</span>;
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Button
        variant="contained"
        onClick={() =>
          addTodo({
            completed: false,
            userId: 1,
            id: Date.now(),
            title: 'Do Laundry',
          })
        }
      >
        add Todo
      </Button>
      <List>
        {todosQuery.data?.data?.map((todo: IDoto) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Example;
