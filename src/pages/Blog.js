import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Anchor, Heading, Text } from 'grommet';

import { parseTitle } from '../App';

class Blog extends PureComponent {
  render() {
    const { posts } = this.props;

    return (
      <Box direction="row" wrap justify="center">
        <Box
          as="nav"
          basis="240px"
          pad={{
            top: 'large',
            bottom: 'none',
            left: 'medium',
            right: 'small'
          }}
        />
        <Box basis="600px" pad="medium">
          {posts.map((post, index) => (
            <Box>
              <Heading level="2">
                <Link to={`/posts/${parseTitle(post.title)}`}>
                  <Anchor>{post.title}</Anchor>
                </Link>
              </Heading>
              <Text size="xsmall" as="div" margin={{ bottom: 'small' }}>
                <em>
                  {post.author}, {moment(post.createdAt).format('DD / MM / YY')}
                </em>
              </Text>
              <Text>{post.content.slice(0, 50)}...</Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default Blog;
