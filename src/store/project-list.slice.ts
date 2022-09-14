import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface State {
    projectModalOpen: boolean,
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        open(state, action) {
            // 表面上是直接给state 赋值，不规范
            // 实际上 toolkit 内部使用了 immer, 保证了数据的不可变性
            // https://immerjs.github.io/immer/
            state.projectModalOpen = true;
        },
        close(state, action) {
            state.projectModalOpen = false;
        },
    },
});

export const projectListActions = projectListSlice.actions;

export const pickProjectModalState = (state: RootState) => state.projectList.projectModalOpen;
