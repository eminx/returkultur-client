import React, { PureComponent } from 'react';
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
import { Box, Heading } from 'grommet';
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends PureComponent {
  state = {
    happenings: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('http://localhost:1337/happenings')
      .then(response => {
        // Handle success.
        console.log('response', response);
        this.setState({ loading: false, happenings: response.data });
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
  }

  render() {
    const { happenings } = this.state;
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
          Calendar
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
