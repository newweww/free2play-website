'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

const Menu = () => {
  const router = useRouter();

  const { data: session } = useSession()
  console.log(session)

  const [games, setGames] = useState([]);
  const [slideShow, setSlideShow] = useState([]);
  const [pages, setPages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );


  useEffect(() => {
    fetchData();
  }, [pages, selectedGenres, selectedPlatform, orderBy]);

  useEffect(() => {
    setPages(1);
  }, [selectedGenres, selectedPlatform, orderBy]);

  useEffect(() => {
    if (slideShow.length === 0 && games.length > 0) {
      setSlideShow(games);
    }
    if (instanceRef.current && instanceRef.current.refresh) {
      instanceRef.current.refresh();
    }
  }, [games, slideShow, instanceRef]);



  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        platform: selectedPlatform || undefined,
        category: selectedGenres || undefined,
        'sort-by': orderBy || undefined,
      },
      headers: {
        'X-RapidAPI-Key': 'f81aa3971dmsha19da3a86fb9d7dp1136d5jsn894b2fe3d049',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setGames(response.data.slice(0, 48 * pages));
    } catch (error) {
      console.error(error);
    }
  };

  const resetSorting = () => {
    setSelectedGenres(null);
    setSelectedPlatform(null);
    setOrderBy(null);
    setPages(1)
  }

  const handleSlideClick = (game) => {
    router.push(`/pages/${game.id}`);
  }

  return (
    <div className='p-4 '>
      <div className='flex flex-col gap-2 px-36'>
        <h1 className='text-2xl text-white'>Featured Games</h1>
        <hr />
      </div>
      <div className='flex flex-col justify-center min-h-80 m-2 p-4 gap-2'>
        <div key={slideShow.length} ref={sliderRef} className="keen-slider w-auto">
          {slideShow.length > 0 && (
            <div className='flex justify-center h-80 m-2'>
              <div className="keen-slider w-auto">
                {slideShow.map((game) => (
                  <div key={game.id} className="keen-slider__slide" onClick={() => handleSlideClick(game)}>
                    <img src={game.thumbnail} alt={game.title} className="h-full mx-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <hr />

      <div className='flex flex-row gap-2'>
        <div className='inline-block w-1/6'>
          <div className='flex flex-col gap-2 h-auto text-white p-2'>
            <h1 className='text-2xl'>Sorting</h1>
            <hr />
            <div className='flex flex-col gap-2'>
              <p className='text-xl'>Category</p>
              <div className='flex flex-col'>
                {["Shooter", "Strategy", "MOBA", "MMORPG", "Fighting", "Card", "Action", "Sports", "Racing", "MMO", "Social", "Fantasy"].map((genre) => (
                  <div key={genre} className="flex flex-row items-center">
                    <input
                      type="radio"
                      id={genre}
                      name="selectedGenres"
                      value={genre}
                      checked={selectedGenres === genre}
                      onChange={() => setSelectedGenres(genre)}
                    />
                    <label htmlFor={genre} className="ml-2">{genre}</label>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            <div className='flex flex-col gap-2 '>
              <p className='text-xl'>Platform</p>
              {["pc", "browser"].map((platform) => (
                <div key={platform} className="flex flex-row items-center">
                  <input
                    type="radio"
                    id={platform}
                    name="selectedPlatform"
                    value={platform}
                    checked={selectedPlatform === platform}
                    onChange={() => setSelectedPlatform(platform)}
                  />
                  <label htmlFor={platform} className="ml-2">{platform === "pc" ? "PC (Windows)" : "Web Browser"}</label>
                </div>
              ))}
            </div>

            <hr />

            <div className='flex flex-col gap-2'>
              <p className='text-xl'>Order by</p>
              {["alphabetical", "release-date"].map((order) => (
                <div key={order} className="flex flex-row items-center">
                  <input
                    type="radio"
                    id={order}
                    name="orderBy"
                    value={order}
                    checked={orderBy === order}
                    onChange={() => setOrderBy(order)}
                  />
                  <label htmlFor={order} className="ml-2">{order === "alphabetical" ? "Title" : "Release Date"}</label>
                </div>
              ))}
            </div>
            <div className='flex justify-center'>
              <button className='border w-20 mt-3 text-white rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={resetSorting}>Reset</button>
            </div>
          </div>
        </div>
        <div className='w-5/6 flex flex-col '>
          <div className='text-white p-2 flex flex-col gap-2'>
            <h1 className='text-2xl'>Free2Play</h1>
            <hr />
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {games.map((game) => (
              <Card key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
      {
        games.length >= (48 * pages) ? (
          <div className='flex justify-center'>
            <button className='border w-screen mt-3 text-white rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => setPages(pages + 1)}>Load More</button>
          </div>
        ) : (
          <div></div>)
      }
    </div>
  );
};

export default Menu;