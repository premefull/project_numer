import React, { Component } from 'react';
import axios from 'axios';

class Misc extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/bisectionfxs')
      .then(res => {
        const data = res.data.data; // get the data array instead of object
        this.setState({ data, loading: false });
        console.log(data);
 
      
      })
      .catch(err => { // log request error and prevent access to undefined state
        this.setState({ loading: false, error: true });
        console.error(err); 
      })
  }
  render() {
    if (this.state.loading) {
      return(
        <div>
          <p> Loading... </p>
        </div>
      )
    }
    if (this.state.error || !this.state.data[0]) { // if request failed or data is empty don't try to access it either
      return(
        <div>
          <p> An error occured </p>
        </div>
      )
    }
    return (
      <form action="">
        <h2 className="center" >Change data</h2>
        <div className="center"></div>

        <p>{ this.state.data[0].fx }</p>

        <h5>Phone:</h5>
        <input type="text" value={ this.state.data[0].fx } />
        <h5>Email:</h5>
        <input type="text" value={ this.state.data[0].xl } />
        <h5>Title:</h5>
        <input type="text" value={ this.state.data[0].xr }/>
        <h5>Longtitle:</h5>
        <input type="text" value={ this.state.data[0].longTitle }/>
        <h2 className="center" >Intro:</h2>
       
        <h5>Title:</h5>
        <input type="text" value={ this.state.data[0].introTitle } />
        <h5>Longtitle:</h5>
        <input type="text" value={ this.state.data[0].introLongTitle } />
        <h5>Link to video:</h5>
        <input type="text" value={ this.state.data[0].videoLink } />        
        <h5>Text:</h5>
        <textarea name="" id="" cols="30" rows="10" value={ this.state.data[0].introText }></textarea>
        <button type="submit" className="btn-large waves-effect waves-light xbutton">Save</button>
      </form>
    );
  }
}

export default Misc; 


