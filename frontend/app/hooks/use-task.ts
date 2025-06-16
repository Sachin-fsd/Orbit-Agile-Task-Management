import type { CreateTaskFormData } from "@/components/task/create-task-dialog";
import { deleteData, fetchData, postData, updateData } from "@/lib/fetch-utils";
import type { TaskPriority, TaskStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreateTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskData: CreateTaskFormData; projectId: string }) =>
            postData(`/tasks/${data.projectId}/create-task`, data.taskData),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["project", data.project],
            });
        },
    });
};


export const useTaskByIdQuery = (taskId: string) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: async () => await fetchData(`/tasks/${taskId}`),
    })
};

export const useUpdateTaskTitleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; title: string }) =>
            updateData(`/tasks/${data.taskId}/title`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
             queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useUpdateTaskStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; status: TaskStatus }) =>
            updateData(`/tasks/${data.taskId}/status`, { status: data.status }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
             queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useUpdateTaskDescriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; description: string }) =>
            updateData(`/tasks/${data.taskId}/description`, { description: data.description }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
             queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useUpdateTaskAssigneesMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; assignees: string[] }) =>
            updateData(`/tasks/${data.taskId}/assignees`, { assignees: data.assignees }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useUpdateTaskPriorityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; priority: TaskPriority }) =>
            updateData(`/tasks/${data.taskId}/priority`, { priority: data.priority }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useAddSubTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; title: string }) =>
            postData(`/tasks/${data.taskId}/add-subtask`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useUpdateSubTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; subTaskId: string, completed: boolean }) =>
            postData(`/tasks/${data.taskId}/update-subtask/${data.subTaskId}`, { completed: data.completed }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useAddCommentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string; text: string }) =>
            postData(`/tasks/${data.taskId}/add-comment`, { text: data.text }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["comments", data.task],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data.task],
            });
        },
    });
}

export const useGetCommentsByTaskIdQuery = (taskId: string) => {
    return useQuery({
        queryKey: ["comments", taskId],
        queryFn: async () => await fetchData(`/tasks/${taskId}/comments`),
    })
};

export const useWatchTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string}) =>
            postData(`/tasks/${data.taskId}/watch`, {}),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useArchivedTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { taskId: string}) =>
            postData(`/tasks/${data.taskId}/archived`, {}),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id],
            });
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id],
            });
        },
    });
}

export const useGetMyTasksQuery = () => {
    return useQuery({
        queryKey: ["my-tasks", "user"],
        queryFn: async () => await fetchData(`/tasks/my-tasks`),
    })
};

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) =>
      await deleteData(`/tasks/${taskId}`),
  });
};

// hooks/use-task.ts
export const useGetArchivedTasksQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["archived-tasks", workspaceId],
    queryFn: async () => await fetchData(`/tasks/archived?workspaceId=${workspaceId}`),
    // enabled: !!workspaceId,
  });
};