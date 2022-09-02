import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

// const DATA_DUMP = {
//   sys: {
//     type: "Array",
//   },
//   total: 8,
//   skip: 0,
//   limit: 100,
//   items: [
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "3f5ffNyNgAX5OxBnsfxbzG",
//         type: "Entry",
//         createdAt: "2022-01-26T15:11:19.512Z",
//         updatedAt: "2022-08-17T04:30:46.712Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "Show Me The Picture",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "40tPumR7ouXuJ1e0RtX42b",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/2gULVYQEFRWxJIs9S1dh8o?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "59n5dOJEiR1aoOwuAQbAhO",
//         type: "Entry",
//         createdAt: "2022-01-26T15:10:38.296Z",
//         updatedAt: "2022-08-17T04:30:21.424Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 3,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "Redcon-1",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "1KwxnIFV3Hqn0utQTcntIt",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/4e5zOBRLEIViEbdBjlB8WB?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "6HLxAmvfGfErHbeOPwfjfw",
//         type: "Entry",
//         createdAt: "2022-01-26T15:12:08.790Z",
//         updatedAt: "2022-08-17T04:29:54.154Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "I Am Bolt",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "6S9aGNuHfqrEbjORCEjVy0",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/6n3sBJQZP4rQ0OYHvlNQfD?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "3yJDv9aBNkMuhKnPii6Oyu",
//         type: "Entry",
//         createdAt: "2022-01-26T15:13:07.481Z",
//         updatedAt: "2022-08-17T04:29:25.301Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "The One",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "5XyWMkcYhnkXQ5WSRbrWSz",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/26NGUEs7plWzOBzipAYf9l?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "5O2O2SyAZ2WNwNHA2XEQvR",
//         type: "Entry",
//         createdAt: "2022-01-26T15:14:44.842Z",
//         updatedAt: "2022-08-17T04:28:57.920Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "After The Screaming Stops",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "6Ru18XJOD7tD9z0BjwXwKt",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/3BK2zNOspKhB9KIPpBVQcR?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "1f57vHq4Np120iJ8EgdvYp",
//         type: "Entry",
//         createdAt: "2022-01-26T15:15:21.044Z",
//         updatedAt: "2022-08-17T04:28:26.363Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "Scott & Sid",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "pAEDloEnDxWpHk1daqMCT",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/17anjhlAK6KBqvhFwU4Xex?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "2AEn50rTBi8UGk1fKXMxnL",
//         type: "Entry",
//         createdAt: "2022-01-26T15:07:16.324Z",
//         updatedAt: "2022-08-17T04:27:34.526Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 3,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "The Capture",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "WxkQycZjzXiNPoYheKOgA",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/26FTC6C2eXcqmPMPyxmE1V?utm_source=generator",
//       },
//     },
//     {
//       metadata: {
//         tags: [],
//       },
//       sys: {
//         space: {
//           sys: {
//             type: "Link",
//             linkType: "Space",
//             id: "cn9cpn7kv7gw",
//           },
//         },
//         id: "2S6EGwkiCNvaXl8PTKsJF4",
//         type: "Entry",
//         createdAt: "2022-07-21T04:24:21.417Z",
//         updatedAt: "2022-08-17T04:27:08.771Z",
//         environment: {
//           sys: {
//             id: "master",
//             type: "Link",
//             linkType: "Environment",
//           },
//         },
//         revision: 2,
//         contentType: {
//           sys: {
//             type: "Link",
//             linkType: "ContentType",
//             id: "listenPageAlbums",
//           },
//         },
//         locale: "en-GB",
//       },
//       fields: {
//         title: "The Chelsea Detective",
//         albumCover: {
//           sys: {
//             type: "Link",
//             linkType: "Asset",
//             id: "1dwHWs3DXasVg5kwGP1VNA",
//           },
//         },
//         url: "https://open.spotify.com/embed/album/6yv2Ql7yFGA1QjRAQHMZlP?utm_source=generator",
//       },
//     },
//   ],
//   includes: {
//     Asset: [
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "1KwxnIFV3Hqn0utQTcntIt",
//           type: "Asset",
//           createdAt: "2022-01-26T15:10:13.394Z",
//           updatedAt: "2022-01-26T15:10:13.394Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "Redcon-1 OST",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/1KwxnIFV3Hqn0utQTcntIt/0df18e10c61d417787ddb000fbc5b7da/Redcon-1_OST.jpg",
//             details: {
//               size: 49923,
//               image: {
//                 width: 500,
//                 height: 500,
//               },
//             },
//             fileName: "Redcon-1 OST.jpg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "1dwHWs3DXasVg5kwGP1VNA",
//           type: "Asset",
//           createdAt: "2022-07-21T04:23:52.138Z",
//           updatedAt: "2022-07-21T04:23:52.138Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "The Chelsea Detective OST",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/1dwHWs3DXasVg5kwGP1VNA/7842d2cd164009aac94d9fb8bce6a58e/The_Chelsea_Detective_OST.jpeg",
//             details: {
//               size: 142270,
//               image: {
//                 width: 640,
//                 height: 640,
//               },
//             },
//             fileName: "The Chelsea Detective OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "40tPumR7ouXuJ1e0RtX42b",
//           type: "Asset",
//           createdAt: "2022-01-26T15:11:11.921Z",
//           updatedAt: "2022-01-26T15:11:11.921Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "Show Me The Picture OST",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/40tPumR7ouXuJ1e0RtX42b/4bfbdfbcb34d288b63e83ff8f87210b3/Show_Me_The_Picture_OST.jpeg",
//             details: {
//               size: 153869,
//               image: {
//                 width: 640,
//                 height: 640,
//               },
//             },
//             fileName: "Show Me The Picture OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "5XyWMkcYhnkXQ5WSRbrWSz",
//           type: "Asset",
//           createdAt: "2022-01-26T15:12:49.555Z",
//           updatedAt: "2022-01-26T15:12:49.555Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "the One OST1",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/5XyWMkcYhnkXQ5WSRbrWSz/1f0810222794684179a5cd10eef068a2/The_One_OST.jpeg",
//             details: {
//               size: 1814694,
//               image: {
//                 width: 1000,
//                 height: 1000,
//               },
//             },
//             fileName: "The One OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "6Ru18XJOD7tD9z0BjwXwKt",
//           type: "Asset",
//           createdAt: "2022-01-26T15:14:28.949Z",
//           updatedAt: "2022-01-26T15:14:28.949Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "After The Screaming Stops OST1",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/6Ru18XJOD7tD9z0BjwXwKt/c447bcc195c92c98b9ad0bf002b7cacd/Bros_OST.jpeg",
//             details: {
//               size: 248941,
//               image: {
//                 width: 1200,
//                 height: 1200,
//               },
//             },
//             fileName: "Bros OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "6S9aGNuHfqrEbjORCEjVy0",
//           type: "Asset",
//           createdAt: "2022-01-26T15:11:51.455Z",
//           updatedAt: "2022-01-26T15:11:51.455Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "I Am Bolt OST1",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/6S9aGNuHfqrEbjORCEjVy0/c26b3d31ff11764cffa43e287d6bd571/I_Am_Bolt_OST.jpeg",
//             details: {
//               size: 218793,
//               image: {
//                 width: 640,
//                 height: 640,
//               },
//             },
//             fileName: "I Am Bolt OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "WxkQycZjzXiNPoYheKOgA",
//           type: "Asset",
//           createdAt: "2022-01-26T15:06:30.778Z",
//           updatedAt: "2022-01-26T15:06:30.778Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "The Capture OST1",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/WxkQycZjzXiNPoYheKOgA/2dbc0eac80f07e2e8e263345493463aa/The_Capture_OST.jpeg",
//             details: {
//               size: 112539,
//               image: {
//                 width: 640,
//                 height: 640,
//               },
//             },
//             fileName: "The Capture OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//       {
//         metadata: {
//           tags: [],
//         },
//         sys: {
//           space: {
//             sys: {
//               type: "Link",
//               linkType: "Space",
//               id: "cn9cpn7kv7gw",
//             },
//           },
//           id: "pAEDloEnDxWpHk1daqMCT",
//           type: "Asset",
//           createdAt: "2022-01-26T15:15:06.844Z",
//           updatedAt: "2022-01-26T15:15:06.844Z",
//           environment: {
//             sys: {
//               id: "master",
//               type: "Link",
//               linkType: "Environment",
//             },
//           },
//           revision: 1,
//           locale: "en-GB",
//         },
//         fields: {
//           title: "Scott and Sid OST1",
//           description: "",
//           file: {
//             url: "//images.ctfassets.net/cn9cpn7kv7gw/pAEDloEnDxWpHk1daqMCT/5b5142e9f4bbc8ea84d3751be9f1530a/Scott_and_Sid_OST.jpeg",
//             details: {
//               size: 58379,
//               image: {
//                 width: 640,
//                 height: 640,
//               },
//             },
//             fileName: "Scott and Sid OST.jpeg",
//             contentType: "image/jpeg",
//           },
//         },
//       },
//     ],
//   },
// };

