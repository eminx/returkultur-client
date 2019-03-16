import React, { PureComponent } from 'react';
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
import { Box, Heading } from 'grommet';

import Loader from '../components/Loader';
import { endPoint, parseTitle } from '../App';
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends PureComponent {
  state = {
    happenings: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios
      .get(`${endPoint}/happenings`)
      .then(response => {
        // Handle success.
        this.setState({ loading: false, happenings: response.data });
      })
      .catch(error => {
        // Handle error.
        this.setState({ loading: false, error: true });
        console.log('An error occurred:', error);
      });
  }

  render() {
    const { happenings, loading, error } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return 'error loading page';
    }

    const happeningsForCalendar =
      happenings &&
      happenings.map(happening => ({
        title: happening.title,
        start: moment(
          happening.start_date + happening.start_time,
          'YYYY-MM-DD HH:mm'
        ).toDate(),
        end: moment(
          happening.end_date + happening.end_time,
          'YYYY-MM-DD HH:mm'
        ).toDate()
      }));

    return (
      <Box pad="medium">
        <Heading level="2" alignSelf="center">
          Kalender
        </Heading>
        <BigCalendar
          events={happeningsForCalendar}
          localizer={localizer}
          defaultView="month"
          showMultiDayTimes
          step={60}
          views={['month', 'week', 'day', 'agenda']}
          popup
          popupOffset={30}
        />
      </Box>
    );
  }
}

export default Calendar;
