import { User } from "../types";
import { FC } from "react";
interface UserTableProps {
  users: User[];
  filterText: string;
}

const UserTable: FC<UserTableProps> = ({ users, filterText }) => {
  if (users.length === 0) {
    return <div>таких нет "{filterText}"</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>имя</th>
          <th>картинка</th>
          <th>локация</th>
          <th>почта</th>
          <th>тел</th>
          <th>регистрация</th>
        </tr>
      </thead>

      {users.map((user, idx) => {
        const fullName = `${user.name.first} ${user.name.last}`;
        const location = `${user.location.state}, ${user.location.city}`;
        const registeredDate = new Date(
          user.registered.date,
        ).toLocaleDateString("ru-RU");
        return (
          <tr key={idx}>
            <td>{fullName}</td>
            <td>
              <div className="pictureContainer">
                <img src={user.picture.thumbnail} />
                <div className="pictureLarge">
                  <img src={user.picture.large} />
                </div>
              </div>
            </td>
            <td>{location}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{registeredDate}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default UserTable;
