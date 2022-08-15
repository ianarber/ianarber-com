import React, { useEffect, useState } from "react";
import axios from "axios";

const DATA_DUMP = {
  sys: {
    type: "Array",
  },
  total: 7,
  skip: 0,
  limit: 100,
  items: [
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "1f57vHq4Np120iJ8EgdvYp",
        type: "Entry",
        createdAt: "2022-01-26T15:15:21.044Z",
        updatedAt: "2022-01-26T15:15:21.044Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 1,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "Scott & Sid",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "pAEDloEnDxWpHk1daqMCT",
          },
        },
        url: "https://open.spotify.com/album/17anjhlAK6KBqvhFwU4Xex?si=IZf-nLTASZW7BVNCZ1yRaQ",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "5O2O2SyAZ2WNwNHA2XEQvR",
        type: "Entry",
        createdAt: "2022-01-26T15:14:44.842Z",
        updatedAt: "2022-01-26T15:14:44.842Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 1,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "After The Screaming Stops",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "6Ru18XJOD7tD9z0BjwXwKt",
          },
        },
        url: "https://open.spotify.com/album/3BK2zNOspKhB9KIPpBVQcR?si=9wybfV3oRMipRdmNNxJLpg",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "3yJDv9aBNkMuhKnPii6Oyu",
        type: "Entry",
        createdAt: "2022-01-26T15:13:07.481Z",
        updatedAt: "2022-01-26T15:13:07.481Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 1,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "The One",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "5XyWMkcYhnkXQ5WSRbrWSz",
          },
        },
        url: "https://open.spotify.com/album/26NGUEs7plWzOBzipAYf9l?si=5n4AzvrORjyfu3B8ZFHC-w",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "6HLxAmvfGfErHbeOPwfjfw",
        type: "Entry",
        createdAt: "2022-01-26T15:12:08.790Z",
        updatedAt: "2022-01-26T15:12:08.790Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 1,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "I Am Bolt",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "6S9aGNuHfqrEbjORCEjVy0",
          },
        },
        url: "https://open.spotify.com/album/6n3sBJQZP4rQ0OYHvlNQfD?si=oPOzmrL0TJiYpaF0f9bnWw",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "59n5dOJEiR1aoOwuAQbAhO",
        type: "Entry",
        createdAt: "2022-01-26T15:10:38.296Z",
        updatedAt: "2022-01-26T15:11:28.349Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 2,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "Redcon-1",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "1KwxnIFV3Hqn0utQTcntIt",
          },
        },
        url: "https://open.spotify.com/album/4e5zOBRLEIViEbdBjlB8WB?si=S7JesQonTx-99C2xyiuAFg",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "3f5ffNyNgAX5OxBnsfxbzG",
        type: "Entry",
        createdAt: "2022-01-26T15:11:19.512Z",
        updatedAt: "2022-01-26T15:11:19.512Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 1,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "Show Me The Picture",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "40tPumR7ouXuJ1e0RtX42b",
          },
        },
        url: "https://open.spotify.com/album/2gULVYQEFRWxJIs9S1dh8o?si=p5RNOpUjTouQU-lrb-z5wA",
      },
    },
    {
      metadata: {
        tags: [],
      },
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "cn9cpn7kv7gw",
          },
        },
        id: "2AEn50rTBi8UGk1fKXMxnL",
        type: "Entry",
        createdAt: "2022-01-26T15:07:16.324Z",
        updatedAt: "2022-01-26T15:08:04.736Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        revision: 2,
        contentType: {
          sys: {
            type: "Link",
            linkType: "ContentType",
            id: "listenPageAlbums",
          },
        },
        locale: "en-GB",
      },
      fields: {
        title: "The Capture",
        albumCover: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "WxkQycZjzXiNPoYheKOgA",
          },
        },
        url: "https://open.spotify.com/album/26FTC6C2eXcqmPMPyxmE1V?si=ajvAc4F7T-619yhiCxFRSg",
      },
    },
  ],
  includes: {
    Asset: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "1KwxnIFV3Hqn0utQTcntIt",
          type: "Asset",
          createdAt: "2022-01-26T15:10:13.394Z",
          updatedAt: "2022-01-26T15:10:13.394Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "Redcon-1 OST",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/1KwxnIFV3Hqn0utQTcntIt/0df18e10c61d417787ddb000fbc5b7da/Redcon-1_OST.jpg",
            details: {
              size: 49923,
              image: {
                width: 500,
                height: 500,
              },
            },
            fileName: "Redcon-1 OST.jpg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "40tPumR7ouXuJ1e0RtX42b",
          type: "Asset",
          createdAt: "2022-01-26T15:11:11.921Z",
          updatedAt: "2022-01-26T15:11:11.921Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "Show Me The Picture OST",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/40tPumR7ouXuJ1e0RtX42b/4bfbdfbcb34d288b63e83ff8f87210b3/Show_Me_The_Picture_OST.jpeg",
            details: {
              size: 153869,
              image: {
                width: 640,
                height: 640,
              },
            },
            fileName: "Show Me The Picture OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "5XyWMkcYhnkXQ5WSRbrWSz",
          type: "Asset",
          createdAt: "2022-01-26T15:12:49.555Z",
          updatedAt: "2022-01-26T15:12:49.555Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "the One OST1",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/5XyWMkcYhnkXQ5WSRbrWSz/1f0810222794684179a5cd10eef068a2/The_One_OST.jpeg",
            details: {
              size: 1814694,
              image: {
                width: 1000,
                height: 1000,
              },
            },
            fileName: "The One OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "6Ru18XJOD7tD9z0BjwXwKt",
          type: "Asset",
          createdAt: "2022-01-26T15:14:28.949Z",
          updatedAt: "2022-01-26T15:14:28.949Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "After The Screaming Stops OST1",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/6Ru18XJOD7tD9z0BjwXwKt/c447bcc195c92c98b9ad0bf002b7cacd/Bros_OST.jpeg",
            details: {
              size: 248941,
              image: {
                width: 1200,
                height: 1200,
              },
            },
            fileName: "Bros OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "6S9aGNuHfqrEbjORCEjVy0",
          type: "Asset",
          createdAt: "2022-01-26T15:11:51.455Z",
          updatedAt: "2022-01-26T15:11:51.455Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "I Am Bolt OST1",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/6S9aGNuHfqrEbjORCEjVy0/c26b3d31ff11764cffa43e287d6bd571/I_Am_Bolt_OST.jpeg",
            details: {
              size: 218793,
              image: {
                width: 640,
                height: 640,
              },
            },
            fileName: "I Am Bolt OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "WxkQycZjzXiNPoYheKOgA",
          type: "Asset",
          createdAt: "2022-01-26T15:06:30.778Z",
          updatedAt: "2022-01-26T15:06:30.778Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "The Capture OST1",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/WxkQycZjzXiNPoYheKOgA/2dbc0eac80f07e2e8e263345493463aa/The_Capture_OST.jpeg",
            details: {
              size: 112539,
              image: {
                width: 640,
                height: 640,
              },
            },
            fileName: "The Capture OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "cn9cpn7kv7gw",
            },
          },
          id: "pAEDloEnDxWpHk1daqMCT",
          type: "Asset",
          createdAt: "2022-01-26T15:15:06.844Z",
          updatedAt: "2022-01-26T15:15:06.844Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          locale: "en-GB",
        },
        fields: {
          title: "Scott and Sid OST1",
          description: "",
          file: {
            url: "//images.ctfassets.net/cn9cpn7kv7gw/pAEDloEnDxWpHk1daqMCT/5b5142e9f4bbc8ea84d3751be9f1530a/Scott_and_Sid_OST.jpeg",
            details: {
              size: 58379,
              image: {
                width: 640,
                height: 640,
              },
            },
            fileName: "Scott and Sid OST.jpeg",
            contentType: "image/jpeg",
          },
        },
      },
    ],
  },
};

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
          src="https://open.spotify.com/embed/album/4e5zOBRLEIViEbdBjlB8WB?utm_source=generator"
          frameborder="0"
          allow="encrypted-media"
        ></iframe>
        <h4>{album.title}</h4>
      </div>
    ));
  };

  return (
    <div className="listen-albums-container">
      {albums ? (
        <div className="grid-wrapper">{renderGridItems()}</div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Container;
