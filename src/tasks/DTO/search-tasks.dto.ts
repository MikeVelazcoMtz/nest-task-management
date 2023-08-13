import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

class searchTasksDto {
  @IsOptional()
  @IsNotEmpty()
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskStatus)
  search?: string;
}
