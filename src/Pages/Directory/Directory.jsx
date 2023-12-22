import React, { useState, useEffect } from "react";
import "./Directory.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Directory = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: userList } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const { data: postsList } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const userWithPost = userList.map((user) => {
          user.posts = postsList.filter((p) => p.userId === user.id);
          return user;
        });
        setUsers(userWithPost);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  const handleUserClick = (user) => {
    navigate("/user/" + user?.id);
  };

  return (
    users?.length > 0 &&
    users?.map((user) => (
      <h4 key={user?.id}>
        <div className="container" onClick={() => handleUserClick(user)}>
          <div className="directoryBox">
            <div className="leftContent">
              <div className="directoryDetail">
                <h4>Name:{user?.name}</h4>
              </div>
            </div>

            <div className="rightContent">
              <div className="directoryDetail">
                <h4>Posts: {user?.posts?.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </h4>
    ))
  );
};

export default Directory;
