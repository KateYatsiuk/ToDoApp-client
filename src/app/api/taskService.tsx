import { IToDoTask } from '../../models/task/task.model';
import httpModule from '../common/helpers/http.module';
import { API_ENDPOINTS, baseUrl } from '../common/constants/url.constants';
import { ICreateTaskDTO } from '../../models/modals/modals.model';

export const getAllTasks = async (): Promise<IToDoTask[]> => {
  try {
    const response = await httpModule.get<IToDoTask[]>(API_ENDPOINTS.GET_ALL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const createTask = async (task: ICreateTaskDTO) => {
  try {
    const response = await httpModule.post(API_ENDPOINTS.POST, task);
    return response.data;
  } catch (errorInfo) {
    throw new Error('Failed to create the task');
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await httpModule.delete<void>(baseUrl + API_ENDPOINTS.DELETE + `${taskId}`);
  } catch (error) {
    throw new Error('Failed to delete the task');
  }
};

export const updateTask = async (updatedTask: IToDoTask): Promise<void> => {
    try {
      await httpModule.put(baseUrl + API_ENDPOINTS.PUT + `${updatedTask.id}`, updatedTask);
    } catch (error) {
      throw new Error('Failed to update the task');
    }
};
  