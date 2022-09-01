interface Project {
    id: number,
    name: string,
    personId: number,
}
interface User {
    id: number,
    name: string,
}
interface Props {
    list: Project[],
    users: User[],
}

export const List = ({list = [], users = []}: Props) => {
  return (
    <table>
      <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      </thead>
      <tbody>
      {
        list.map(l => (
          <tr key={l.id}>
            <td>{l.name}</td>
            <td>
              {
                users.find((u => u.id === l.personId))?.name || '未知'
              }
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};