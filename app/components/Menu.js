'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const Menu = () => {
  const [games, setGames] = useState([]);
  const [slideShow, setSlideShow] = useState([]);
  const [pages, setPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  useEffect(() => {
    fetchData();
  }, [pages, selectedGenres, selectedPlatform, orderBy]);

  useEffect(() => {
    if (slideShow.length === 0 && games.length > 0) {
      setSlideShow(games); 
    }
  }, [games, slideShow]);
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
      const uniqueGenres = Array.from(new Set(response.data.map((game) => game.genre)));
      setGenres(uniqueGenres);
      const uniquePlatforms = Array.from(new Set(response.data.map((game) => game.platform)));
      setPlatforms(uniquePlatforms);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSorting = () => {
    setSelectedGenres(null);
    setSelectedPlatform(null);
    setOrderBy(null);
  }

  return (
    <div className='p-4 '>
      <div className='flex justify-center h-80 m-2'>
        <div ref={sliderRef} className="keen-slider w-auto">
          {slideShow.length > 0 && (
            <div className='flex justify-center h-80 m-2'>
              <div ref={sliderRef} className="keen-slider w-auto">
                {slideShow.map((game) => (
                  <div key={game.id} className="keen-slider__slide">
                    <img src={game.thumbnail} alt={game.title} className="h-full mx-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-row gap-2'>
        <div className='inline-block w-1/6'>
          <div className='flex flex-col gap-2 h-auto text-white p-2'>
            <h1 className='text-2xl'>Sorting</h1>
            <hr />
            <div className='flex flex-col gap-2'>
              <p className='text-xl'>Category</p>
              <div className='flex flex-col'>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Shooter"
                    name="selectedGenres"
                    value="Shooter"
                    checked={selectedGenres === "Shooter"}
                    onChange={() => setSelectedGenres("Shooter")}
                  />
                  <label htmlFor="Shooter" className="ml-2">Shooter</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Strategy"
                    name="selectedGenres"
                    value="Strategy"
                    checked={selectedGenres === "Strategy"}
                    onChange={() => setSelectedGenres("Strategy")}
                  />
                  <label htmlFor="Strategy" className="ml-2">Strategy</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="MOBA"
                    name="selectedGenres"
                    value="MOBA"
                    checked={selectedGenres === "MOBA"}
                    onChange={() => setSelectedGenres("MOBA")}
                  />
                  <label htmlFor="MOBA" className="ml-2">MOBA</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="MMORPG"
                    name="selectedGenres"
                    value="MMORPG"
                    checked={selectedGenres === "MMORPG"}
                    onChange={() => setSelectedGenres("MMORPG")}
                  />
                  <label htmlFor="MMORPG" className="ml-2">MMORPG</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Fighting"
                    name="selectedGenres"
                    value="Fighting"
                    checked={selectedGenres === "Fighting"}
                    onChange={() => setSelectedGenres("Fighting")}
                  />
                  <label htmlFor="Fighting" className="ml-2">Fighting</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Card"
                    name="selectedGenres"
                    value="Card"
                    checked={selectedGenres === "Card"}
                    onChange={() => setSelectedGenres("Card")}
                  />
                  <label htmlFor="Card" className="ml-2">Card Game</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Action"
                    name="selectedGenres"
                    value="Action"
                    checked={selectedGenres === "Action"}
                    onChange={() => setSelectedGenres("Action")}
                  />
                  <label htmlFor="Action" className="ml-2">Action</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Sports"
                    name="selectedGenres"
                    value="Sports"
                    checked={selectedGenres === "Sports"}
                    onChange={() => setSelectedGenres("Sports")}
                  />
                  <label htmlFor="Sports" className="ml-2">Sports</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Racing"
                    name="selectedGenres"
                    value="Racing"
                    checked={selectedGenres === "Racing"}
                    onChange={() => setSelectedGenres("Racing")}
                  />
                  <label htmlFor="Racing" className="ml-2">Racing</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="MMO"
                    name="selectedGenres"
                    value="MMO"
                    checked={selectedGenres === "MMO"}
                    onChange={() => setSelectedGenres("MMO")}
                  />
                  <label htmlFor="MMO" className="ml-2">MMO</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Social"
                    name="selectedGenres"
                    value="Social"
                    checked={selectedGenres === "Social"}
                    onChange={() => setSelectedGenres("Social")}
                  />
                  <label htmlFor="Social" className="ml-2">Social</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="Fantasy"
                    name="selectedGenres"
                    value="Fantasy"
                    checked={selectedGenres === "Fantasy"}
                    onChange={() => setSelectedGenres("Fantasy")}
                  />
                  <label htmlFor="Fantasy" className="ml-2">Fantasy</label>
                </div>

              </div>
            </div>

            <hr />

            <div className='flex flex-col gap-2 '>
              <p className='text-xl'>Platform</p>
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="pc"
                  name="selectedPlatform"
                  value="pc"
                  checked={selectedPlatform === "pc"}
                  onChange={() => setSelectedPlatform("pc")}
                />
                <label htmlFor="pc" className="ml-2">PC (Windows)</label>
              </div>
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="browser"
                  name="selectedPlatform"
                  value="browser"
                  checked={selectedPlatform === "browser"}
                  onChange={() => setSelectedPlatform("browser")}
                />
                <label htmlFor="browser" className="ml-2">Web Browser</label>
              </div>
            </div>

            <hr />

            <div className='flex flex-col gap-2'>
              <p className='text-xl'>Order by</p>
              <div className='flex flex-col'>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="alphabetical"
                    name="orderBy"
                    value="alphabetical"
                    checked={orderBy === "alphabetical"}
                    onChange={() => setOrderBy("alphabetical")}
                  />
                  <label htmlFor="alphabetical" className="ml-2">Title</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="release-date"
                    name="orderBy"
                    value="release-date"
                    checked={orderBy === "release-date"}
                    onChange={() => setOrderBy("release-date")}
                  />
                  <label htmlFor="release-date" className="ml-2">Release Date</label>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <button className='border w-20 mt-3 text-white rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={resetSorting}>Reset</button>
            </div>
          </div>

        </div>
        <div className='grid grid-cols-4 gap-2 w-5/6'>
          {games.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='border w-screen mt-3 text-white rounded-md min-w-20 h-10 p-2 hover:bg-white hover:text-black' onClick={() => setPages(pages + 1)}>Load More</button>
      </div>
    </div>
  );
};

export default Menu;
