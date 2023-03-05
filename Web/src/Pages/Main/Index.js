// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./Index.css";
import { model } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "../../Components/utilities";

function Main() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
      const classes = await obj[4].array();
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
          ctx
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);


  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    setQuantity(quantity + 1);
  }

  const dec = () => {
    setQuantity(quantity - 1);
  }
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
          <div className="details" >
            <div className="right" >
              <div>Name: Item1</div>
              <div>Price: 500</div>
              <div class="_p-qty">
                <span>Add Quantity</span>
                <div class="value-button decrease_" id="" value="Decrease Value">-</div>
                <input type="number" name="qty" id="number" value="1" />
                <div class="value-button increase_" id="" value="Increase Value">+</div>
              </div>
            </div>


            <div className="buttom">
              <div class="_p-add-cart">
                <button class="btn-theme btn buy-btn" tabindex="0">
                  <i class="fa fa-shopping-cart"></i> Buy Now
                </button>
                <button class="btn-theme btn btn-success" tabindex="0">
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
