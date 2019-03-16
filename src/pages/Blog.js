import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Anchor, Heading, Image, Text } from 'grommet';

import Loader from '../components/Loader';
import { parseTitle } from '../App';

class Blog extends PureComponent {
  render() {
    const { posts } = this.props;

    if (!posts || posts.length < 1) {
      return <Loader />;
    }

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
            <Box key={post.title}>
              <Heading level="2">
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
                  {post.author}, {moment(post.createdAt).format('DD / MM / YY')}
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
    );
  }
}

export default Blog;
