export const SearchPanel = ({ param = {}, setParam, users = [] }) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <select name=""
              id=""
              value={param.personId}
              onChange={(evt) => {
                setParam({
                  ...param,
                  personId: evt.target.value,
                });
              }}
      >
        <option value="">负责人</option>
        {
          users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))
        }
      </select>
    </form>
  );
};
