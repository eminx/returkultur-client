import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Box, Image, Anchor, DropButton, Grommet } from 'grommet';
import axios from 'axios';
import MediaQuery from 'react-responsive';

import theme from './theme';
import './App.css';
import Calendar from './pages/Calendar';
import Page from './pages/Page';
import Post from './pages/Post';
import Blog from './pages/Blog';
import Home from './pages/Home';

const endPoint = 'https://returkultur.herokuapp.com'; // prod
// const endPoint = 'http://localhost:1337'; // dev

const parseTitle = title => title.replace(/\s+/g, '-').toLowerCase();

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    pad="none"
    style={{ fontFamily: 'system-ui' }}
    {...props}
  />
);

const mainNav = [
  {
    label: 'Start',
    route: '/'
  },
  {
    label: 'Om',
    route: '/pages/om-returkultur'
  },
  {
    label: 'Blogg',
    route: '/blog'
  },
  {
    label: 'Kalender',
    route: '/calendar'
  },
  {
    label: 'Kontakt',
    route: '/pages/kontakt'
  }
];

class App extends Component {
  state = {
    pages: [],
    posts: [],
    loading: false,
    isMenuOpen: false
  };

  componentDidMount() {
    axios
      .get(`${endPoint}/pages`)
      .then(pagesResponse => {
        axios.get(`${endPoint}/posts`).then(postsReponse => {
          this.setState({
            loading: false,
            pages: pagesResponse.data,
            posts: postsReponse.data
          });
        });
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
  }

  render() {
    const { pages, posts, isMenuOpen } = this.state;

    const normalPages = pages.filter(
      page => page.title !== 'Kontakt' && page.title !== 'Start'
    );

    return (
      <Router>
        <Grommet theme={theme}>
          <div
            className="App"
            style={{
              maxWidth: 1440,
              margin: '0 auto',
              padding: 12,
              paddingTop: 0
            }}
            id="outer-container"
          >
            <AppBar>
              <Box justify="center" width="100%" pad="none">
                <Box direction="row" justify="center" width="100%">
                  <Link to="/">
                    <Image
                      src="https://s3.eu-central-1.amazonaws.com/skogen-reading-materials/RK-logo-roots.png"
                      height={120}
                      margin={{ top: 'small' }}
                    />
                  </Link>
                </Box>
                <MediaQuery query="(min-width: 601px)">
                  <nav>
                    <Box
                      as="ul"
                      pad="none"
                      direction="row"
                      justify="center"
                      background="light-1"
                    >
                      {mainNav &&
                        mainNav.map(nav => (
                          <Box as="li" key={nav.label}>
                            <Link
                              to={nav.route}
                              style={{
                                padding: 24,
                                textTransform: 'uppercase'
                              }}
                            >
                              <Anchor as="span">{nav.label}</Anchor>
                            </Link>
                          </Box>
                        ))}
                    </Box>
                  </nav>
                </MediaQuery>

                <MediaQuery query="(max-width: 600px)">
                  <DropButton
                    label="Menu"
                    open={isMenuOpen}
                    onOpen={() => this.setState({ isMenuOpen: true })}
                    dropContent={
                      <Box>
                        {mainNav.map(nav => (
                          <Box as="div" key={nav.label}>
                            <Link
                              to={nav.route}
                              style={{
                                padding: 24,
                                textTransform: 'uppercase'
                              }}
                              onClick={() =>
                                this.setState({ isMenuOpen: false })
                              }
                            >
                              <Anchor as="span">{nav.label}</Anchor>
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    }
                  />
                </MediaQuery>
              </Box>
            </AppBar>

            <main style={{ maxWidth: 1120, margin: '0 auto' }}>
              <Route
                path="/pages/:id"
                render={props => (
                  <Page
                    {...props}
                    pages={normalPages}
                    page={pages.find(
                      page =>
                        parseTitle(page.title) ===
                        parseTitle(props.match.params.id)
                    )}
                  />
                )}
                pages={pages}
              />
              <Route
                path="/posts/:id"
                render={props => (
                  <Post
                    {...props}
                    posts={posts}
                    post={posts.find(
                      post =>
                        parseTitle(post.title) ===
                        parseTitle(props.match.params.id)
                    )}
                  />
                )}
              />

              <Route
                exact
                path="/blog"
                render={props => <Blog {...props} posts={posts} />}
              />

              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    posts={posts}
                    page={pages.find(page => page.title === 'Start')}
                  />
                )}
              />

              <Route exact path="/calendar" component={Calendar} />
            </main>
          </div>
        </Grommet>
      </Router>
    );
  }
}

export { endPoint, parseTitle };
export default App;
