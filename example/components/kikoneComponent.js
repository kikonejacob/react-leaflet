import React, { Component } from 'react';
import { Map, TileLayer, Circle, FeatureGroup } from '../../src';
import EditControl  from './EditorContainer';
import {AddShape} from '../action/action';

let polyline;
const subs = [ 'a', 'b', 'c', 'd' ];

export default class KikoneComponent extends Component {


  getShapeType(layer) {

    if (layer instanceof L.Circle) {
        return 'circle';
    }
    if ((layer instanceof L.Polygon) && ! (layer instanceof L.Rectangle)) {
        return 'polygon';
    }

};

  handleOnCreate(e) {
    polyline = e.layer;
    // To edit this polyline call : polyline.handler.enable()
    let newShape={type:this.getShapeType(polyline),properties:polyline.position}
    this.props.dispatch(AddShape(newShape))
    console.log(newShape);
  }

 
// Will retrieved shape with status saved to render
  getSavedShapesList(){
      let result=[];
      console.log(this.props);
      this.props.shapes.map((component)=>{
          if (component.status=='saved')
          {
              result.push(component);
          }
      })
      return result;
  }

 /** Will render saved shapes loaded from server*/
  renderSavedShapes(){
      const list=this.getSavedShapesList();
      let i=0;
      list.map((component)=>{
          i++;
          switch (component.component){
              case 'circle':
                    return (<Circle ref={`shape${i}`} {...component.properties} />);
             case 'polygone':
                    return (<Polygone {...component.properties} />);
          }
          

      })
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13} zoomControl={true}>
            <TileLayer
                 attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
             /> 
        <FeatureGroup>
            <EditControl
              position='topright'
    
              onCreated={this.handleOnCreate.bind(this)}
             
              draw={{
                rectangle: false
              }}
            />
            {this.renderSavedShapes()}
        </FeatureGroup>
      </Map>
    );
  }
}

