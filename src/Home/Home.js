import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
// import zoid from 'zoid'

// const $ = window.$;

// var MyLoginComponent = zoid.create({

//   // The html tag used to render my component

//   tag: 'my-login-component',

//   // The url that will be loaded in the iframe or popup, when someone includes my component on their page

//   url: 'http://localhost:3000/my-login-component',

//   // The size of the component on their page. Only px and % strings are supported

//   dimensions: {
//       width: '400px',
//       height: '200px'
//   },

//   // The properties they can (or must) pass down to my component. This is optional.

//   props: {

//       prefilledEmail: {
//           type: 'string',
//           required: false
//       },

//       onLogin: {
//           type: 'function',
//           required: true
//       }
//   }
// });

// var email = document.querySelector('#email');
//     var password = document.querySelector('#password');
//     var button = document.querySelector('#login');

//     email.value = $.xprops.prefilledEmail;

//     function validUser (email, password) {
//       return email && password;
//     }

//     button.addEventListener('click', function() {
//         if (validUser(email.value, password.value)) {
//             $.xprops.onLogin(email.value);
//         }
//     });

//     MyLoginComponent({

//       prefilledEmail: 'foo@bar.com',

//       onLogin: function(email) {
//           console.log('User logged in with email:', email);
//       }

//     }).render('#container');

const Home = () => (
  <div className="body">
      <ul>
        <li>
          <Link to='/testsubmissions'>Test Submissions</Link>
        </li>
        <li>
          <Link to='/drillusage'>Drill Usage</Link>
        </li>
        <li>
          <Link to='/coachreport'>Coach Report</Link>
        </li>
        <li>
          <Link to='/coachreport2'>Coach Report 2</Link>
        </li>
      </ul>
      <br />

      {/* <div id="container"></div>

    <input type="text" id="email" />
<input type="password" id="password" />
<button id="login">Log In</button> */}

  </div>
)

export default Home