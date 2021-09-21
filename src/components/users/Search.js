// =================================================================
//
// OVERVIEW:
// onSubmit={ this.onSubmit }
// call the props === this.props.searchUsers
// which is pushed up to app.js (for the below view in app.js)
// <Search searchUsers=.../>
// which when is fired is calling the function { this.searchUsers }
// which makes a request, setting the state for the users that come back via { users: res.data.items, loading: false }
//
// =================================================================


import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Search extends Component {

  // ===============================================================
  // When we have a form, usually we will want to attach state to the input
  // ===============================================================
  state = {
    text: ''
  }

  // ===============================================================
  // When we use props, we set the prop type, which in this case is a function
  // ===============================================================
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }

  // ===============================================================
  // Step 1: submit event, which will submit the text (from the input and the onchange event) when we click the search button (can also see this in the console)
  // ===============================================================
  // onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.text);
  // }

  // ===============================================================
  // Step 2: So now we want to be able to search for users based on what we enter in our in our search form. So with the GitHub API, we can make a request to the endpoints of search users and then we can add a parameter of Q, which is the query string that we want to search for, and that would be whatever we put in the input field. We could put it in our search component, but it's better to have everything centralized in our app.js. So we have to do is pass up this value, and we do this by passing up to the main app components through props.
  // ===============================================================
  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({text: ''})
  }


  // ===============================================================
  // Targets the individual input and captures when the user is typing.
  // ===============================================================
  // onChange = (e) => {
  //   this.setState({text: e.target.value});
  // }

  // ===============================================================
  // Targets any input, for example, if our form had email, firstname, lastname etc, so we can use brackets and use a key, in this example, the input name, as we are specifying the type of input
  // ===============================================================
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit } className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block" />
        </form>
      </div>
    )
  }
}

export default Search
