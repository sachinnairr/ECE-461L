import React from 'react';
import "../styles.css";

export default function TitleBox(props) {
    return(
        <div className="title-box">
      {props.title}
      </div>
    );
}