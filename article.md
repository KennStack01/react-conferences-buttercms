# What we’re going to be building?

In this article, we're going to build a [location-based website](https://react-conferences.netlify.app/) using GatsbyJS, ButterCMS, TailwindCSS, and Leafletjs: a website that shows all the React 2022 conferences on the map.

Before diving into the technical (coding) part, we're going to explain in more detail about mapping applications in order to help you get the fundamentals of location-based web applications from what they are to why bother using location services in your apps.

In the coding part, we'll start by setting up a Gatsby project using a starter project coming with many interesting plugins such as gatsby-plugin-google-analytics (for website analytics), gatsby-plugin-image (used for adding responsive images to your site while maintaining high-performance scores can be difficult to do manually. The Gatsby Image plugin handles the hard parts of producing images in multiple sizes and formats for you), and many other powerful plugins like gatsby-plugin-manifest, gatsby-plugin-offline, gatsby-plugin-postcss, gatsby-plugin-purgecss, gatsby-plugin-react-helmet, gatsby-plugin-sharp, gatsby-source-filesystem, gatsby-transformer-sharp, tailwindcss. In our project, we'll have to

Then, we'll get to install the mapping library to handle the location features and a CMS where data will come from.

In our code, we'll work on components (in React), to build the project in a more organized way.

### More details about the tech stack:

