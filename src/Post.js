import React, { PureComponent } from 'react';
import moment from 'moment';
import { Text, Image, Box, Heading } from 'grommet';
import Markdown from 'react-markdown';

import { endPoint } from './App';

const PostMeta = ({ post }) => (
  <Box>
    <Box
      justify="center"
      margin={{ bottom: 'medium' }}
      style={{ fontFamily: 'system-ui' }}
    >
      <Text size="small">publicerad av </Text>
      <Text>{post.author}</Text>
    </Box>
    <Box>
      <Text>{moment(post.createdAt).format('DD / MM / YY')}</Text>
    </Box>
  </Box>
);

class Post extends PureComponent {
  state = {
    page: null,
    loading: false
  };

  render() {
    const { posts, post } = this.props;
    const { loading } = this.state;

    if (loading) {
      return '...loading';
    }

    return (
      <Box direction="row" wrap justify="center">
        <Box
          as="nav"
          basis="240px"
          pad={{
            top: 'large',
            bottom: 'none',
            left: 'small',
            right: 'small'
          }}
        >
          {post && (
            <Box pad="small">
              <PostMeta post={post} />
            </Box>
          )}
        </Box>
        <Box basis="600px" pad="medium">
          <Heading level="2">{post && post.title}</Heading>
          {post && post.image && (
            <Image
              fit="contain"
              style={{ maxHeight: 320 }}
              src={endPoint + post.image.url}
            />
          )}
          {post && <Markdown source={post.content} />}
        </Box>
      </Box>
    );
  }
}

export default Post;
