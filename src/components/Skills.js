import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

const Skills = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Skills</h2>

      <ul>
        <li>
          <Link to={`${match.url}`}>set skill goals</Link>
        </li>
        <li>
          <Link to={`${match.url}/gap`}>skill gap overview</Link>
        </li>
        <li>
          <Link to={`${match.url}/skillA`}>skillA</Link>
        </li>
        <li>
          <Link to={`${match.url}/skillB`}>skillB</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/gap`}>
          <div>Skill gap overview</div>
        </Route>
        <Route path={`${match.path}/:skillId`}>
          <Skill />
        </Route>
        <Route path={match.path}>
          <p>Please set a skill goal.</p>
        </Route>
      </Switch>
    </div>
  );
};

const Skill = () => {
  let { skillId } = useParams();
  return <p>Requested skill ID: {skillId}</p>
}

export default Skills;
