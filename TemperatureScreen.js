import React from 'react';
import Select from 'react-select';
import { Autocomplete }   from '@material-ui/core';
class TemperatureScreen extends React.Component {
  constructor() {
    super()
    this.handleCity = this.handleCity.bind(this)
   this.state={
     woeid:'',
     temperature:'',
     city:'',
   };

    this.bankName = [
  { label: "BANGALORE", value: 1 },
  { label: "MUMBAI", value: 2 },
  { label: "HYDERABAD", value: 3 },
  { label: "CHENNAI", value: 4 },
  { label: "LONDON", value: 5 },
  { label: "SYDNEY", value: 6 },
  { label: "NEW YORK", value: 7 },
  { label: "NEW DELHI", value: 8 },
  { label: "CHICAGO", value: 9 },
  { label: "TUMKUR", value: 10 },


];

  }
  handleCity (e) {
      console.log("indexxx",e);
      var citySelected = e.label;
      this.setState({city:citySelected})
      this.setState({temperature : ''})
      var url = "https://www.metaweather.com/api/location/search/?query=" +citySelected;
      fetch(url)
      .then(response => response.json())
      .then(data => {
             console.log("response",data);
             data.map((i,j)=>{
             console.log("this.woeid",i.woeid);
             this.setState({woeid:i.woeid});
             console.log("setstae",this.state.woeid);
             this.getTemperature(this.state.woeid);
          });
      });
  }

  getTemperature(data){
    console.log("data",data);
    var url = "https://www.metaweather.com/api/location/" +data;
    fetch(url)
    .then(response => response.json())
    .then(data => {
     console.log("responselenght",data);
      if(data.length>0 || data.consolidated_weather.length>0){
        console.log("length present");
        this.currentObj = data.consolidated_weather.length;
        this.currentTemp = data.consolidated_weather[this.currentObj-1].the_temp;
        console.log("this.currentObj",this.currentObj,this.currentTemp);
        this.setState({temperature : this.currentTemp})
      }else{
        this.currentTemp = "Temperature is not Available"
      }
    });
  }



  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }

  render() {

    return (
      <div>
      <div style={{textAlign:"center",marginBottom:"1%",fontSize:"30px"}}>
         Weather
         </div>
{ /*   <select style={{marginLeft:"80%",width:"10%",textAlign:"center",textColor:"black"}} onChange={this.handleCity} options={this.bankName}>
  <option value="select">Select</option>
                        {
                           this.bankName.map((i,j)=>{
                              console.log("inside bankname map",i)
                                return <option key={i} value={i}>{i}</option>


                            })
                        }

                    </select>*/}
                    <div style={{marginLeft:"80%",width:"10%",marginBottom:"1%"}}>
                    <Select options={this.bankName} onChange={this.handleCity}/>
                    </div>

                    <div style={{textAlign:"center",marginBottom:"1%"}}>City Name :
                    {this.state.city}
                    </div>
                    <div style={{textAlign:"center"}}>Temperature :
                    {this.state.temperature}
                    </div>
      </div>
    );
  }
}
export default TemperatureScreen;