const Container = () => {
  const [albums, setAlbums] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { hostname, protocol } = window.location;
    const GET_ALBUMS_ENDPOINT = ".netlify/functions/getAlbums";
    const URL = `${protocol}//${hostname}/${GET_ALBUMS_ENDPOINT}`;

    // const test_response = extractAlbums(DATA_DUMP);
    // setAlbums(test_response);

    axios
      .get(URL)
      .then((response) => {
        setAlbums(extractAlbums(response.data));
      })
      .catch((err) => {
        console.error(err)
        setError({ error: err, message: "Unable to retrieve albums" });
      });
  }, []);

  const extractAlbums = (data) => {
    const { includes, items } = data;

    return items.map((item) => {
      const { fields } = item;
      const assetUrl = findAssetUrl(includes.Asset, fields.albumCover.sys.id);
      return {
        title: fields.title,
        coverUrl: assetUrl,
        playlistUrl: fields.url,
      };
    });
  };

  const findAssetUrl = (assets, id) => {
    for (let n = 0; n < assets.length; n++) {
      const { sys, fields } = assets[n];
      if (sys.id === id) {
        return fields.file.url;
      }
    }
  };

  const renderGridItems = () => {
    return albums.map((album) => (
      <div className="listen-albums-item">
        <img src={album.coverUrl} alt={`{album.title cover}`} />
        <iframe
          src={album.playlistUrl}
          frameborder="0"
          allow="encrypted-media"
        ></iframe>
      </div>
    ));
  };

  return (
    <div className="listen-albums-container">
      {error ? (
        <div className="listen-error">
          <i class="fa fa-frown-o"></i>
          <p>Unable to retrieve albums</p>
        </div>
      ) : albums ? (
        <div className="grid-wrapper">{renderGridItems()}</div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Container;
