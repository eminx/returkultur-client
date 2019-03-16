import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Image, Anchor, Button, Heading, Text } from 'grommet';
import Markdown from 'react-markdown';

import Loader from '../components/Loader';
import { endPoint, parseTitle } from '../App';

class Home extends PureComponent {
  render() {
    const { posts, page } = this.props;

    if (!page || !posts) {
      return <Loader />;
    }

    return (
      <Box direction="row" wrap justify="center">
        <Box
          as="nav"
          basis="0"
          pad={{
            top: 'large',
            bottom: 'none',
            left: 'medium',
            right: 'small'
          }}
        />

        <Box basis="600px" pad="medium">
          <Box>
            {page && page.image && (
              <Image
                fit="contain"
                style={{ maxHeight: 366 }}
                src={page.image.url}
              />
            )}
            {page && <Markdown source={page.content} />}
          </Box>

          <Box>
            <Link to="/pages/om-returkultur">
              <Anchor as="div">Läs mer om Returkultur</Anchor>
            </Link>
          </Box>

          <Box margin={{ vertical: 'large' }}>
            <Heading margin="small" level="3">
              Latest Posts
            </Heading>
            {posts.slice(0, 3).map((post, index) => (
              <Box
                key={post.title}
                width="100%"
                background="light-1"
                pad="small"
              >
                <Heading level="2" margin={{ vertical: 'small' }}>
                  <Link to={`/posts/${parseTitle(post.title)}`}>
                    <Anchor as="div">{post.title}</Anchor>
                  </Link>
                </Heading>
                <Text
                  size="small"
                  textAlign="end"
                  as="div"
                  margin={{ bottom: 'small' }}
                >
                  <em>
                    {post.author},{' '}
                    {moment(post.createdAt).format('DD / MM / YY')}
                  </em>
                </Text>
                <Box direction="row" justify="center" align="center" wrap>
                  <Box basis="140px">
                    <Image
                      fit="contain"
                      style={{ maxHeight: 180 }}
                      src={post.image.url}
                    />
                  </Box>
                  <Box pad="medium" basis="2/3">
                    <Text>{post.content.slice(0, 100)}...</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Home;
