import axios from "axios";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ResturantView } from "./components/index";

interface Resturants {
  name: string;
  photo: {
    height: number;
    html_attributions: object;
    photo_reference: string;
    width: number;
  };
  rating: number;
  lat: number;
  lng: number;
}

interface ResturantDistance extends Resturants {
  distance: string;
  duration: string;
}

function App() {
  const queryClient = new QueryClient();

  // const getDetail = async (
  //   currentLat: number | undefined,
  //   currentLng: number | undefined
  // ): Promise<Resturants[]> => {
  //   // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLat}%2C${currentLng}&type=restaurant&rankby=distance&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  //   let idProps = {
  //     method: "get",
  //     url: url,
  //     headers: {},
  //   };
  //   return axios(idProps)
  //     .then(async (response) => {
  //       return await response.data["results"].map(
  //         (resturant: google.maps.places.PlaceResult) => {
  //           return {
  //             name: resturant.name,
  //             photo: resturant.photos?.at(0),
  //             rating: resturant.rating,
  //             lat: resturant.geometry?.location?.lat,
  //             lng: resturant.geometry?.location?.lng,
  //           };
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  const getDistance = async (
    resturants: Resturants[],
    currentLat: number,
    currentLng: number
  ): Promise<ResturantDistance[]> => {
    return await Promise.all(
      resturants.map(async (resturant) => {
        let test = async () => {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentLat}%2C${currentLng}&destinations=${resturant.lat}%2C${resturant.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
          let config = {
            method: "get",
            url: url,
            headers: {},
          };
          return await axios(config)
            .then(async (response): Promise<ResturantDistance> => {
              const data: google.maps.DistanceMatrixResponse = response.data;

              return {
                ...resturant,
                distance: data.rows[0].elements[0].distance.text,
                duration: data.rows[0].elements[0].duration.text,
              };
            })
            .catch((err) => {
              return err;
            });
        };
        return await test();
      })
    );
  };

  // async function getResturants(
  //   lat: number,
  //   lng: number
  // ): Promise<ResturantDistance[]> {
  //   let resturants = await getDetail(lat, lng);
  //   return await getDistance(resturants, lat, lng);
  // }

  // const [loaded, setLoaded] = useState(false);

  // let resturants = getResturants(geolocation.latitude, geolocation.longitude);

  // function showCards() {
  //   resturants.then((val) => {
  //     console.log(val.length);
  //     return <p>{val.length}</p>;
  // val.map((item) => {
  //   console.log(item);
  //   return (
  //     <ResturantItem
  //       name={item.name}
  //       distance={item.distance}
  //       photo_ref={item?.photo?.photo_reference}
  //     />
  //   );
  // });
  // });
  // setButtonClick(false);
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ResturantView />
    </QueryClientProvider>
  );
}

export default App;
