/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import "./styles.css";

import { getInformation } from "../../utils/appwriteConfig";
import { useState } from "react";
import { numberFormat } from "../../utils/numberFormat";
const Card = () => {
  const [information, setInformation] = useState();
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    const files = await getInformation();
    setInformation(files.documents);
    setLoading(false);
  };

  useEffect(() => {
    getFiles();
  }, []);

  if (loading) {
    return <h1>loading ...</h1>;
  }

  return (
    <>
      {information.map((items, index) => {
        return (
          <div key={index} className="col py-4">
            <div className="card card-custome ">
              <img src={items.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{items.name}</h5>

                <p className="card-text">{items.description}</p>
                <a href="#" className="btn btn-primary">
                  add {numberFormat(items.price)}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