- [GatsbyJS](https://www.gatsbyjs.com/): _a free and open-source framework based on React that helps developers build blazing-fast websites and apps. Gatsby allows the Developers to make a site using React and work with any data source (CMSs, Markdown, etc) of their choice._

- [TailwindCSS](https://tailwindcss.com/): _a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override._

- [Leafletjs](https://react-leaflet.js.org/): _a JavaScript library used to create maps. The library also supports many plugins which include, base map providers, search and popups, and layer switching controls. It assists JavaScript developers in building web mapping functionalities. We'll use its React version._

- [ButterCMS](https://buttercms.com/): _an API-first headless CMS for rapidly building CMS-powered apps and websites in any programming language. Great for blogs, dynamic pages, and more._

- [Netlify](http://netlify.com/): _a hosting platform that is one the best solutions for JAMStack projects hosting. Hosting static web pages has never been easier._

# Why a location-based application? Why would someone bother with geolocation?

In general, _A location-based service (LBS) is a general term denoting software services that utilize geographic data and information to provide services or information to users. LBS can be used in a variety of contexts, such as health, indoor object search, entertainment, work, personal life, etc. Commonly used examples of location-based services include navigation software, social networking services, location-based advertising, and tracking systems. LBS can also include mobile commerce when taking the form of coupons or advertising directed at customers based on their current location. They include personalized weather services and even location-based games._ [wikipedia](https://en.wikipedia.org/wiki/Location-based_service)

So, location-based applications are those apps built on top of location-based services in order to help businesses and companies to offer customized services based on where the user is or where they are going.

With a compound annual growth rate of 28% (CAGR), the location-based services market is going to hit $80 billion by 2023. These days, building location-based apps makes a lot more sense. Due to the growing popularity of on-demand economy services, we see applications, like Lyft, Facebook, Tinder, Airbnb, Food Delivery, and Transportation Apps using geolocation for their business different purposes.

Using location-based services, we have hundreds of applications we can develop. Among those apps, we have:

- Apps for recommending social events in a city
- Apps for requesting the nearest business or service, such as an ATM, restaurant or a retail store
- Social Networks
- Marketplaces
- Navigation Apps
- Etc

If you have a business and want your customers to get the benefits of your services or products based on their location, then this type of solution is right for your business growth.

In our case, we're helping developers find and view all the React conferences on a map, in order for them to get the nearest conference, based on their location.

# While working with location-based services library

While working with any location service library (not only leaflet js) with any React framework, if the map is not displayed correctly, it is most likely because you haven't followed all the prerequisites, such as:

- Making sure all dependencies are installed and using supported versions properly to avoid packages' versions conflicts;
- Making sure the library CSS is installed, imported, and loaded to get the styling from the library's docs;
- Making sure all the library's main components are set properly in order to avoid the conflict between parent and child components while wrapping them together inside your main page's component;
- Making sure you have all the position properties required for your determined locations.

# Step 1: Setting up a Gatsby starter leaflet project

We'll be working on a gatsby starter that makes things easier to get started.

### Create a new gatsby app with Gatsby tailwindCSS starter:

To get started, navigate to where you want to create your new app and run this command:

```

npx gatsby new react-conferences-buttercms https://github.com/kosvrouvas/gatsby-tailwindcss-starter

```

For more details, check on the official [Gatsby Starters Page](https://www.gatsbyjs.com/starters/kosvrouvas/gatsby-tailwindcss-starter)

The Project Structure:
![code-0-0.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656433309336/2Er2iuf2Z.jpg align="left")

### Install React-leaflet

- Install the packages:

```
npm i --save gatsby-plugin-react-leaflet react-leaflet leaflet
```

- Add the plugin to your Gatsby configuration:

```
module.exports = {
  plugins: [
     // ...
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    }
  ]
}
```

- We'll be using an online tool to get location data for the cities (Conferences locations):
  [gps-coordinates](https://www.gps-coordinates.net/)

### Adding Tailwind CSS to our Project

If you're working with a different gatsby starter that doesn't use tailwindCSS, you can add tailwindCSS to your Gatsby project by following these steps (otherwise, you can skip this part):

- Using npm, install tailwindcss and its peer dependencies, as well as `gatsby-plugin-postcss`, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js` :

```
npm install -D tailwindcss postcss autoprefixer gatsby-plugin-postcss

```

```
npx tailwindcss init -p
```

- Enable the Gatsby PostCSS plugin in your `gatsby-config.js` file by enabling the `gatsby-plugin-postcss`:

```
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    // ...
  ],
}
```

- Configure your template paths by adding the paths to all of your template files in your `tailwind.config.js` file:

```
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- If you don't a CSS file (or in your main CSS file), add the Tailwind directives to your CSS by Creating a `./src/styles/global.css` file and add the @tailwind directives for each of Tailwind’s layers:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Import the CSS file by Creating a `gatsby-browser.js` file at the root of your project if it doesn’t already exist, and import your newly-created `./src/styles/global.css` file:

```
import './src/styles/global.css'
```

That's it!

# Step 2: Learning about Maps (Basics)

### What is a map?

A map is a symbolic representation of selected characteristics of a place, usually drawn on a flat surface. Maps present information about the world in a simple, visual way. They teach about the world by showing the sizes and shapes of countries, locations of features, and distances between places. Maps can show distributions of things over Earth, such as settlement patterns. They can show the exact locations of houses and streets in a city neighborhood. [National Geographic](https://education.nationalgeographic.org/resource/map)

A map displays geographical data in your app or on your website. It's made of various features such as zooming, panning, and rotation. It also includes annotations and overlays, shows routing information, and is configured to show a standard map, satellite imagery, or both.

### What are the different categories of maps?

In general, maps are grouped in two categories:

- Reference maps: focus on the location of spatial phenomena such as countries, cities, rivers, and so on. Most of the apps we use daily are reference maps, like Google Maps that help us get locations of things we look for, or landscapes, such as topographic maps or maps of a national park. It represents locations.

![US-Map-General-Reference.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1657105754672/ZIEu4h6tI.jpg align="center")

- Thematic maps: emphasize the spatial pattern of geographic attributes or statistics about places and relationships between places.
  While a reference map might show the locations of states, a thematic map can show the population of those states. A reference map might show hospitals locations, while a thematic map shows the average health issues data in an area. This category of maps shows more than a location, they represent data locations' data.

![choropleth-map-intro-example.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1657105668996/emMSkhnJS.png align="center")

### Map for our apps

Location-based apps allow businesses and companies to offer customers and users services and advertise and sell products near their immediate geographical location.
This helps developers to offer a better user experience to their users and also to target the right customers.

Today, everybody has a device (computer, mobile phone, tablet) today, and location-based websites/apps are a necessary tool that speeds up the task of providing services that are available and near to customers.

The location details for these apps are transferred through Wi-Fi, cell tower data, and satellite/GPS. All smart devices (such as smartphones, and computers) have built-in GPS, and we can make that GPS signal better using Wi-Fi or a mobile network.

In this process of developing a location-based website, you must use location services’ APIs and Maps. In our case, we'll use a Headless CMS (location data coming from the CMS). For our app, we'll basically need only need these elements to be defined from the CMS:

- A latitude
- A longitude

# Step 3: Working with ButterCMS?

### What is a ButterCMS and why using it?

ButterCMS is an API-first Headless CMS and blogging platform. It makes setting up your CMS and company blog insanely easy. Also, developers use this Headless CMS for rapidly building CMS-powered apps and websites in any programming language.

Using ButterCMS as a source of our location data, we'll create a data model for conferences.

### Create a [ButterCMS account](https://buttercms.com/login/)

![butter-0-1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656431453632/R2ujR71g8.jpg align="left")

After creating your account, you'll see the welcome page:

![butter-0-3.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656432407851/9QIvxPVzw.jpg align="left")
Don't worry, we're only creating the content model here.

### Creating and managing a list of conferences details and locations with ButterCMS

Once done, Let's create a Content Model for Conferences:

(1) Create
![butter-0-2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656432303674/FNw46sLg1.jpg align="left")

(2) Add fields: title, location, conference url, date, latitude (lat), longitude (lng):
![butter-1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656432719746/htPa0TIgG.jpg align="left")

(3) Give the name for this collection "Conference" and save:
![butter-3.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656433105269/DLfB3MfuY.jpg align="left")

(4) Add conferences details - from [the official React website](https://reactjs.org/community/conferences.html):

_Choosing the "conferences" collection_
![butter-4.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656434093775/-7UtwA358.jpg align="left")

_Adding conferences details one by one_
![butter-5.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656434215017/NKy4IFjrb.jpg align="left")

_After filling in all the conferences details, here is the conferences list_

![butter-6.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656434312260/-jb5Pu-TD.jpg align="left")
we've used an online tool to get location data for the Cities (Conferences locations):
[gps-coordinates](https://www.gps-coordinates.net/)

(5) Let's connect the CMS with our Gatsby project

- Install the `gatsby-source-buttercms`:

```
npm install --save gatsby-source-buttercms
```

- Add this snippet on the top of the `gatsby-config.js` (in the file):

```
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const previewMode = !(
  process.env.GATSBY_BUTTER_CMS_PREVIEW === "false" ||
  process.env.GATSBY_BUTTER_CMS_PREVIEW === "0"
)
  ? 1
  : 0;
```

- Add `gatsby-source-buttercms` plugin in our `gatsby-config.js`:

```
 plugins: [
    // ...
    {
      resolve: `gatsby-source-buttercms`,
      options: {
        authToken: process.env.GATSBY_BUTTER_CMS_API_KEY,
        // Optional array of Collection key

        contentFields: {
          keys: [`conference`],

          // Optional. Set to 1 to enable test mode for viewing draft content.

          test: previewMode,
        },
      },
    },

   // ...
]
```

![Code-2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656435760314/95YHeKPna.jpg align="left")

- Copy the API key from your ButterCMS dashboard:

_In the project settings_
![butter-7.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656435536798/IaleY7q4T.jpg align="left")

_Copy the API key value_
![butter-8.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656435565316/1vJ3OCOme.jpg align="left")

- Add the API key to the environment variable file (create a `.env.development` file first):

```
GATSBY_BUTTER_CMS_API_KEY=************************************
GATSBY_BUTTER_CMS_PREVIEW=false
```

![Code-3.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656435734180/DXxlZs29C.jpg align="left")

# Step 4: Building the components

### The location component

(1) Create the `LocationComponent.js` file inside the components folder

![code-0.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656488316678/MVvyjVAK6.jpg align="left")

(2) Create the `constants.js` file and add this snippet to get the icon working:

```
import L from "leaflet";

export default typeof window !== "undefined"
  ? L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    })
  : null;

```

⚠ Note that we've wrapped the code inside `export default typeof window !== "undefined" ? ... : null` in order to prevent an error and detect whether the code is running in a typical browser environment (e.g. an environment with a browser DOM) or in some other JS environment since the `window` object exists in a typical browser JS, but does not exist in something like node.js or even a webWorker in a browser\* (more [details on Stackoverflow](https://stackoverflow.com/questions/32598971/whats-the-purpose-of-if-typeof-window-undefined))

(3) Create the React component

Start by creating the `LocationComponent.js` file and in the file add this:

```
import { Icon } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import icon from "./constants";

const LocationComponent = ({ conference }) => {

  const LOCATION = {
    lat: conference.lat,
    lng: conference.lng,
  };
  return (
    <Marker position={[LOCATION.lat, LOCATION.lng]} icon={icon}>
      <Popup>
        <h1>{conference.title}</h1> <br />
        <h5>{conference.location}</h5>
        <h6> {conference.date} </h6> <br />
        <a href={conference.conference_url} target="_blank" rel="noreferrer">
          Discover
        </a>
      </Popup>
    </Marker>
  );
};

export default LocationComponent;

```

#### Let's explain the Code:

- The `import` statements:

```
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import icon from "./constants";

```

This is used for the `react-leaflet` and `leaflet` libraries that help us add the location icon and styling.

```
import icon from "./constants";
```

This statement is used for the Icon handling coming from the `constants.js` file we just created. Without this, we won't be able to manipulate the Map properly (at least the icon part).

The `LocationComponent` part is for rendering the component:

```
const LocationComponent = ({ conference }) => {}

```

We get the `conference` props that will receive data from the parent component we'll create in a couple of seconds.

```
const LOCATION = {
    lat: conference.lat,
    lng: conference.lng,
  };
```

We wanted a better way to receive the location data, such as the `latitude` and the `longitude`, in a `LOCATION` object.

```
const LocationComponent = ({ conference }) => {
  // The return statement:
  return (
    <Marker position={[LOCATION.lat, LOCATION.lng]} icon={icon}>
      <Popup>
        <h1>{conference.title}</h1> <br />
        <h5>{conference.location}</h5>
        <h6> {conference.date} </h6> <br />
        <a href={conference.conference_url} target="_blank" rel="noreferrer">
          Discover
        </a>
      </Popup>
    </Marker>
  );
};

export default LocationComponent;

```

The `return` statement is rendering a `react-leaflet` library component `Marker` that is used for showing the located item.

As we're receiving data within the `conference` props, we render and add them in the `Marker` Component's props `position` that receives an array of `[latitude, longitude]` and `icon` props that receives the icon.

And we have the `Popup` Component from the `react-leaflet` library to show the location item's details on click. In our case, we'll be showing the conference's name, date, location, and link, when the user clicks on the location icon.

### The user's location component

Start by creating the `CurrentLocation.js` file and creating the component inside the file.

- The component:

```
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";

import icon from "./constants";

function CurrentLocation() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        You are here 👋 <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}

export default CurrentLocation;


```

Notice that it is the same component as the `LocationComponent.js` file, but with more specific lines of code:

```
import React, { useEffect, useState } from "react";
```

This line is for the normal React Import with Hooks (`useState` to save states & `useEffect` to manipulate the async code).

```
const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

```

This part is used to initialize our map component (position, and location details) for the user.

_All the other parts are explicit and clear_

```
     <Popup>
        You are here 👋 <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>

```

In the `Popup` component, we render some specific data such as the Southwest latitude and longitude, and the Northeast latitude and longitude.

### The locations list component

After creating the `MapContainer.js` file and in the file, create the component inside the file.

- The component:

```
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import LocationComponent from "./LocationComponent";
import CurrentLocation from "./CurrentLocation";

const MapContainerComponent = () => {

  const conferences = []

  if (typeof window !== "undefined") {
    return (
      <div>
        // ...
      </div>
    );
  }
  return null;
};

export default MapContainerComponent;


```

As we did in the Location Component, we just wrapped our map Component in a condition to handle the error by adding the ` if (typeof window !== "undefined") {...}` scope.

- Our first look
  In the main component, we add this:

```

<MapContainer
          style={{ height: "800px", width: "100%" }}
          center={[12.97, 77.59]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          // ...
          })}

          <CurrentLocation />
      </MapContainer>


```

### Rendering the map on the page

- Create a `layout component` (I'm using a template layout, but you can create whatever you want, it's not very important for our project):

```
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";


const Layout = ({ children, menuItems }) => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll(".page-scroll");
      const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      for (let i = 0; i < sections.length; i++) {
        const currLink = sections[i];
        const currLinkHref = currLink.getAttribute("href");
        const val = currLinkHref.replace("/", "");

        const refElement = document.querySelector(val);
        const scrollTopMinus = scrollPos + 73;

        if (
          refElement &&
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          setActiveLink(currLinkHref);
        }
      }
    };

    window.document.addEventListener("scroll", onScroll, { passive: true });
    return () => window.document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="frame-ancestors 'self' https://buttercms.com;"
        />
      </Helmet>

      <Header menuItems={menuItems} activeLink={activeLink} />


      <main>{children}</main>

    </>
  );
};

export default Layout;


```

- In the `pages` folder, let's add this code to the `index.js` component (create the file if it doesn't exist):

![code-0.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656493830376/iyxZITRGZ.jpg align="center")

```
import React from "react";
import Layout from "../containers/Layout";
import MapContainerComponent from "../components/MapContainer";

const IndexPage = () => {
  return (
    <Layout menuItems={[]}>
      <div className="w-full min-h-min">
        <h1 className="text-5xl font-bold my-6 text-center">
          React Conferences
        </h1>

        <MapContainerComponent />
      </div>
    </Layout>
  );
};

export default IndexPage;


```

Without creating this component and rendering the `MapContainerComponent` from the `MapContainer.js` file, nothing will be shown on the page... So, that's why we created this first page.

For experimental purposes, after running `npm run develop`, we will have something like this (in the `http://localhost:8000/` address):

![visual-1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656493356703/m__2Hb20j.jpg align="left")

# Step 5: Querying location data with Gatsby and GraphQL from ButterCMS

Using Gatsby, we'll most likely be working with GraphQL. In our case, we'll be calling data from ButterCMS.

### Gatsby graphQL playGround

Let's go to the browser and see if ButterCMS is serving the data we asked for:
type `http://localhost:8000/___graphql`. We get:

![graphql-1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656494337279/H-auGT5Sa.jpg align="center")

Wait! let's explain :)

We've got the `conferences` data and queried the data we're interested in:

- The query

```
query {
      allButterCollection {
        edges {
          node {
            value {
              title
              location
              lat
              lng
              date(fromNow: true)
              conference_url
            }
          }
        }
      }
    }

```

- The Output
  ![graphql-2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656494445437/_qxChDtks.jpg align="center")

Here is the output (result) from the API:

![graphql-3.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656494525607/Z2cTYrm_5.jpg align="center")

- Back to our code and let's now work on rendering these data on the map

In the `MapContainer.js` file, let's change the code to:

```
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

const MapContainerComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      allButterCollection {
        edges {
          node {
            value {
              title
              location
              lat
              lng
              date(fromNow: true)
              conference_url
            }
          }
        }
      }
    }
  `);

  const conferences = data.allButterCollection.edges[0].node.value;
  console.log(conferences);

  if (typeof window !== "undefined") {
    return (
      <div>
        <MapContainer
          style={{ height: "800px", width: "100%" }}
          center={[conferences[0].lat, conferences[0].lng]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         // ...
          <CurrentLocation />
        </MapContainer>
      </div>
    );
  }
  return null;
};

export default MapContainerComponent;


```

In order to handle the query, we've added the import statement:

```
import { graphql, useStaticQuery } from "gatsby";

```

And inside the main Component, we have:

```
const data = useStaticQuery(graphql`
    query {
      allButterCollection {
        edges {
          node {
            value {
              title
              location
              lat
              lng
              date(fromNow: true)
              conference_url
            }
          }
        }
      }
    }
  `);

  const conferences = data.allButterCollection.edges[0].node.value;
  console.log(conferences);

```

- Let's reload the server by running `npm run develop`, and go to `http://localhost:8000/` to check the console:

![terminal-1.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656494973075/5hoEgVZOR.jpg align="center")

Well done 👏

### Fetching conferences list

- Let's now update the whole component:

```

import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import LocationComponent from "./LocationComponent";

const MapContainerComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      allButterCollection {
        edges {
          node {
            value {
              title
              location
              lat
              lng
              date(fromNow: true)
              conference_url
            }
          }
        }
      }
    }
  `);

  const conferences = data.allButterCollection.edges[0].node.value;
  console.log(conferences);

  if (typeof window !== "undefined") {
    return (
      <div>
        <MapContainer
          style={{ height: "800px", width: "100%" }}
          center={[conferences[0].lat, conferences[0].lng]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {conferences.map((conference, index) => {
            return (
              <div key={index}>
                <LocationComponent conference={conference} />
              </div>
            );
          })}

        </MapContainer>
      </div>
    );
  }
  return null;
};

export default MapContainerComponent;


```

- Let's explain the code:

In order to work with the location component, we just added the import statement:

```
import LocationComponent from "./LocationComponent";
```

Inside the component: we're mapping the `conferences` array we created, and render each specific location that's being passed through the `LocationComponent` props `conference`:

```
         {conferences.map((conference, index) => {
            return (
              <div key={index}>
                <LocationComponent conference={conference} />
              </div>
            );
          })}

```

- The output:

![visual-2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656495396246/aVEeJgPqd.jpg align="center")

- When the user clicks on a location, we have:

![visual-3-ok.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656495608656/NBd4EuMVn.jpg align="left")

### Calling user's current location components

- In the end, let's now Call the `CurrentLocatioin` Component inside the main component:

```

import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import LocationComponent from "./LocationComponent";
import CurrentLocation from "./CurrentLocation";

const MapContainerComponent = () => {
  // ...

  if (typeof window !== "undefined") {
    return (
      <div>
        <MapContainer
          style={{ height: "800px", width: "100%" }}
          center={[conferences[0].lat, conferences[0].lng]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {conferences.map((conference, index) => {
            return (
              <div key={index}>
                <LocationComponent conference={conference} />
              </div>
            );
          })}

      // Here it is:
          <CurrentLocation />
        </MapContainer>
      </div>
    );
  }
  return null;
};

export default MapContainerComponent;


```

called from the import statement:

```
import CurrentLocation from "./CurrentLocation";

```

- After reloading (running the server) with `npm run develop`, we have a location permission pop-up like this:

![visual-current-0.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656495884836/5ESsr1s-6.jpg align="center")

- After the permission, we have this:

![visual-current.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656495965458/apLjw651m.jpg align="center")

Here we have the user's location data. Bravo 👏

### The website in a bigger picture

![visual-2.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1656496064075/J_rnK6qt6.jpg align="left")

- [The website demo](https://react-conferences.netlify.app/)

- [The source code repository](https://github.com/KennStack01/react-conferences-buttercms)

# Conclusion

Did you notice that using a Headless CMS solves a lot of problems? As developers, we don't care about where to store our location data anymore. In our case, for this article made as explanatory content that teaches how to manipulate a mapping library with React, we've built a website that shows all the React conferences on a map using [ButterCMS](https://buttercms.com/) as the CMS that simplifies our location details, Gatsbyjs as our React framework that handles the API manipulation and user interfaces, and the React-leaflet library for the map.
