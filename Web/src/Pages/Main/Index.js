// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./index.css";
import { model } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "../../Components/utilities";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    // e.g. const net = await cocossd.load();
    // C:\Users\ASUS\Desktop\Python Project\ember\Shop-n-Go\RealTimeObjectDetection-main\Tensorflow\workspace\models\my_ssd_mobnet\converted\model.json
    const net = await tf.loadGraphModel("http://127.0.0.1:3004/model.json");

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // 4. TODO - Make Detections
        // e.g. const obj = await net.detect(video);

        const img = tf.browser.fromPixels(video);
        const resized = tf.image.resizeBilinear(img, [640, 480]);
        const casted = resized.cast("int32");
        const expanded = casted.expandDims(0);
        const obj = await net.executeAsync(expanded);
        // console.log(obj)

        const boxes = await obj[2].array();
        const classes = await obj[0].array();
        const scores = await obj[6].array();

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");

        // 5. TODO - Update drawing utility
        // drawSomething(obj, ctx)

        requestAnimationFrame(() => {
          drawRect(
            boxes[0],
            classes[0],
            scores[0],
            0.8,
            videoWidth,
            videoHeight,
            ctx,
            setName
          );
        });

        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        tf.dispose(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState([]);
  const [id, setId] = useState(0);

  const addProductsToCart = () => {
    setProduct([...product, { name, quantity, price, id }]);
    console.log("prods", product);
  };

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    setQuantity(quantity - 1);
  };
  useEffect(() => {
    try {
      axios
        .get(
          `http://127.0.0.1:8085/api/productManagement/fetch_product_by_name/${name}`
        )
        .then((res) => {
          setPrice(res.data.Prod_Price * quantity);
          setId(res.data.Prod_ID);
        });
    } catch (error) {
      console.log(error);
    }
    console.log("main", product);
  }, [name, quantity, product]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              position: "absolute",
              marginLeft: "50px",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          <div className="details">
            <div className="qyt">
              <p>Name:{name} </p>
              <p>Price: {price}</p>
              <p>ID: {id}</p>
              <div className="inc_dec">
                <span>Quantity:</span>
                <div className="values">
                  <div
                    className="value-button decrease_"
                    id=""
                    value="Decrease Value"
                    onClick={dec}
                  >
                    -
                  </div>
                  {quantity}
                  <div
                    className="value-button increase_"
                    id=""
                    value="Increase Value "
                    onClick={inc}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <div className="AddBtn">
                <button
                  class="btn-theme btn buy-btn"
                  tabindex="0"
                  onClick={() => {
                    navigate("/cart", { state: product });
                  }}
                >
                  <i class="fa fa-shopping-cart"></i> Buy Now
                </button>
                <button
                  class="btn-theme btn btn-success"
                  tabindex="0"
                  onClick={addProductsToCart}
                >
                  <i class="fa fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "50px",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    </>
  );
}

export default Main;
