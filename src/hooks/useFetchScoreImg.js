import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { result } from "lodash";

const useFetchScoreImg = (query) => {

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
});

// const PhotoComp = ({ photo }) => {
//   const { user, urls } = photo;

//   return (
//     <Fragment>
//       <img className="img" src={urls.regular} />
//       <a
//         className="credit"
//         target="_blank"
//         href={`https://unsplash.com/@${user.username}`}
//       >
//         {user.name}
//       </a>
//     </Fragment>
//   );
// };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchPhotos =  async () => {
        setLoading(true)

        try {
            const result = await  api.search.getPhotos({ query,
            orientation: "landscape",
            per_page: 1,
         })

            setLoading(false)
            setError(null)
            setData(result.response.results)
            
        } catch (error) {
            setLoading(false)
            setError(result.errors[0])
            
        }


    }

      fetchPhotos()


  }, [query]);


    return (

          { data: data,
            // data: data.response.results,
            isLoading: loading,
            isError: error
          }

    )
  

}

export default useFetchScoreImg