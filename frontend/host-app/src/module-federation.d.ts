declare module 'task_module/TaskList' {
    const Component: React.ComponentType;
    export default Component;
}

declare module 'ui_components/components' {
    import { ComponentType } from 'react';

    export const Button: ComponentType<any>;
    export const Input: ComponentType<any>;
    export const Loader: ComponentType<any>;
    // другие экспорты...
}