import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { TaskRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";
import { NotFoundException } from "@nestjs/common"

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne:  jest.fn()
});

const mockUser = {
    username: 'Ariel',
    id: 'someId',
    password: 'somePassword',
    tasks: []
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTasksRepository},
            ]
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TaskRepository);
    });

    describe('getTasks', () => {
        it('calls TaskRepository.getTasks and returns the result', async () => {
            expect(tasksRepository.getTasks).not.toHaveBeenCalled();  // we can remove this line
            // call tasksService.getTasks, which should then call the repository's getTasks
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(tasksRepository.getTasks).toHaveBeenCalled();  // we can remove this line too, because the test in the next line suffices.
            expect(result).toEqual('someValue')
        });
    })

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: 'Test title',
                description: 'Test desc',
                id: 'someId',
                status: TaskStatus
            };

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException)
        })
    })
})