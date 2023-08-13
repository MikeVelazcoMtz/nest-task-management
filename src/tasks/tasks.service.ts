import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.to';
import { GetTasksFilterDto } from './DTO/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    return this.tasks.filter((item) => {
      if (status && item.status === status) {
        return true;
      }

      if (
        search &&
        (item.description.includes(search) || item.title.includes(search))
      ) {
        return true;
      }

      return false;
    });
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find((task: Task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' was not found.`);
    }

    return task;
  }

  public deleteTaskById(id: string) {
    const filteredTasks = this.tasks.filter((task: Task) => task.id !== id);

    if (filteredTasks.length !== this.tasks.length) {
      this.tasks = filteredTasks;
      return { message: 'task deleted succesfully' };
    }

    throw new NotFoundException(`Task with ID '${id}' was not found.`);
  }

  public updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
