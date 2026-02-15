import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="list">
      <h2>User List</h2>

      <table>
        <thead>
          <tr>
            {users.length > 0 &&
              Object.keys(users[0]).map(
                (key) =>
                  key !== "id" && <th key={key}>{key}</th>
              )}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {Object.keys(user).map(
                (key) =>
                  key !== "id" && <td key={key}>{user[key]}</td>
              )}
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
