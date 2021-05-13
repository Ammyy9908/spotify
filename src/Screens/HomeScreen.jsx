import React from "react";
import AlbumCardBig from "../Components/AlbumCardBig";
import PodCastCard from "../Components/PodCastCard";
import RecomendedSongCard from "../Components/RecomendedSongCard";
import { useStateValue } from "../StateProvider";

function HomeScreen() {
  const [message, setMessage] = React.useState("Good Morning");
  const [{ recents }, dispatch] = useStateValue();

  console.log("recents", recents);

  React.useEffect(() => {
    async function timeOfDay() {
      let hour = new Date().getHours();
      if (hour >= 1 && hour <= 11) return "Morning";
      if (hour >= 12 && hour <= 16) return "Afternoon";
      if (hour >= 17 && hour <= 20) return "Evening";
      if (hour >= 21 || hour <= 12) return "Night";
    }

    //change active tab when comonent state change

    dispatch({
      type: "SET_ACTIVE_TAB",
      activeTab: "home",
    });

    timeOfDay().then((message) => setMessage(message));
  }, [message]);

  const recommended = [
    {
      name: "Rono",
      type: "artist",
      thumb: "https://i.scdn.co/image/4b5276b3bfad7ed001bc07aeb4a01c64c182e818",
    },
    {
      name: "Daily Mix 1",
      type: "mix",
      thumb:
        "https://dailymix-images.scdn.co/v2/img/b4760c407da71c3936f22d47c2dc337c177de596/1/en/default",
    },
    {
      name: "cold/mess",
      type: "album",
      thumb: "https://i.scdn.co/image/ab67616d0000b2738155c99a241d4c57b2c3f88d",
    },
    {
      name: "KTMBK",
      type: "album",
      thumb: "https://i.scdn.co/image/ab67616d0000b273b7f7e6059136889dd99fb068",
    },
    {
      name: "Anuv Jain",
      type: "artist",
      thumb: "https://i.scdn.co/image/78de9b4a684de3d2ebac419b4d57de91034d3d60",
    },
    {
      name: "Dinner & Chill",
      type: "mix",
      thumb: "https://i.scdn.co/image/ab67706f0000000233ecfc2b6631d21a75440f95",
    },
  ];
  const albums = [
    {
      id: 1,
      artist: "Rono",
      type: "artist",
      thumb: "https://i.scdn.co/image/4b5276b3bfad7ed001bc07aeb4a01c64c182e818",
    },
    {
      id: 2,
      artist: "Khan Bhani",
      type: "artist",
      thumb: "https://i.scdn.co/image/7d8b266704dc295f799f883b4c2ef8914475b463",
    },
    {
      id: 3,
      artist: "KTMBK",
      type: "album",
      artists: ["Zaedan", "Hanita Bhambri"],
      thumb: "https://i.scdn.co/image/ab67616d0000b273b7f7e6059136889dd99fb068",
    },
    {
      id: 4,
      artist: "Pitbull",
      type: "artist",
      thumb: "https://i.scdn.co/image/1353990534aef10c946cf3a47865ac22471be5c4",
    },
    {
      id: 5,
      artist: "Anuv Jain",
      type: "artist",
      thumb: "https://i.scdn.co/image/78de9b4a684de3d2ebac419b4d57de91034d3d60",
    },
  ];

  //podcasts

  const podcasts = [
    {
      id: 1,
      author: "Stanford GSB",
      title: "Think Smart,Talk Smart",
      thumb: "https://i.scdn.co/image/b5a470d7d4dd60053c3aa8b31b7b5dbebb0b1a7c",
    },
    {
      id: 2,
      author: "The New York Times",
      title: "Modern Love",
      thumb: "https://i.scdn.co/image/4815ba6ecf91db6c3946d923e33712226d46d780",
    },
    {
      id: 3,
      author: "Cadence13",
      title: "VIEWS With David & Jason Nash",
      thumb: "https://i.scdn.co/image/ab6765630000ba8aa0f5764d435d6cbbbb7ea16d",
    },
    {
      id: 4,
      author: "Tim Ferris,BestSelling Author,Human Guinea Pig",
      title: "The Ferm Ferris Show",
      thumb: "https://i.scdn.co/image/07fa4012411c0244688d53c6b68aea10184cdf80",
    },
    {
      id: 5,
      author: "Garry Vaynerchuck",
      title: "The GarryVee Audio Experience",
      thumb: "https://i.scdn.co/image/534dcc01b53149409352f439145482ef1d32d686",
    },
  ];
  return (
    <div className="home-screen">
      <div className="home__wrapper">
        <h2>{`Good ${message}`}</h2>
        <div className="songs__sections">
          <div className="recommeded__songs">
            {recommended.map((recommend) => (
              <RecomendedSongCard
                name={recommend.name}
                thumb={recommend.thumb}
              />
            ))}
          </div>
          <div className="recents__songs">
            <div className="section__header">
              <h3>Recently Played</h3>
              <a href="#">SEE ALL</a>
            </div>
            <div className="recent__songs__wraper">
              {recents &&
                recents.slice(1, 6).map((album, i) => {
                  return (
                    <AlbumCardBig
                      thumb={album.track.album.images[0].url}
                      artist={album.track.artists[0].name}
                      track={album.track.name}
                    />
                  );
                })}
            </div>
          </div>
          <div className="recommended__podcasts">
            <div className="section__header">
              <h3>Shows you might like</h3>
              <a href="#">SEE ALL</a>
            </div>
            <div className="recommended_podcasts__wrapper">
              {podcasts.map((podcast, i) => (
                <PodCastCard
                  thumb={podcast.thumb}
                  title={podcast.title}
                  author={podcast.author}
                />
              ))}
            </div>
          </div>
          <div className="made_for_you"></div>
          <div className="more__like"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
