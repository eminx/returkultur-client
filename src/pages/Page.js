import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Image, Box, Heading } from 'grommet';
import Markdown from 'react-markdown';

import Loader from '../components/Loader';
import { endPoint, parseTitle } from '../App';

class Page extends PureComponent {
  render() {
    const { pages, page, match } = this.props;

    if (!page || !pages || pages.length < 1) {
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
        >
          <Box
            as="ul"
            // background="light-1"
            pad="medium"
            style={{ fontFamily: 'system-ui' }}
          >
            {pages &&
              pages.map(navPage => (
                <Box as="li" pad="none" key={navPage.title}>
                  <Link to={`/pages/${parseTitle(navPage.title)}`}>
                    <Anchor as="div">
                      <Box
                        pad="small"
                        style={{
                          fontWeight:
                            parseTitle(navPage.title) === parseTitle(page.title)
                              ? 700
                              : 400
                        }}
                      >
                        {navPage.title}
                      </Box>
                    </Anchor>
                  </Link>
                </Box>
              ))}
          </Box>
        </Box>
        <Box basis="600px" pad="medium">
          <Heading level="2">{page && page.title}</Heading>
          {page && page.image && (
            <Box background="light-1" pad="small">
              <Image
                fit="contain"
                style={{ maxHeight: 320 }}
                src={page.image.url}
              />
            </Box>
          )}
          {page && <Markdown source={page.content} />}
        </Box>
      </Box>
    );
  }
}

export default Page;
