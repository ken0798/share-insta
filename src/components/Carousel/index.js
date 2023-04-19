import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export function LeftArrow(props) {
  const { currentSlide, onClick } = props;
  return (
    <div
      testid="left-arrow"
      className={`arrow arrow_left ${currentSlide === 0 && "disable"}`}
      onClick={onClick}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="30" rx="15" fill="#334155" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.667 23C12.2404 23 11.8137 22.853 11.4887 22.5605C10.8371 21.9739 10.8371 21.0259 11.4887 20.4393L16.9969 15.4815L11.6971 10.5416C11.0587 9.94455 11.0771 8.99498 11.7387 8.42044C12.402 7.8459 13.457 7.8624 14.0953 8.45644L20.5318 14.4569C21.1635 15.0464 21.1551 15.981 20.5118 16.56L13.8453 22.5605C13.5203 22.853 13.0937 23 12.667 23Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export const RightArrow = React.forwardRef((props, ref) => {
  const { currentSlide, onClick, slideCount } = props;

  return (
    <div
      testid="rightt-arrow"
      onClick={onClick}
      className={`arrow arrow_right ${
        currentSlide >=
          slideCount -
            (ref?.props?.slidesToShow ||
              ref?.props?.responsive.find(
                (item) => item?.breakpoint === ref?.props?.state?.breakpoint
              )?.settings?.slidesToShow) && "disable"
      }`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="30" rx="15" fill="#334155" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.667 23C12.2404 23 11.8137 22.853 11.4887 22.5605C10.8371 21.9739 10.8371 21.0259 11.4887 20.4393L16.9969 15.4815L11.6971 10.5416C11.0587 9.94455 11.0771 8.99498 11.7387 8.42044C12.402 7.8459 13.457 7.8624 14.0953 8.45644L20.5318 14.4569C21.1635 15.0464 21.1551 15.981 20.5118 16.56L13.8453 22.5605C13.5203 22.853 13.0937 23 12.667 23Z"
          fill="white"
        />
      </svg>
    </div>
  );
});

export function CarouselItem({ item }) {
  return (
    <Link key={item.userId} to={`/users/${item.userId}`} className="link">
      <div className="carousel_item">
        <img src={item.url} alt={item.userId} />
        <p>{item.userName}</p>
      </div>
    </Link>
  );
}
