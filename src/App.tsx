import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Filter from "./components/Filter";
import UserTable from "../src/components/Table";
import { User } from "./types";
import { FC } from "react";
import "./App.css";

const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=15")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFilter = (text: string) => setFilter(text);
  const handleReset = () => setFilter("");

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(filter.toLowerCase());
  });

  if (loading) return <Loader />;

  return (
    <div>
      <h1 id="test" className="test2">
        Пользыватели
      </h1>
      <Filter onFilter={handleFilter} onReset={handleReset} />
      <UserTable users={filteredUsers} filterText={filter} />
    </div>
  );
};

export default App;
