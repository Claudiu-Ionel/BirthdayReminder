import { useEffect, useState, useCallback, useMemo } from 'react';
import './Homepage.css';
const Homepage = ({ userData, isLoading }) => {
  const [filteredUserData, setFilteredUserData] = useState(null);

  const memoizedDate = useMemo(() => {
    const date = new Date();
    const isoDate = date.toISOString();
    // const newDate = isoDate.substring(5, 10);
    return isoDate;
  }, []);

  const filterFriendsByDate = useCallback(() => {
    if (userData) {
      const dateComparedTo = memoizedDate.substring(5, 10);
      const filteredUserData = userData.results.filter(
        (user) => user.dob.date.substring(5, 10) === dateComparedTo,
      );
      setFilteredUserData(filteredUserData);
    }
    console.log('filterFriendsByDate function called');
  }, [memoizedDate, userData]);

  useEffect(() => {
    filterFriendsByDate();
  }, [memoizedDate, filterFriendsByDate]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (filteredUserData === null) {
    return <div>No Birthdays Today</div>;
  }
  return (
    <section id="friends-birthdays">
      <h2>{filteredUserData.length} Birthdays today</h2>
      {filteredUserData.map((user, index) => {
        const userFullName = `${user.name.first} ${user.name.last}`;
        const userPic = user.picture.medium;
        const bgStyle = {
          backgroundImage: `url("${userPic}")`,
        };
        const friendYearOfBirth = user.dob.date.substring(0, 4);
        const currentYear = memoizedDate.substring(0, 4);
        return (
          <article key={index} className="friend">
            <div className="user-image" style={bgStyle}></div>
            <div className="user-details">
              <div className="friend-name">{userFullName}</div>
              <div className="friend-email">{user.email}</div>
              <div>{currentYear - friendYearOfBirth} Years </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Homepage;
