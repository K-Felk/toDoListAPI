import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/users';
import Bugs from './components/bugs';
import BugForm from './components/bug_form';
import Home from './components/home';
import About from './components/about';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TopNav />
      <Switch>
        <Route path="/users/:id/bugs/create" component={BugForm} />
        <Route path="/users/:id/bugs/:pid" component={BugForm} />
        <Route path="/users/:id/bugs" component={Bugs} />
        <Route path="/users" component={Users} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
