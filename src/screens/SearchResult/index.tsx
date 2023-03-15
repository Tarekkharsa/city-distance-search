import { useNavigate } from "react-router";
import { Spinner } from "../../components/spinner";
import useSearchResults from "../../hooks/useSearchResults";
function getTotalDistance(distances: [string, number][]): string {
  let total = 0;
  for (let item of distances) {
    total += item[1];
  }
  return total.toFixed(2);
}

export default function SearchResult() {
  const navigate = useNavigate();

  const { fetchDataOptions, distances } = useSearchResults();

  if (!fetchDataOptions) {
    return <div>Failed to parse query parameters</div>;
  }

  if (!distances) {
    return <Spinner showSpinner={true} />;
  }

  return (
    <div className="w-full">
      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-end items-center ml-14  gap-5">
          <div className="flex-1 items-center flex justify-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4261 6.28119C12.4261 9.43292 9.87115 11.9879 6.71942 11.9879C3.56768 11.9879 1.0127 9.43292 1.0127 6.28119C1.0127 3.12945 3.56768 0.574463 6.71942 0.574463C9.87115 0.574463 12.4261 3.12945 12.4261 6.28119Z"
                stroke="#374151"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div>{fetchDataOptions.city_origin[0]}</div>
          </div>
        </div>

        {distances.map((item, index) => (
          <div className="w-[70%] gap-4 text-gray-700" key={index}>
            <div className="flex justify-center items-center  gap-5">
              <div className="flex-1 relative">
                <div className="absolute -top-4  left-0 ">
                  <svg
                    width="125"
                    height="30"
                    viewBox="0 0 96 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.05176 0.977539C2.84259 0.977539 1.05176 2.76837 1.05176 4.97754V19.9985C1.05176 22.2077 2.84259 23.9985 5.05176 23.9985H86.3428C88.5519 23.9985 90.3428 22.2077 90.3428 19.9985V15.7571L95.317 12.7097C95.4123 12.6507 95.4658 12.571 95.4658 12.488C95.4658 12.4049 95.4123 12.3253 95.317 12.2662L90.3428 9.21875V4.97754C90.3428 2.76837 88.5519 0.977539 86.3428 0.977539H5.05176Z"
                      stroke="#7786D2"
                    />
                  </svg>
                </div>
                <div className="absolute -top-3 left-[25%] text-sm text-indigo-400">
                  {item[1].toFixed(2)} km
                </div>
              </div>
              <div className="flex-1 items-center flex justify-center">
                <svg
                  width="3"
                  height="16"
                  viewBox="0 0 3 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.71973 1.40161L1.71973 14.4016"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="0.01 8"
                  />
                </svg>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex justify-center items-center  gap-5">
              <div className="flex-1"></div>
              <div className="flex-1 items-center flex justify-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4261 6.28119C12.4261 9.43292 9.87115 11.9879 6.71942 11.9879C3.56768 11.9879 1.0127 9.43292 1.0127 6.28119C1.0127 3.12945 3.56768 0.574463 6.71942 0.574463C9.87115 0.574463 12.4261 3.12945 12.4261 6.28119Z"
                    stroke="#374151"
                  />
                </svg>
              </div>
              <div className="flex-1" key={index}>
                <div className="">{item[0]}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex mt-2 w-full  justify-center items-center flex-col gap-1">
          <div>
            <span className="text-indigo-400 mr-1">
              {getTotalDistance(distances)} km
            </span>
            is total distance
          </div>
          <div>
            <span className="text-indigo-400 mr-1">
              {fetchDataOptions.passengers}
            </span>
            Passengers
          </div>
          <div>{fetchDataOptions.date}</div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 cursor-pointer bg-gray-800 text-white flex items-center justify-center border border-gray-300 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
