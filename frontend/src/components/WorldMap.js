import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import {connect,useSelector} from "react-redux"
import MarkerPopup from "components/MarkerPopup"
import MarkerDetail from "components/MarkerDetail"

import * as marker from "modules/Marker/_redux/markerRedux"
import * as markerSelectors from "modules/Marker/_redux/selectors"
import {convertPixelToCoordinate} from "modules/Helper"




const projection = geoEqualEarth()
  .scale(160)
  .translate([ 800 / 2, 450 / 2 ])

const WorldMap = (props) => {
  const [geographies, setGeographies] = useState([])

  const [popUpOpen, setPopUpOpen] = React.useState(false);

  const [coordinate,setCoordinate] = React.useState([0,0])

  const [selectedMarker, setSelectedMarker] = React.useState(null)

  const [detailPopupOpen,setDetailPopupOpen] = React.useState(false)
 
  




  const handleClickOpen = () => {
    setPopUpOpen(true);
  };

  const handleClose = () => {
    setPopUpOpen(false);
  };

  const handleDetailPopupOpen = () => {
    setDetailPopupOpen(true)
  }

  const handleDetailPopupClose = () => {
    setDetailPopupOpen(false)
  }

 

  const markers = useSelector(markerSelectors.placesSelector)
          .map(marker => {
            return {
              uuid:marker.uuid,
              name:marker.name,
              coordinates:[marker.longitude,marker.latitude],
              photo:marker.photo
            }
          })

  


  useEffect(() => {
    fetch("/world-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          setGeographies(feature(worlddata, worlddata.objects.countries).features)
        })
      })
      props.getMarkersRequest()
  }, [])

 

  const handleMarkerClick = (e,marker) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setSelectedMarker(marker)
    handleDetailPopupOpen()
    
    console.log(marker)

   
  }

  
  
  function handleMouseClick(e){
    var svg = document.getElementById("svg")

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoordinate(convertPixelToCoordinate(x,y))
  
    handleClickOpen()
  }

  return (

    <div>    
      <svg id="svg" onClick={(e) => handleMouseClick(e)}
      width={ 800 } height={ 450 } viewBox="0 0 800 450">handleMarkerClick
        <g className="countries">
          {
            geographies.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(projection)(d) }
                className="country"
                fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                
              />
            ))
          }
        </g>
        <g className="markers">
          {
            markers.map((marker, i) => (
              <circle
                  style={{cursor:"pointer"}}
                key={ `marker-${i}` }
                cx={ projection(marker.coordinates)[0] }
                cy={ projection(marker.coordinates)[1] }
                r={ 5 }
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker"
                onClick={ (e) => handleMarkerClick(e,marker) }
              />
            ))
          }
        </g>
      </svg>
      <MarkerPopup coordinate={coordinate} handleClose={handleClose} handleClickOpen={handleClickOpen} popUpOpen={popUpOpen}/>
      <MarkerDetail selectedMarker={selectedMarker} handleClose={handleDetailPopupClose} popupOpen={detailPopupOpen} />
      
      </div>
  )
}

export default connect(null,marker.actions) (WorldMap)
