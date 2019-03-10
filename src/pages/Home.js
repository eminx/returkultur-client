import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Image, Anchor, Heading, Text } from 'grommet';
import Markdown from 'react-markdown';

import { endPoint, parseTitle } from '../App';

class Home extends PureComponent {
  render() {
    const { posts, page } = this.props;

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
          <Box margin={{ vertical: 'large' }}>
            {posts.slice(0, 3).map((post, index) => (
              <Box>
                <Heading level="2" textAlign="center">
                  <Link to={`/posts/${parseTitle(post.title)}`}>
                    <Anchor>{post.title}</Anchor>
                  </Link>
                </Heading>
                <Text
                  size="xsmall"
                  textAlign="center"
                  as="div"
                  margin={{ bottom: 'small' }}
                >
                  <em>
                    {post.author},{' '}
                    {moment(post.createdAt).format('DD / MM / YY')}
                  </em>
                </Text>
                {page && page.image && (
                  <Image
                    fit="contain"
                    style={{ maxHeight: 320 }}
                    src={endPoint + page.image.url}
                  />
                )}
                <Text textAlign="center">{post.content.slice(0, 50)}...</Text>
              </Box>
            ))}
          </Box>

          <br />

          <Box>{page && <Markdown source={page.content} />}</Box>
        </Box>
      </Box>
    );
  }
}

export default Home;
