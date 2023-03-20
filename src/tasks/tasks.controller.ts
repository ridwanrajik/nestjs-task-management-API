import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    // @Get()
    // getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    // @Post()
    // createTask( @Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    @Patch('/:id/status')
    updateTaskStatus( @Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    // @Patch('/:id/status')
    // updateTaskStatus( @Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    //     const {status} = updateTaskStatusDto
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
}
