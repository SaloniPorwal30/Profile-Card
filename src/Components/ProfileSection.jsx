import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/Profile/Profile.css";
import { useParams } from "react-router-dom";

const ProfileSection = () => {
  const [user, setUser] = useState([]);
  const params = useParams();
  // console.log("Params", params);
  const fetchInfo = async () => {
    try {
      const { data: userList } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      const { data: postsList } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      const userWithPost = userList.map((user) => {
        user.posts = postsList.filter((p) => p.userId === user.id);
        return user;
      });
      const currentUser = userWithPost.find(
        (user) => user.id === Number(params.id)
      );
      setUser(currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="container">
      <div className="profileCard">
        <div className="profileLeft">
          <div className="profileDetail">
            <h4>Name: {user?.name}</h4>
          </div>
          <div className="profileDetail">
            <h4>
              Username: {user?.username} | Catch phrase:
              {user?.company?.catchPhrase}
            </h4>
          </div>
        </div>

        <div className="profileRight">
          <div className="profileDetail">
            <h4>
              Address:{" "}
              {`${user?.address?.street},${user?.address?.suite},${user?.address?.city},${user?.address?.zipcode}`}
            </h4>
          </div>
          <div className="profileDetail">
            <h4>
              Email: {user?.email} | Phone:{user?.phone}
            </h4>
          </div>
        </div>
      </div>
      <div className="cardBox">
        {user?.posts?.map((post) => (
          <div className="cardWidth">
            <div className="profileCard">
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
