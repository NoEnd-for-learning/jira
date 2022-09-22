import {ScreenContainer, StyledRow} from 'components/lib';
import { useProjectInUrl } from 'hooks/useDashboards';
import {useDeleteEpic, useEpics, useEpicSearchParams, useEpicsQueryKey} from 'hooks/useEpic';
import { useTasks } from 'hooks/useTask';
import { List, Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import { Epic } from 'interface/epic';
import { CreateEpic } from 'screens/epic/create-epic';
import {useState} from "react";

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl();
    const { data: epics } = useEpics(useEpicSearchParams());
    const { data: tasks } = useTasks({ projectId: currentProject?.id });
    const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组：${epic.name}`,
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteEpic({ id: epic.id });
            },
        });
    };

    return (
        <ScreenContainer>
            <StyledRow between={true}>
                <h1>{currentProject?.name} 任务组</h1>
                <Button onClick={() => setEpicCreateOpen(true)} type="link">
                    创建任务组
                </Button>
            </StyledRow>
            <List dataSource={epics}
                  style={{
                      overflowY: 'scroll'
                  }}
                  itemLayout="vertical"
                  renderItem={epic => <List.Item>
                      <List.Item.Meta
                          title={<StyledRow between={true}>
                              <span>{epic.name}</span>
                              <Button type="link" onClick={() => confirmDeleteEpic(epic)}>删除</Button>
                          </StyledRow>}
                          description={<div>
                              <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                              <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                          </div>}
                      >
                          <div>
                              {
                                  tasks?.filter(
                                      task => task.epicId === epic.id)
                                      .map(task => <Link key={task.id}
                                                         to={`/projects/${currentProject?.id}/dashboard?editingTaskId=${task.id}`}
                                      >{task.name}</Link>)
                              }
                          </div>
                      </List.Item.Meta>
                  </List.Item>}
            />
            <CreateEpic onClose={() => setEpicCreateOpen(false)} visible={epicCreateOpen} />
        </ScreenContainer>
    );
};
