declare module "task_module/TaskList";
declare module "kanban_module/Kanban";
declare module "ui_components/components";

declare namespace jest {
    interface Matchers<R> {
        toBeInTheDocument(): R;
    }
}