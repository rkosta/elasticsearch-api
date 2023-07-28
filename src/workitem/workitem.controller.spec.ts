import { Test, TestingModule } from '@nestjs/testing';
import { WorkItemController } from './workitem.controller';

describe('WorkItemController', () => {
  let controller: WorkItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkItemController],
    }).compile();

    controller = module.get<WorkItemController>(WorkItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
