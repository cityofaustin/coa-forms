import React from "react";
import classnames from "classnames";

export default function LocationReviewWidget(props) {
  return (
    <div>
      <img
        src={`//maps.googleapis.com/maps/api/staticmap?markers=30.271272, -97.745934&zoom=15&size=680x400&scale=1&maptype=roadmap&key=AIzaSyBqtg0ntvqWGSHOznB4kq3DiYSyyVNKzIs&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xf0eef0&style=feature:landscape.man_made%7Celement:geometry.fill%7Ccolor:0xf0eef0&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0x7f7189&style=feature:road.arterial%7Celement:geometry.stroke%7Ccolor:0x7f7189&style=feature:road.arterial%7Celement:labels.icon%7Ccolor:0x3e3b6c&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x5e494a&style=feature:road.arterial%7Celement:labels.text.stroke%7Ccolor:0xffffff&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xe89f9a&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xd6613c&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x190f2c&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0xf6f2fd&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0xb8b1bd&style=feature:road.local%7Celement:geometry.stroke%7Ccolor:0xb8b1bd&style=feature:road.local%7Celement:labels.text%7Ccolor:0xffffff&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x5e494a&style=feature:road.local%7Celement:labels.text.stroke%7Ccolor:0xffffff&style=feature:transit%7Cvisibility:off`}
      />
      <div>800 Guadalupe St, Austin, TX 78701</div>
    </div>
  );
}
