import React from 'react'
import {
  Container,
  createMuiTheme,
  makeStyles
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import authorization from '../components/authorization'
import NavBar from '../layout/NavBar'
import Topic from './Topic'
import TopicDetail from './TopicDetail'
import Login from './Login'
import UserCenter from './UserCenter'
import themeConfig from '../../theme'

const theme = createMuiTheme(themeConfig)

const styles = makeStyles(() => ({
  container: {
    paddingTop: 64,
    marginBottom: 20,
    '& div.container': {
      backgroundColor: '#fff',
      marginTop: 20,
      borderRadius: 4
    }
  },
  '@media screen and (max-width: 600px)': {
    container: {
      padding: '56px 5px 0 5px'
    }
  }
}))

const App = () => {
  const classes = styles()

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className={classes.container}>
        <NavBar/>
        <div className="MuiPaper-elevation4 container">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/topic"/>}/>
            <Route path="/topic" exact component={Topic}/>
            <Route path="/topic/:id" component={TopicDetail}/>
            <Route path="/user" exact render={() => <Redirect to="/user/login"/>}/>
            <Route path="/user/login" component={Login}/>
            <Route path="/user/center" component={authorization(UserCenter)}/>
            <Route render={() => <h1>404 Not Found</h1>}/>
          </Switch>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App