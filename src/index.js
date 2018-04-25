import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/users';
import Tasks from './components/tasks'
import TaskForm from './components/task_form'
import Projects from './components/projects'
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
        <Route path="/projects/:project_id/tasks/create" component={TaskForm} />
        
        <Route path="/projects/:project_id/tasks" component={Tasks} />
        <Route path="/projects" component={Projects} />
        <Route path="/users/:user_id/tasks/" component={Tasks} />
        <Route path="/users" component={Users} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
