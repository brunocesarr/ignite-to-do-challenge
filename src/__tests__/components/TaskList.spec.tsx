import { fireEvent, render, screen } from '@testing-library/react';

import { TaskList } from '../../components/TaskList';

describe('My Tasks Page', () => {
  it('should be able to add a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new to do');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'ReactJS Ignite Challenge'
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('ReactJS Ignite Challenge');

    expect(addedFirstTaskTitle).toHaveTextContent('ReactJS Ignite Challenge');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    fireEvent.change(taskInput, {
      target: {
        value: 'Drink water'
      }
    });
    fireEvent.click(addTaskButton);

    const addedSecondTaskTitle = screen.getByText('Drink water');

    expect(addedFirstTaskTitle).toBeInTheDocument();
    expect(addedFirstTaskTitle).toHaveTextContent('ReactJS Ignite Challenge');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')

    expect(addedSecondTaskTitle).toHaveTextContent('Drink water');
    expect(addedSecondTaskTitle.parentElement).not.toHaveClass('completed')
  })

  it('should not be able to add a task with a empty title', () => {
    render(<TaskList />);

    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.click(addTaskButton);

    expect(screen.queryByTestId('task')).not.toBeInTheDocument();

    const taskInput = screen.getByPlaceholderText('Add new to do');

    fireEvent.change(taskInput, {
      target: {
        value: 'ReactJS Ignite Challenge'
      }
    });
    
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('ReactJS Ignite Challenge');

    expect(addedFirstTaskTitle).toHaveTextContent('ReactJS Ignite Challenge');
  })

  it('should be able to remove a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new to do');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'ReactJS Ignite Challenge'
      }
    });
    fireEvent.click(addTaskButton);

    fireEvent.change(taskInput, {
      target: {
        value: 'Drink water'
      }
    });
    fireEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('ReactJS Ignite Challenge');
    const addedSecondTaskTitle = screen.getByText('Drink water');

    expect(addedFirstTaskTitle).toBeInTheDocument()
    expect(addedSecondTaskTitle).toBeInTheDocument();

    const [addedFirstTaskRemoveButton] = screen.getAllByTestId('remove-task-button');

    fireEvent.click(addedFirstTaskRemoveButton);

    expect(addedFirstTaskTitle).not.toBeInTheDocument();
    expect(addedSecondTaskTitle).toBeInTheDocument();
  })

  it('should be able to check a task', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Add new to do');
    const addTaskButton = screen.getByTestId('add-task-button');

    fireEvent.change(taskInput, {
      target: {
        value: 'ReactJS Ignite Challenge'
      }
    });
    fireEvent.click(addTaskButton);

    fireEvent.change(taskInput, {
      target: {
        value: 'Drink water'
      }
    });
    fireEvent.click(addTaskButton);

    const [addedFirstTask, addedSecondTask] = screen.getAllByTestId('task');

    if (addedFirstTask.firstChild) {
      fireEvent.click(addedFirstTask.firstChild)
    }

    expect(addedFirstTask).toBeInTheDocument();
    expect(addedFirstTask).toHaveClass('completed');

    expect(addedSecondTask).toBeInTheDocument();
    expect(addedSecondTask).not.toHaveClass('completed');
  })
})
