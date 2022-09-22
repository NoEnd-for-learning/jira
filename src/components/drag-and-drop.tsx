import {
    Droppable,
    DroppableProps,
    DroppableProvided,
    DroppableProvidedProps,
    DraggableProps,
    Draggable,
} from 'react-beautiful-dnd';
import {ReactNode, isValidElement, cloneElement, forwardRef, HTMLAttributes} from 'react';

// 重新定义 children 属性
type DropProps = Omit<DroppableProps, 'children'> & {children: ReactNode};

export const Drop = ({children, ...props}: DropProps) => {
    return <Droppable {...props}>
        {
            ((provided) => {
                if(isValidElement(children)) {
                    return cloneElement(children, {
                        ...provided.droppableProps,
                        // @ts-ignore
                        ref: provided.innerRef,
                        provided,
                    });
                }
                return <div/>;
            })
        }
    </Droppable>;
};

type DropChildProps = Partial<{
    provided: DroppableProvided,
} & DroppableProvidedProps> & HTMLAttributes<HTMLDivElement>;

export const DropChild = forwardRef<HTMLDivElement, DropChildProps>(({children, ...props}, ref) => <div ref={ref} {...props}>
    {children}
    {props.provided?.placeholder}
</div>);

type DragProps = Omit<DraggableProps, 'children'> & {children: ReactNode};
export const Drag = ({children, ...props}: DragProps) => {
    return <Draggable {...props}>
        {
            ((provided) => {
                if(isValidElement(children)) {
                    return cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        // @ts-ignore
                        ref: provided.innerRef,
                        provided,
                    });
                }
                return <div/>;
            })
        }
    </Draggable>;
};
