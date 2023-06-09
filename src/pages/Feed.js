import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import PostBox from "../components/postBox/PostBox";
import { Link } from "react-router-dom";
import { getFeeds } from "../functions/getFeeds";
import "../sass/feed/Feed.scss";

export default function Feed() {
  const [feeds, setFeeds] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  useEffect(
    function () {
      async function fetchFeeds() {
        const { loggedIn, feedList } = await getFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
        }
      }
      fetchFeeds();
    },
    [setIsLoggedIn]
  );

  if (!isLoggedIn) {
    return (
      <section className="mainSection">
        <div className="notLoggedIn">
          <h2>Please login to access your feeds</h2>
          <h3>
            <Link to={"/login"}>Go back to homepage!</Link>
          </h3>
        </div>
      </section>
    );
  }

  if (feeds === null) {
    return (
      <section className="mainSection">
        <div className="noPosts">
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  if (feeds.length === 0) {
    return (
      <section className="mainSection">
        <div className="noPosts">
          <h2>Users you are following have not posted anything yet!</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="mainSection" id="feed">
      {feeds.map(function (post, index) {
        return <PostBox key={index} post={post} setFeeds={setFeeds} />;
      })}
    </section>
  );
}
