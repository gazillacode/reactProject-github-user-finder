import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import Users from './components/users/Users'
import Search from './components/users/Search'
import axios from 'axios'
import './App.css';

library.add(fab, faGithubAlt)

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  // =====================================================
  // What is componentDidMount?
  // =====================================================
  // The componentDidMount() method allows us to execute the React code when the component is already placed in the DOM (Document Object Model). This method is called during the Mounting phase of the React Life-cycle i.e after the component is rendered.
  // =====================================================
  // Step 1
  // =====================================================
  // async componentDidMount() {
    //   this.setState({ loading: true });

    //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //   this.setState({ users: res.data, loading: false });
    // }

  // =====================================================
  // Step 2: Search Github users
  // =====================================================
  // We can use the state within the async above to fetch the users from the Github API
  // =====================================================
  searchUsers = async (text) => {

    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={ this.searchUsers }/>
          <Users loading={this.state.loading} users={ this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;
