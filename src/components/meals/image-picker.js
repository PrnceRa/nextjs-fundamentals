"use client";
import React, { useRef, useState } from "react";

import styles from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedimage, setPickedImage] = useState(null);
  const inputRef = useRef();
  const pickHandler = () => {
    inputRef.current.click();
  };
  const imageHandler = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };
  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {pickedimage ? (
            <Image src={pickedimage} fill alt="image picked by user" />
          ) : (
            <p>No Image Picked by User.</p>
          )}
        </div>
        <input
          type="file"
          className={styles.input}
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          required
          onChange={imageHandler}
        />
        <button className={styles.button} type="button" onClick={pickHandler}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
