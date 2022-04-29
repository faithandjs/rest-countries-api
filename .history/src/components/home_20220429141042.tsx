import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style/style.scss";
import searchImg from "./images/search.png";
import { Wrapper } from "./parent";
import { arrItem, items, contextType } from "./type";

/*
Users should be able to:
- Click through to the border countries on the detail page
*/

function Home({ children }: any): JSX.Element {
  const { data, settingDetails } = useContext(Wrapper) as contextType;
  const [toBeDisplayed, setTobeDisplayed] = useState<arrItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentCountries, setCurrentCountries] = useState<items[]>([]);
  const currentCountriesSet = useRef(false);
  const passed1 = useRef(false);
  const passed2 = useRef(false);
  const passed3 = useRef(false);
  const initalDataLoad = useRef<boolean>(false);

  const settingCurrent = (newData: arrItem[]) => {
    if (newData !== undefined || newData !== null || newData !== []) {
      let arr: items[] = [];
      newData.map((item) => {
        arr.push({
          flags: item.flags.png,
          name: item.name.common,
          population: item.population,
          region: item.region,
          capital: item.capital,
        });
      });
      setCurrentCountries(arr);
      currentCountriesSet.current = true;
    }
  };
  useEffect(() => {
    if (passed1.current) {
      localStorage.setItem("countries-data", JSON.stringify(data));
      if (!initalDataLoad.current) {
        settingCurrent(data);
        setTobeDisplayed(data);
        initalDataLoad.current = true;
      }
    }
    passed1.current = true;
  }, [data]);
  useEffect(() => {
    if (passed2) {
      search();
    }
    passed2.current = true;
  }, [inputValue, toBeDisplayed]);
  useEffect(() => {
    if (!passed3.current) {
      setTobeDisplayed(data);
    }
    passed3.current = true;
  });
  const search = () => {
    if (inputValue === "") {
      settingCurrent(toBeDisplayed);
    } else {
      let arr: arrItem[] = [];
      toBeDisplayed.map((item) => {
        if (
          item.name.common.toLowerCase().includes(`${inputValue.toLowerCase()}`)
        ) {
          arr.push(item);
        }
      });
      settingCurrent(arr);
    }
  };
  const selectRegion = () => {
    let arr: arrItem[] = [];
    let value = document.querySelector("select")!.value;
    console.log("region", value);
    if (value !== "all") {
      data.map((item) => {
        if (item.region === value) {
          arr.push(item);
        }
      });
      setTobeDisplayed(arr);
      settingCurrent(arr);
    } else {
      settingCurrent(data);
      setTobeDisplayed(data);
    }
  };
  return (
    <div className="home">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-img">
          <div className="img-box">
          {  /*<img src={searchImg} alt="search icon" />
          
          */}
          <svg
          
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 184 161"
  >
  <g
      id="imagebot_2"
    >
    <g
        id="imagebot_3"
        transform="translate(174.67 152.52) matrix(.90792 0 0 .90792 -427.96 -463.36)"
      >
      <g
          id="imagebot_4"
          stroke="#808080"
          stroke-linecap="round"
          fill="none"
        >
        <path
            id="imagebot_6"
            stroke-linejoin="round"
            stroke-width="10.63"
            d="m443.16 414.45c0 36.1-29.27 65.36-65.36 65.36-36.1 0-65.36-29.26-65.36-65.36s29.26-65.36 65.36-65.36c36.09 0 65.36 29.26 65.36 65.36z"
        />
        <path
            id="imagebot_5"
            stroke-width="21.26"
            d="m428.3 464.45l42.43 38.39"
        />
      </g
      >
    </g
    >
    <title
      >Layer 1</title
    >
  </g
  ></svg>
          </div>
          <input
            value={inputValue}
            type="text"
            onChange={(evt: React.FormEvent<HTMLInputElement>) => {
              setInputValue((evt.target as HTMLInputElement).value);
            }}
            placeholder="Search for a country..."
          />
        </div>
        <div className="select">
          <select name="region" onChange={() => selectRegion()}>
            {/* path /region/name */}
            <option value="all">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>

      <div className="all-flags">
        {currentCountriesSet.current
          ? currentCountries!.map((item, index) => {
              const alt = item.name + " flag";
              //make a to var that consists of /name
              return (
                <Link to="details">
                  <div
                    key={index}
                    className="a-flag"
                    onClick={() => {
                      let item1 = item;
                      data.map((item) => {
                        if (item.name.common === item1.name) {
                          settingDetails(item);
                        }
                      });
                    }}
                  >
                    <div className="flag-box">
                      <img src={item.flags} alt={alt} />
                    </div>
                    <div className="text">
                      <h2>{item.name}</h2>
                      <div>
                        <div>
                          <span>population:</span> {item.population}
                        </div>
                        <div>
                          <span>region:</span> {item.region}
                        </div>
                        <div>
                          <span>capital:</span> {item.capital}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Home;
